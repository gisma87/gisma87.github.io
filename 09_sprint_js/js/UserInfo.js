class UserInfo {
    constructor(openPopupName, updateUser, valueCopy, renderLoading) {
        this.openPopupName = openPopupName;
        this.valueCopy = valueCopy;
        this.form = this.openPopupName.querySelector('form');
        this.inputs = Array.from(this.form.getElementsByTagName('input'));
        this.form.addEventListener('submit', this.updateUserInfo.bind(this));
        this.updateUser = updateUser;
        this.renderLoading = renderLoading;
        this.idUser = '';
    }

    setUserInfo() {
        this.inputs.forEach((elem, index) => {
            this.inputs[index].value = this.valueCopy[index].textContent
        });
    }

    updateUserInfo(event) {
        event.preventDefault();
        const button = this.form.querySelector('.popup__button');
        if (button.matches('.popup__button_active')) {
            renderLoading(true);
            const [name, about] = this.inputs;
            this.updateUser(name.value, about.value);
        }
    }

    userInfoDefault(name, about) {
        const [userInfoName, userInfoJob] = this.valueCopy;
        userInfoName.textContent = name;
        userInfoJob.textContent = about;
    }
}