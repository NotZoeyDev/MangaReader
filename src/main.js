/**
 *  Electron entrypoint
 *  By @ZoeyLovesMiki, 2019
 */

// Electron imports
const {BrowserWindow, app, ipcMain} = require('electron');

// Our electron window
let window;

// When app is ready
app.on('ready', () => {
    // Create our BrowserWindow
    window = new BrowserWindow({
        backgroundColor: "#212121",
        title: "MangaReader",
        webPreferences: {
            devTools: true,
            nodeIntegration: true
        }
    });

    window.setMenu(null);
    
    window.loadFile("src/app.html");
});

// When all windows are closed
app.on('window-all-closed', () => {
    window = null;
    app.exit(0);
});

// Get files when a file is opened with the reader
ipcMain.on('get-file', (event, arg) => {
    let file = process.argv.length >= 2 ? process.argv[1] : null;
    
    event.returnValue = file;
});