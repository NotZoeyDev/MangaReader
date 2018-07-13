/**
 *  Images panel shown at the bottom of the screen
 * By @ZoeyLovesMiki, 2019
 */

module.exports = class ImagesBox {
    constructor() {
        this.box = document.querySelector(".imagebox");
        this.shown = false;

        this.box.addEventListener("wheel", (e) => this.wheelHandler(e));
        this.box.addEventListener("keydown", (e) => {e.preventDefault()});
    }

    // Show the box
    show() {
        if(!this.shown) {
            this.loadImages(() => {
                this.box.dataset.show = "true";
                this.shown = true;
                this.updateScroll();
            });        
        }
    }

    // Hide the box
    hide() {
        this.box.dataset.show = "false";
        this.shown = false;
        setTimeout(() => {
            if(this.shown == false) this.unloadImages();
        }, 300);
    }

    // Load the images
    loadImages(callback) {
        let files = ImageViewer.files;
        this.box.innerHTML = "";

        for(let f in files) {
            let file = files[f];

            let boxElem = document.createElement("div");
            boxElem.className = "box";

            let imgElem = document.createElement("img");
            imgElem.src = file;

            let textElem = document.createElement("p");
            textElem.textContent = path.basename(file);

            boxElem.appendChild(imgElem);
            boxElem.appendChild(textElem);

            boxElem.addEventListener("click", (event) => {
                ImageViewer.index = parseInt(f);
                ImageViewer.loadPage();
            });

            this.box.appendChild(boxElem);
        }

        callback();
    }

    // Scroll to image
    updateScroll() {
        if(this.shown) {
            let images = this.box.querySelectorAll("img");

            for(let i in images) {
                if(i == ImageViewer.index) {
                    this.box.scrollLeft = i * 200;
                    break;
                }
            }
        }
    }

    // Handle scrolling
    wheelHandler(event) {
        event.preventDefault();
        let scrollData = event.wheelDelta > 0 ? 100 : -100;
        this.box.scrollLeft += scrollData;
    }

    // Unload images
    unloadImages() {
        this.box.innerHTML = "";
    }
}