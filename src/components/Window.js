/*
    Window component, mostly take cares of document stuff
    By Zoey Désautels
*/

module.exports = class Window {
    constructor() {
        this.AppWindow = remote.getCurrentWindow(); // Some electron thing

        // On window load
        document.addEventListener('DOMContentLoaded', () => this.onLoadHandler());

        // For drag and drop support
        document.ondragover = () => {return false;};
        document.ondragleave = () => {return false;};
        document.ondragend = () => {return false;};
        document.addEventListener('drop', (event) => this.onDropHandler(event));
    }
    
    // When the app is ready
    onLoadHandler() {
        ImageViewer.openFolderDialog();
        this.loadShortcuts();
    }

    // When you drop an item
    onDropHandler(event) {
        event.preventDefault();

        // Any files to load?
        if(event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            let file = event.dataTransfer.files[0].path;
            let fileStat = fs.statSync(file);
            let folder = "";

            fileStat.isFile() ? folder = path.dirname(file) : folder = file;
            
            ImageViewer.loadFolder(folder);
        }

        return false;
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
        
            "p": () => ImageViewer.openFolderDialog(),
            "f": () => this.toggleFullscreen(),
            "c": () => clipboard.writeImage(ImageViewer.files[ImageViewer.index])
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