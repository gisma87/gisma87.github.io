class PopupCard {
    constructor(popupName, card, createCard, renderLoadingPopupCard) {
        this.buttonOpen = document.querySelector('.user-info__button');
        this.card = card;
        this.createCard = createCard;
        this.renderLoadingPopupCard = renderLoadingPopupCard;
        this.popupName = popupName;
        this.form = this.popupName.querySelector('form');
        this.buttonOpen.addEventListener('click', this.open.bind(this));
        this.popupName.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this.close.bind(this));
        this.form.addEventListener('submit', this.addCardFromForm.bind(this));
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

    addCardFromForm(event) {
        event.preventDefault();
        const button = this.form.querySelector('.popup__button');
        if (this.popupName.matches('#popupNewPlace')) {
            if (button.matches('.popup__button_active')) {
                this.renderLoadingPopupCard(true);
                const { name, link } = this.form.elements;
                this.createCard(name.value, link.value);
            }
        }
    }
}