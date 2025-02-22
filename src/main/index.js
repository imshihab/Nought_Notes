import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        icon: icon,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        },
        titleBarStyle: 'hidden',
        frame: false
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('window-maximized')
    })

    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('window-restored')
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.electron')

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    ipcMain.on('close-app', () => {
        if (process.platform !== 'darwin') {
            app.quit()
            return
        }
        app.quit()
    })

    ipcMain.on('minimize', () => BrowserWindow.getFocusedWindow()?.minimize())
    ipcMain.on('maximize', () => {
        BrowserWindow.getFocusedWindow()?.isMaximized()
            ? BrowserWindow.getFocusedWindow()?.unmaximize()
            : BrowserWindow.getFocusedWindow()?.maximize()
    })

    ipcMain.on('check-window-state', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow()
        if (focusedWindow) {
            if (focusedWindow.isMaximized()) {
                focusedWindow.webContents.send('window-maximized')
            } else {
                focusedWindow.webContents.send('window-restored')
            }
        }
    })

    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
