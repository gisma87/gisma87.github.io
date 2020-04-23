class FormValidator {
    constructor(form, errorMessages) {
        this.form = form;
        this.errorMessages = errorMessages;
        form.addEventListener('input', this.setEventListeners.bind(this));
    }
    resetError(errorElement) {
        errorElement.textContent = '';
    }

    checkInputValidity(element) {
        const errorElement = element.closest('form').querySelector(`#error-${element.id}`);

        if (!element.checkValidity()) {
            if (element.validity.valueMissing) {
                errorElement.textContent = errorMessages.valueMissing;
                return;
            }
            if (element.validity.typeMismatch) {
                errorElement.textContent = errorMessages.typeMismatch;
                return;
            }
            if (element.validity.tooShort || element.validity.tooLong) {
                errorElement.textContent = errorMessages.tooShort;
                return;
            }
            errorElement.textContent = element.validationMessage;
            return false;
        }
        this.resetError(errorElement);
        return true;
    };

    checkFormValidity(form) {
        const inputs = Array.from(form.getElementsByTagName('input'));
        let isValidForm = true;
        inputs.forEach(elem => {
            if (!this.checkInputValidity(elem)) isValidForm = false;
        });
        return isValidForm;
    };

    setSubmitButtonState(element) {
        const button = element.closest('.popup').querySelector('.popup__button');
        if (this.checkFormValidity(element.closest('form'))) {
            button.classList.add('popup__button_active');
            return;
        }
        button.classList.remove('popup__button_active');
    };

    setEventListeners(event) {
        // this.checkInputValidity(event.target);
        this.setSubmitButtonState(event.target);
    };
}