/*
    Window component, handles everything else
    By @ZoeyLovesMiki, 2019
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
        this.loadShortcuts();

        let file = ipcRenderer.sendSync("get-file");
        if(file && fs.statSync(file).isFile()) {
            ImageViewer.loadFolder(path.dirname(file));
        } else {
            ImageViewer.openFolderDialog();
        }
    }

    // When you drop an item
    onDropHandler(event) {
        event.preventDefault();

        // Any files to load?
        if(event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            let file = event.dataTransfer.files[0].path;
            let fileStat = fs.statSync(file);
            let folder;

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

    // Load the keyboard shortcuts
    loadShortcuts() {
        const Shortcuts = {
            "ArrowLeft": () => ImageViewer.loadPreviousPage(),
            "ArrowRight": () => ImageViewer.loadNextPage(),
            "ArrowUp": () => ImagesBox.show(),
            "ArrowDown": () => ImagesBox.hide(),
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
        
            "d": () => this.AppWindow.webContents.openDevTools(),
            "p": () => ImageViewer.openFolderDialog(),
            "f": () => this.toggleFullscreen(),
            "c": () => clipboard.writeImage(ImageViewer.files[ImageViewer.index])
        };

        document.addEventListener("keydown", (event) => {
            let key = event.key;
            if(Shortcuts[key]) Shortcuts[key]();
        });
    
        document.addEventListener("wheel", (event) => {
            if(!event.path.includes(ImagesBox.box)) event.deltaY > 0 ? ImageViewer.loadPreviousPage() : ImageViewer.loadNextPage();
        });
    }
}