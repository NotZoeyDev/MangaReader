/**
 *  Import all our components into the app
 *  By @ZoeyLovesMiki, 2019
 */

// Electron imports
const {remote, ipcRenderer} = require('electron');
const {dialog, BrowserWindow, shell, clipboard} = remote;

// Node imports
const fs = require('fs'), path = require('path');

// Load the components
const Window = new (require('./components/Window.js'));
const ImageViewer = new (require('./components/ImageViewer.js'));
const ControlsBox = new (require('./components/ControlsBox.js'));
const InfoBox = new (require('./components/InfoBox.js'));
const ImagesBox = new (require('./components/ImagesBox.js'));