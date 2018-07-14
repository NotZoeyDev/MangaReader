/*
    Main code used for the viewer
    All the components take cares of themselves, no need for extra code here
    By Zoey Désautels
*/

// Imports
const remote = require('electron').remote;
const {dialog, BrowserWindow, shell, clipboard} = remote;
const fs = require('fs'), path = require('path');

// Load the components
const Window = new (require('./components/Window.js'));
const ImageViewer = new (require('./components/ImageViewer.js'));
const ControlsBox = new (require('./components/ControlsBox.js'));
const InfoBox = new (require('./components/InfoBox.js'));