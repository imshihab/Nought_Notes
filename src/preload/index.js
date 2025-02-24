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
}

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld("electron", electronAPI)
        contextBridge.exposeInMainWorld("api", api)
        contextBridge.exposeInMainWorld("folders", folders)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.api = api
    window.folders = folders
}
