class PopupCard extends Popup{
    constructor(popupName, createCard, api) {
        super();

        this.buttonOpen = document.querySelector('.user-info__button');
        this.createCard = createCard;
        this.api = api;
        this.popupName = popupName;
        this.form = this.popupName.querySelector('form');
        this.buttonPopupCard = this.form.querySelector('.popup__button');
        this.buttonOpen.addEventListener('click', this.open.bind(this));
        this.popupName.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this.close.bind(this));
        this.form.addEventListener('submit', this.addCardFromForm.bind(this));
    }

    // по submit вызывает фунцию создания карточки если поля валидны
    // валидность завязана на button.matches('.popup__button_active')
    addCardFromForm(event) {
        event.preventDefault();
        if (this.popupName.matches('#popupNewPlace')) {
            if (this.buttonPopupCard.matches('.popup__button_active')) {
                this.renderLoading(true);
                const { name, link } = this.form.elements;
                this.createCardApi(name.value, link.value);
            }
        }
    }

    // создаём карточку на сервере и вызываем функцию создания на странице после ответа сервера
    createCardApi(name, link) {
        this.api.createCard(name, link)
            .then(result => {
                this.createCard(result.name, result.link, result._id, result.likes, userInfo.idUser, result.owner._id, this.api)
                this.form.reset();
                this.popupName.classList.remove('popup_is-opened');
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.renderLoading(false);
            });
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this.buttonPopupCard.style.fontSize = '18px';
            this.buttonPopupCard.textContent = 'Загрузка...';
        } else {
            this.buttonPopupCard.style.fontSize = '36px';
            this.buttonPopupCard.textContent = '+';
        }
    }
}