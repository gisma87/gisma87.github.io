class UserInfo {
    constructor(openPopupName, valueCopy, api, userPhoto) {
        const [userInfoName, userInfoJob] = valueCopy;
        this.userInfoName = userInfoName;
        this.userInfoJob = userInfoJob;
        this.openPopupName = openPopupName;
        this.api = api;
        this.userPhoto = userPhoto;
        this.valueCopy = valueCopy;
        this.form = this.openPopupName.querySelector('form');
        this.inputs = Array.from(this.form.getElementsByTagName('input'));
        this.form.addEventListener('submit', this.updateUserInfo.bind(this));
        this.buttonPopupProfile = this.form.querySelector('.popup__button');
        this.idUser = '';
    }

    setUserInfo() {
        this.inputs.forEach((elem, index) => {
            this.inputs[index].value = this.valueCopy[index].textContent
        });
    }

    getUserInfo() {
        this.api.getUserInfo()
            .then(result => {
                this.userInfoDefault(result.name, result.about);
                this.userPhoto.style.backgroundImage = `url(${result.avatar})`;
                this.idUser = result._id;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateUserInfo(event) {
        event.preventDefault();
        if (this.buttonPopupProfile.matches('.popup__button_active')) {
            this.renderLoading(true);
            const [name, about] = this.inputs;
            this.updateUser(name.value, about.value);
        }
    }
    updateUser(name, about) {
        api.updateUserInfo(name, about)
            .then(result => {
                this.userInfoDefault(result.name, result.about)
                this.form.reset();
                this.openPopupName.classList.remove('popup_is-opened');
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.renderLoading(false);
            });
    }

    userInfoDefault(name, about) {
        this.userInfoName.textContent = name;
        this.userInfoJob.textContent = about;
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this.buttonPopupProfile.textContent = 'Загрузка...';
        } else {
            this.buttonPopupProfile.textContent = 'Сохранить';
        }
    }
}