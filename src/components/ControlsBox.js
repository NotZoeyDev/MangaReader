module.exports = class ControlsBox {
    constructor() {
        let controlsContainer = document.querySelector('.controls');

        controlsContainer.querySelector('.left').addEventListener('click', () => ImageViewer.loadPreviousPage());
        controlsContainer.querySelector('.right').addEventListener('click', () => ImageViewer.loadNextPage());
    }
}