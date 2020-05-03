class Popup {
    constructor() {
    }

    open() {
        this._setStatusPopup(this.popupName);
        this._setButtonDefault();
        this._resetErrorDefault();
    };

    close(event) {
        const parentPopup = event.target.closest('.popup');
        const popupArray = document.querySelectorAll('.popup');
        if (event.target.matches('.popup__close')
            || (!event.target.closest('.popup__content')
                && !event.target.closest('.popup__image-container'))
        ) {
            if (parentPopup !== null) {
                event.target.closest('.popup').classList.remove('popup_is-opened');
            }
            this.form.reset();
        }
        if (event.key === 'Escape') {
            popupArray.forEach(elem => {
                if (elem.matches('.popup_is-opened')) elem.classList.remove('popup_is-opened');
            });
            this.form.reset();
        }
    };

    _setStatusPopup(element) {
        element.classList.toggle('popup_is-opened');
    };

    _setButtonDefault() {
        const button = this.popupName.querySelector('form .popup__button');
        button.classList.remove('popup__button_active');
    }

    _resetErrorDefault() {
        const errorElements = Array.from(this.popupName.querySelectorAll('.popup__error-message'));
        errorElements.forEach(errorElement => { errorElement.textContent = '' });
    }
}