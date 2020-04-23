class PopupImage {
    constructor(popupImage) {
        this.popupImage = popupImage;
        this.popupImage.addEventListener('click', this.close.bind(this));
    }

    close(event) {
        if (event.target.matches('.popup__close')
            || !event.target.closest('.popup__image-container')) {
            event.target.closest('.popup').classList.remove('popup_is-opened')
        }
    };
}