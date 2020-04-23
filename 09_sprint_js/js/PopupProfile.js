class PopupProfile {
    constructor(popupName, popupCard, userInfo) {
        this.userInfo = userInfo;
        this.popupCard = popupCard;
        this.button = document.querySelector('.user-info__button-edit');
        this.popupName = popupName;
        this.form = this.popupName.querySelector('form');
        this.button.addEventListener('click', this.open.bind(this));
        this.popupName.addEventListener('click', this.popupCard.close.bind(this));
    }

    open() {
        this.popupCard._setStatusPopup(this.popupName);
        this.popupCard._setButtonDefault.bind(this)();
        this.popupCard._resetErrorDefault.bind(this)();
        this.userInfo.setUserInfo();
    }
}