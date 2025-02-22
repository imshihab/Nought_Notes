import path from "path"
import fs from "fs"
import { ipcMain } from "electron"

export default function DataBase() {
    const DataBasePath = path.join(__dirname, "./../DataBase")
    const NotesFolderPath = path.join(DataBasePath, "/Notes")

    ipcMain.handle("fetch_folders", () => {
        const basePath = path.join(DataBasePath, "/Notes")
        const folderNames = fs.readdirSync(basePath).filter((folder) => {
            const folderPath = path.join(basePath, folder)
            return fs.statSync(folderPath).isDirectory()
        })

        const result = folderNames.map((folder) => {
            const folderPath = path.join(basePath, folder)
            const files = fs.readdirSync(folderPath)

            let icon = null
            let id = null

            files.forEach((file) => {
                if (file.startsWith("icon_")) {
                    icon = file.replace("icon_", "")
                }
                if (file.startsWith("uid_")) {
                    id = file.replace("uid_", "")
                }
            })

            return { name: folder, icon, id }
        })

        return result
    })

    ipcMain.handle("create_folder", async (event, folderName) => {
        const folderPath = path.join(NotesFolderPath, folderName)

        try {
            if (!fs.existsSync(NotesFolderPath)) {
                fs.mkdirSync(NotesFolderPath, { recursive: true })
            }

            if (!fs.existsSync(folderPath)) {
                await fs.promises.mkdir(folderPath)
                const id = Math.random().toString(36).substring(2, 9)
                fs.mkdirSync(path.join(folderPath, `uid_${id}`))
                return {
                    message: "Folder created successfully.",
                    status: "success"
                }
            } else {
                return {
                    message: "Folder already exists.",
                    status: "fail"
                }
            }
        } catch (error) {
            return {
                message: error,
                status: "fail"
            }
        }
    })
}
