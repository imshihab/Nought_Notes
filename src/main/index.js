import { app, shell, BrowserWindow, ipcMain } from "electron"
import path, { join } from "path"
import fs from "node:fs"
import { electronApp, optimizer, is } from "@electron-toolkit/utils"
import icon from "../../resources/icon.png?asset"
import DataBase from "./db"

const initDatabase = async () => {
    const basePath = path.join(__dirname, "./../DataBase")
    try {
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true })
        }
        const Folders = ["Notes", "Archives", "Favorites", "Trash", "Hidden"]
        Folders.forEach((folder) => {
            const folderPath = path.join(basePath, folder)
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath)
            }
            if (folder === "Notes") {
                const Notes = path.join(folderPath, "Notes")
                if (!fs.existsSync(Notes)) {
                    fs.mkdirSync(Notes)
                }
                const uidPath = path.join(Notes, `uid_0000000`)
                if (!fs.existsSync(uidPath)) {
                    fs.mkdirSync(uidPath)
                }
            }
        })
    } catch (error) {
        console.error("Error initializing database:", error)
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        icon: icon,
        webPreferences: {
            preload: join(__dirname, "../preload/index.js"),
            sandbox: false
        },
        titleBarStyle: "hidden",
        frame: false
    })

    mainWindow.on("ready-to-show", () => {
        mainWindow.show()
    })

    mainWindow.on("maximize", () => {
        mainWindow.webContents.send("window-maximized")
    })

    mainWindow.on("unmaximize", () => {
        mainWindow.webContents.send("window-restored")
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: "deny" }
    })

    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
        mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"])
    } else {
        mainWindow.loadFile(join(__dirname, "../renderer/index.html"))
    }
}

app.whenReady().then(async () => {
    electronApp.setAppUserModelId("com.electron")

    app.on("browser-window-created", (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    ipcMain.on("close-app", () => {
        if (process.platform !== "darwin") {
            app.quit()
            return
        }
        app.quit()
    })

    ipcMain.on("minimize", () => BrowserWindow.getFocusedWindow()?.minimize())
    ipcMain.on("maximize", () => {
        BrowserWindow.getFocusedWindow()?.isMaximized()
            ? BrowserWindow.getFocusedWindow()?.unmaximize()
            : BrowserWindow.getFocusedWindow()?.maximize()
    })

    ipcMain.on("check-window-state", () => {
        const focusedWindow = BrowserWindow.getFocusedWindow()
        if (focusedWindow) {
            if (focusedWindow.isMaximized()) {
                focusedWindow.webContents.send("window-maximized")
            } else {
                focusedWindow.webContents.send("window-restored")
            }
        }
    })

    createWindow()
    await initDatabase()

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    DataBase()
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
