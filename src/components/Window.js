/*
    Window component, mostly take cares of document stuff
    By Zoey Désautels
*/

module.exports = class Window {
    constructor() {
        this.AppWindow = remote.getCurrentWindow(); // Some electron thing

        document.addEventListener('DOMContentLoaded', () => {
            ImageViewer.loadFolder();
            this.loadShortcuts();
        });
    }

    // Toggle fullscreen
    toggleFullscreen() {
        this.AppWindow.isFullScreen() ? this.AppWindow.setFullScreen(false) : this.AppWindow.setFullScreen(true);
    }

    // Set/update the app title
    setTitle() {
        this.AppWindow.setTitle(`MangaReader - ${path.normalize(ImageViewer.files[ImageViewer.index])} - ${ImageViewer.index + 1}/${ImageViewer.files.length}`);
    }

    loadShortcuts() {
        const Shortcuts = {
            "ArrowLeft": () => ImageViewer.loadPreviousPage(),
            "ArrowRight": () => ImageViewer.loadNextPage(),
            "Enter": () => shell.showItemInFolder(files[index]),
        
            "Home": () => {
                ImageViewer.index = 0;
                ImageViewer.loadPage();
            },
            "End": () => {
                ImageViewer.index = ImageViewer.files.length - 1;
                ImageViewer.loadPage();
            },
            " ": () => {
                InfoBox.toggle();
            },
        
            "p": () => ImageViewer.loadFolder(),
            "f": () => this.toggleFullscreen(),
            "c": () => clipboard.writeImage(files[index])
        };

        document.addEventListener("keydown", (event) => {
            let key = event.key;
            if(Shortcuts[key]) Shortcuts[key]();
        });
    
        document.addEventListener("wheel", (event) => {
            event.deltaY > 0 ? previousFile() : nextFile();
        });
    }
}