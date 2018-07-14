/*
    ImageViewer component
    By Zoey Désautels, 2018
*/

module.exports = class ImageViewer {
    constructor() {
        // The two containers we use
        this.viewer = document.querySelector("#image");
        this.background = document.querySelector("#blur");

        // Variables
        this.index;
        this.files;
        this.folder;
    }

    // Load the image file
    loadPage() {
        this.viewer.src = this.files[this.index];
        this.background.src = this.files[this.index];

        InfoBox.setInfo();
        Window.setTitle();
    }

    // Load the next page
    loadNextPage() {
        this.index = this.files.length == this.index + 1 ? 0 : this.index + 1;
        this.loadPage();
    }

    // Load the previous page
    loadPreviousPage() {
        this.index = -1 == this.index - 1 ? this.files.length - 1 : this.index - 1;
        this.loadPage();
    }

    // Load a folder
    loadFolder() {
        // Reset the index and files variables
        this.index = 0;
        this.files = [];

        dialog.showOpenDialog(Window.AppWindow, {
            properties: ["openDirectory"]
        }, (filePaths, bookmarks) => {
            if(filePaths && filePaths.length > 0) {
                fs.readdir(filePaths[0], (err, _files) => {
                    this.folder = filePaths[0];
        
                    // Filter out non-image files
                    for(let file of _files) {
                        let filePath = `${this.folder}/${file}`;
                        let fileStat = fs.statSync(filePath);

                        // Check if the current "file" is a file
                        if(fileStat.isFile()) {
                            let imagesExtension = [
                                ".png", ".jpg", ".gif"
                            ];
                            let fileExtension = path.extname(filePath);

                            // Check that the file is an image
                            if(imagesExtension.includes(fileExtension)) this.files.push(filePath);
                        }
                    }
                    
                    // Sort files via their timestamp
                    this.files.sort((a, b) => {
                        return fs.statSync(a).mtime.getTime() - fs.statSync(b).mtime.getTime();
                    });

                    // Check if we have any files to load
                    this.files.length == 0 ? 
                        dialog.showMessageBox(Window.AppWindow, {
                            type: "error",
                            title: "Error",
                            message: "No images were found in the selected folder."
                        }, () => {
                            this.loadFolder();
                        })
                    : this.loadPage();
                });
            } else {
                remote.app.exit(0);
            }
        });
        
    }
}