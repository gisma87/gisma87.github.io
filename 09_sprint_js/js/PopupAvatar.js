class PopupAvatar extends Popup {
    constructor(popupName, popupCard, api) {
        super();

        this.popupName = popupName;
        this.popupCard = popupCard;
        this.api = api;

        this.button = document.querySelector('.user-info__photo');
        this.form = this.popupName.querySelector('form');

        this.button.addEventListener('click', this.open.bind(this));
        this.popupName.addEventListener('click', this.popupCard.close.bind(this));
        this.form.addEventListener('submit', this.setAvatar.bind(this));
    }

    setAvatar(event) {
        event.preventDefault();
        const button = this.form.querySelector('.popup__button');
        if (button.matches('.popup__button_active')) {

            this.api.setAvatar(this.form.querySelector('#avatar').value)
                .then(result => {
                    userPhoto.style.backgroundImage = `url(${result.avatar})`;
                    this.form.reset();
                    popupAvatarNode.classList.remove('popup_is-opened');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}