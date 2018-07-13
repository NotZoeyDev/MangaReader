/*
    App code
    By Zoey Désautels
*/

// Some imports lol
const remote = require('electron').remote;
const {dialog, BrowserWindow} = remote;
const fs = require('fs');

// Some variables
let AppWindow = remote.getCurrentWindow();
let files = [];
let index = 0;

// Load/set the picture
function setPicture() {
    document.querySelector("#image").src = files[index];
}

function setupKeys() {
    document.addEventListener("keydown", (event) => {
        let key = event.key;
        if(key == "ArrowLeft") previousFile();
        if(key == "ArrowRight") nextFile();
        if(key == "p") openFolder();
        if(key == "f") toggleFullscreen();
    });
}

function toggleFullscreen() {
    AppWindow.isFullScreen() ? AppWindow.setFullScreen(false) : AppWindow.setFullScreen(true);
}

function nextFile() {
    index = files.length == index + 1 ? 0 : index + 1;
    setPicture();
}

function previousFile() {
    index = -1 == index - 1 ? files.length - 1 : index - 1;
    setPicture();
}

// Open a folder
function openFolder() {
    index = 0;
    files = [];
    dialog.showOpenDialog(AppWindow, {
        properties: ["openDirectory"]
    }, (filePaths, bookmarks) => {
        fs.readdir(filePaths[0], (err, _files) => {
            for(let file of _files) {
                files.push(`${filePaths[0]}/${file}`);
            }
            _files.length == 0 ? openFolder() : setPicture();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    openFolder();
    setupKeys();
});