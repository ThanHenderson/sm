// Native
const { join } = require('path');
const { format } = require('url');

// Packages
const { BrowserWindow, app } = require('electron');
const isDev = require('electron-is-dev');
const prepareNext = require('electron-next');

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('.');

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: join(__dirname, 'public/256.png'),
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: false,
      // preload: join(__dirname, 'preload.js'),
    },
  });

  const url = isDev
    ? 'http://localhost:8000'
    : format({
      pathname: join(__dirname, '../out/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit);

// listen the channel `message` and resend the received message to the renderer process
// ipcMain.on('message', (event, message) => {
//   event.sender.send('message', message);
// });

export {};
