import { contextBridge, ipcRenderer } from "electron"
import { electronAPI } from "@electron-toolkit/preload"

const api = {
    closeApp: () => ipcRenderer.send("close-app"),
    minimizeApp: () => ipcRenderer.send("minimize"),
    maximizeApp: () => ipcRenderer.send("maximize"),
    checkWindowState: () => ipcRenderer.send("check-window-state"),
    onWindowMaximized: (callback) => ipcRenderer.on("window-maximized", callback),
    onWindowRestored: (callback) => ipcRenderer.on("window-restored", callback),
    removeWindowMaximizedListener: () => ipcRenderer.removeAllListeners("window-maximized"),
    removeWindowRestoredListener: () => ipcRenderer.removeAllListeners("window-restored")
}

const folders = {
    fetch: () => ipcRenderer.invoke("fetch_folders"),
    create: (folderName) => ipcRenderer.invoke("create_folder", folderName),
    notes: (folderName, uid) =>
        ipcRenderer.invoke("fetch_notes", folderName, uid),
    pinFolder: (folderName, uid) =>
        ipcRenderer.invoke("pin__folder", folderName, uid),
    rename: (name, uid, folderName) => ipcRenderer.invoke("rename__folder", name, uid, folderName),
    isEmpty: (folderName) => ipcRenderer.invoke("is_folder_empty", folderName),
    delete: (folderName, uid) => ipcRenderer.invoke("delete__folder", folderName, uid),
}
const Notes = {
    pinNote: (folderName, uid, noteID) =>
        ipcRenderer.invoke("pin__note", folderName, uid, noteID),
    archive: (folderName, uid, noteID) =>
        ipcRenderer.invoke("archive__note", folderName, uid, noteID),
    unarchive: (folderName, uid, noteID) =>
        ipcRenderer.invoke("unarchive__note", folderName, uid, noteID),
}

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld("electron", electronAPI)
        contextBridge.exposeInMainWorld("api", api)
        contextBridge.exposeInMainWorld("folders", folders)
        contextBridge.exposeInMainWorld("notes", Notes)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.api = api
    window.folders = folders
    window.notes = Notes;
}
