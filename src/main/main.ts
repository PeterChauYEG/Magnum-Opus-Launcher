import { app, BrowserWindow, ipcMain } from 'electron';
import { download } from 'electron-dl';
import startup from 'electron-squirrel-startup'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const createWindow = (): void => {
  if (startup) return app.quit();

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on(
    'download-item',
    async (event, { url }) => {
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
      // @ts-ignore
        const win: BrowserWindow = BrowserWindow.getFocusedWindow();
      await download(
          win,
          url,
          {
            onProgress: (data: { percent: number; transferredBytes: number; totalBytes: number }) => event.reply('download-progress', data)
          }
      );
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
