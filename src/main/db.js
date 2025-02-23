import path from "path"
import fs from "fs"
import readline from "readline";
import { ipcMain } from "electron"

async function readFirstThreeLines(filePath) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    const lines = [];
    for await (const line of rl) {
        lines.push(line);
        if (lines.length === 3) {
            rl.close();
            fileStream.destroy();
            break;
        }
    }
    return lines;
}

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

    ipcMain.handle("fetch_notes", async (event, folderName, uid) => {
        const FolderNotesFolderPath = path.join(NotesFolderPath, folderName);
        const uidFolderPath = path.join(FolderNotesFolderPath, `uid_${uid}`);
        if (!fs.existsSync(uidFolderPath)) {
            return {
                status: "fail",
                message: `${folderName} with id:[${uid}] folder not found`,
            };
        }

        try {
            const files = await fs.promises.readdir(FolderNotesFolderPath);
            const notes = files.filter((file) => file.endsWith(".md"));
            const noteDetails = await Promise.all(
                notes.map(async (note) => {
                    const filePath = path.join(FolderNotesFolderPath, note);
                    const firstLines = await readFirstThreeLines(filePath);
                    const title =
                        firstLines[0].split("title:")[1].trim() || "Untitled";
                    const body = firstLines[2]?.trim() || "No additional text";

                    const stats = fs.statSync(filePath);
                    const created = stats.birthtime.toISOString();
                    const edited = stats.mtime.toISOString();

                    return {
                        noteID: note.replace(".md", ""),
                        folder: folderName,
                        uid: uid,
                        title: title,
                        body: body,
                        created: created,
                        edited: edited,
                    };
                })
            );
            return {
                status: "success",
                message: "Notes fetched successfully",
                data: noteDetails
            };
        } catch (error) {
            return {
                status: "fail",
                message: `Error fetching notes from ${folderName}: ${error.message}`
            };
        }
    });
}
