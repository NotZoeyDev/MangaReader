/*
    Main entrypoint 
    By Zoey Désautels
*/

// Imports my dude
const {BrowserWindow, app} = require('electron');

// Main Window object
let MainWindow;

// Create Window
function CreateMainWindow() {
    MainWindow = new BrowserWindow({backgroundColor: "#212121", title: "MangaReader"});
    MainWindow.setMenu(null);
    MainWindow.webContents.openDevTools();
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