class PopupAvatar {
    constructor(popupName, popupCard, addAvatar) {
        this.userInfo = userInfo;
        this.popupCard = popupCard;
        this.addAvatar = addAvatar;
        this.button = document.querySelector('.user-info__photo');
        this.popupName = popupName;
        this.form = this.popupName.querySelector('form');
        this.button.addEventListener('click', this.open.bind(this));
        this.popupName.addEventListener('click', this.popupCard.close.bind(this));
        this.form.addEventListener('submit', this.setAvatar.bind(this));
    }

    open() {
        this.popupCard._setStatusPopup(this.popupName);
        this.popupCard._setButtonDefault.bind(this)();
        this.popupCard._resetErrorDefault.bind(this)();
    }

    setAvatar(event) {
        event.preventDefault();
        const button = this.form.querySelector('.popup__button');
        if (button.matches('.popup__button_active')) {
            this.addAvatar(event.target);
        }
    }
}