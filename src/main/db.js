import path from "path"
import fs from "fs"
import { ipcMain } from "electron"
import FetchNotes from "./Fetch/Notes";
import FetchArchives from "./Fetch/Archives";


export default function DataBase() {
    const DataBasePath = path.join(__dirname, "./../DataBase")
    const NotesFolderPath = path.join(DataBasePath, "/Notes")
    const ArchivesFolderPath = path.join(DataBasePath, "/Archives");

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
            let Pinned = false;

            files.forEach((file) => {
                if (file.startsWith("icon_")) {
                    icon = file.replace("icon_", "")
                }
                if (file.startsWith("uid_")) {
                    id = file.replace("uid_", "")
                }
                if (file === "Pinned") {
                    Pinned = true;
                }
            })

            const folderData = { name: folder, id };
            if (icon !== null) folderData.icon = icon;
            if (Pinned) folderData.Pinned = Pinned;

            return folderData;
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

    ipcMain.handle("pin__folder", async (event, folderName, uid) => {
        const FolderNotesFolderPath = path.join(NotesFolderPath, folderName);
        const uidFolderPath = path.join(FolderNotesFolderPath, `uid_${uid}`);
        const pinnedPath = path.join(FolderNotesFolderPath, "Pinned");

        if (!fs.existsSync(uidFolderPath)) {
            return {
                status: "fail",
                message: `${folderName} with id:[${uid}] folder not found`,
            };
        }

        try {
            if (!fs.existsSync(pinnedPath)) {
                await fs.promises.mkdir(pinnedPath);
                return {
                    status: "success",
                    message: "Folder pinned successfully"
                };
            } else {
                await fs.promises.rmdir(pinnedPath, { recursive: true });
                return {
                    status: "success",
                    message: "Folder unpinned successfully"
                };
            }
        } catch (error) {
            return {
                status: "fail",
                message: `Error pinning folder: ${error.message}`
            };
        }
    })

    ipcMain.handle("rename__folder", async (event, name, uid, folderName) => {
        const FolderNotesFolderPath = path.join(NotesFolderPath, name);
        const uidFolderPath = path.join(FolderNotesFolderPath, `uid_${uid}`);
        const reNameFolder = path.join(NotesFolderPath, folderName);

        if (!fs.existsSync(uidFolderPath)) {
            return {
                status: "fail",
                message: `${name} with id:[${uid}] folder not found`,
            };
        }

        if (fs.existsSync(reNameFolder)) {
            return {
                status: "fail",
                message: `A folder with name "${folderName}" already exists`,
            };
        }

        try {
            await fs.promises.rename(FolderNotesFolderPath, reNameFolder);
            return {
                status: "success",
                message: `Folder renamed from ${name} to ${folderName} successfully`
            };
        } catch (error) {
            return {
                status: "fail",
                message: `Error renaming folder: ${error.message}`
            };
        }
    });

    ipcMain.handle("is_folder_empty", async (event, folderName) => {
        const folderPath = path.join(NotesFolderPath, folderName);
        try {
            const files = await fs.promises.readdir(folderPath);
            const mdFiles = files.filter(file => file.endsWith('.md'));

            return {
                status: "success",
                isEmpty: mdFiles.length === 0
            };
        } catch (error) {
            return {
                status: "fail",
                message: `Error checking folder: ${error.message}`
            };
        }
    });

    ipcMain.handle("delete__folder", async (event, folderName, uid) => {
        const FolderNotesFolderPath = path.join(NotesFolderPath, folderName);
        const uidFolderPath = path.join(FolderNotesFolderPath, `uid_${uid}`);

        if (!fs.existsSync(uidFolderPath)) {
            return {
                status: "fail",
                message: `${folderName} with id:[${uid}] folder not found`,
            };
        }

        try {
            await fs.promises.rmdir(FolderNotesFolderPath, { recursive: true });
            return {
                status: "success",
                message: `Folder ${folderName} deleted successfully`
            };
        } catch (error) {
            return {
                status: "fail",
                message: `Error deleting folder: ${error.message}`
            };
        }
    });

    ipcMain.handle("fetch_notes", async (event, folderName, uid) => {
        if (folderName === "Archives" && uid === "0000000") {
            const data = await FetchArchives(ArchivesFolderPath);
            return data;
        }

        if (folderName === "Favorites" && uid === "0000000") {
            // ToDo: Fetch Favorites
            return [];
        }

        if (folderName === "Trash" && uid === "0000000") {
            // ToDo: Fetch Trash
            return [];
        }

        if (folderName === "Hidden" && uid === "0000000") {
            // ToDo: Fetch Hidden
            return [];
        }
        const data = await FetchNotes(NotesFolderPath, folderName, uid);
        return data;
    });

    ipcMain.handle("pin__note", async (event, folderName, uid, noteID) => {
        const FolderNotesFolderPath = path.join(NotesFolderPath, folderName);
        const uidFolderPath = path.join(FolderNotesFolderPath, `uid_${uid}`);
        const PinnedNotesFolderPath = path.join(FolderNotesFolderPath, "PinnedNotes");
        const PinnedNoteFolderPath = path.join(PinnedNotesFolderPath, `${noteID}.md`);

        if (!fs.existsSync(uidFolderPath)) {
            return {
                status: "fail",
                message: `${folderName} with id:[${uid}] folder not found`,
            };
        }

        try {
            if (!fs.existsSync(PinnedNoteFolderPath)) {
                await fs.promises.mkdir(PinnedNoteFolderPath);
                return {
                    status: "success",
                    message: "Note pinned successfully"
                };
            } else {
                await fs.promises.rm(PinnedNoteFolderPath, { recursive: true });
                return {
                    status: "success",
                    message: "Note unpinned successfully"
                };
            }
        } catch (error) {
            return {
                status: "fail",
                message: `Error pinning note: ${error.message}`
            };
        }
    })

}
