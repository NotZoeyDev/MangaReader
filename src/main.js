/*
    Main entrypoint 
    By Zoey Désautels
*/

// Imports my dude
const {BrowserWindow, app, ipcMain} = require('electron');

// Main Window object
let MainWindow;

// Create Window
function CreateMainWindow() {
    MainWindow = new BrowserWindow({backgroundColor: "#212121", title: "MangaReader", webPreferences: {devTools: true}});
    MainWindow.setMenu(null);
    MainWindow.loadFile("src/app.html");
}

// When app is ready
app.on('ready', () => {
    CreateMainWindow();
});

// When all windows are closed
app.on('window-all-closed', () => {
    MainWindow = null;
    app.exit(0);
});

// Function to get the files
ipcMain.on('get-file', (event, arg) => {
    let file = process.argv.length >= 2 ? process.argv[1] : null;
    
    event.returnValue = file;
});