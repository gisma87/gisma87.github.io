class PopupCard extends Popup{
    constructor(popupName, createCard, renderLoadingPopupCard) {
        super();

        this.buttonOpen = document.querySelector('.user-info__button');
        this.createCard = createCard;
        this.renderLoadingPopupCard = renderLoadingPopupCard;
        this.popupName = popupName;
        this.form = this.popupName.querySelector('form');
        this.buttonOpen.addEventListener('click', this.open.bind(this));
        this.popupName.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this.close.bind(this));
        this.form.addEventListener('submit', this.addCardFromForm.bind(this));
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