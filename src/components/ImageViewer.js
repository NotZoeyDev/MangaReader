/*
    Image viewer panel
    By @ZoeyLovesMiki, 2019
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
        ImagesBox.updateScroll();
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

    loadFolder(folderpath) {
        let _files = fs.readdirSync(folderpath);
        this.folder = folderpath;
        let files = [];

        // Filter out non-image files
        for (let file of _files) {
            let filePath = `${this.folder}/${file}`;
            let fileStat = fs.statSync(filePath);

            // Check if the current "file" is a file
            if (fileStat.isFile()) {
                let imagesExtension = [
                    ".png", ".jpg", ".gif"
                ];
                let fileExtension = path.extname(filePath);

                // Check that the file is an image
                if (imagesExtension.includes(fileExtension)) files.push(filePath);
            }
        }

        // Sort files via their timestamp
        files.sort((a, b) => {
            return fs.statSync(a).mtime.getTime() - fs.statSync(b).mtime.getTime();
        });

        // Check if we have any files to load
        if (files.length == 0) {
            dialog.showMessageBox(Window.AppWindow, {
                type: "error",
                title: "Error",
                message: "No images were found in the selected folder."
            }, () => {
                if (this.files.length == 0) this.openFolderDialog();
            })
        } else {
            this.index = 0;
            this.files = files;
            if (ImagesBox.shown) {
                ImagesBox.unloadImages();
                ImagesBox.loadImages(() => { });
            }
            this.loadPage();
        }
    }

    // Load a folder
    openFolderDialog() {
        dialog.showOpenDialog(Window.AppWindow, {
            properties: ["openDirectory"]
        }, (filePaths, bookmarks) => {
            if (filePaths && filePaths.length > 0) {
                this.loadFolder(filePaths[0]);
            } else {
                if (this.folder == "") remote.app.exit(0);
            }
        });
    }
}