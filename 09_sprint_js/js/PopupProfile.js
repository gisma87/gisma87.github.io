class PopupProfile extends Popup {
    constructor(popupName, popupCard, userInfo) {
        super();

        this.userInfo = userInfo;
        this.popupCard = popupCard;
        this.button = document.querySelector('.user-info__button-edit');
        this.popupName = popupName;
        this.form = this.popupName.querySelector('form');
        this.button.addEventListener('click', this.open.bind(this));
        this.popupName.addEventListener('click', this.popupCard.close.bind(this));
    }

    open() {
        super.open();
        this.userInfo.setUserInfo();
    }
}