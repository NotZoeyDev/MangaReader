/**
 * File information box
 * By @ZoeyLovesMiki, 2019
 */

module.exports = class InfoBox {
    constructor() {
        this.infobox = document.querySelector(".info");

        this.filename = this.infobox.querySelector(".filename");
        this.foldername = this.infobox.querySelector(".folder");
    }

    setInfo() {
        this.filename.textContent = path.basename(ImageViewer.files[ImageViewer.index]);
        this.foldername.textContent = path.normalize(ImageViewer.folder);
    }

    toggle() {
        this.infobox.dataset.show = this.infobox.dataset.show == "true" ? "false" : "true";
    }
}