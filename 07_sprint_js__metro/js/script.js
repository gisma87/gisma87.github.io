/* Переменные */

const placesList = document.querySelector('.places-list');
const buttonPopupOpen = document.querySelector('.user-info__button');
const buttonPopupEditOpen = document.querySelector('.user-info__button-edit');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const popupNewPlace = document.querySelector('#popupNewPlace');
const popupProfile = document.querySelector('#popupProfile');
const popupImage = document.querySelector('#popupImage');
const popupInputNameProfile = document.querySelector('#nameProfile');
const popupInputAboutMe = document.querySelector('#aboutMe');
const formNewPlace = popupNewPlace.querySelector('.popup__form');
const formPofile = popupProfile.querySelector('.popup__form');

/* Функции */

// Валидация

function resetError(errorElement) {
  errorElement.textContent = '';
}

// сбрасывает сообщение ошибки валидации - использую при открытии формы
function resetErrorDefault(form) {
  const errorElements = Array.from(form.querySelectorAll('.popup__error-message'));
  errorElements.forEach(errorElement => resetError(errorElement));
}

function checkInputValidity(element) {
  const errorMessages = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    typeMismatch: 'Здесь должна быть ссылка'
  };
  const errorElement = element.closest('form').querySelector(`#error-${element.id}`);
  if (!element.checkValidity()) {
    if (element.validity.valueMissing) {
      errorElement.textContent = errorMessages.valueMissing;
    } else if (element.validity.typeMismatch) {
      errorElement.textContent = errorMessages.typeMismatch;
    } else if (element.validity.tooShort || element.validity.tooLong) {
      errorElement.textContent = errorMessages.tooShort;
    } else {
      errorElement.textContent = element.validationMessage;
    }
    return false;
  }
  resetError(errorElement);
  return true;
}

function checkFormValidity(form) {
  const inputs = Array.from(form.getElementsByTagName('input'));
  let isValidForm = true;
  inputs.forEach(elem => {
    if (!checkInputValidity(elem)) isValidForm = false;
  });
  return isValidForm;
}

// делает кнопку неактивной - использую при открытии формы
function setButtonDefault(form) {
  const button = form.querySelector('.popup__button');
  button.classList.remove('popup__button_active');
}

function setSubmitButtonState(element) {
  const button = element.closest('.popup').querySelector('.popup__button');
  if (checkFormValidity(element.closest('form'))) {
    button.classList.add('popup__button_active');
    return;
  }
  button.classList.remove('popup__button_active');
}

function setEventListeners(event) {
  checkInputValidity(event.target);
  setSubmitButtonState(event.target);
}

function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.textContent;
}

// создаёт элемент фотокарточки и возвращает его
function createCard(name, link) {
  const tmpl = placesList.querySelector('#tmpl'); // тег template
  const fragment = (tmpl.content).cloneNode(true);
  const placeCardImage = fragment.querySelector('.place-card__image');
  const placeCardName = fragment.querySelector('.place-card__name');
  const bglink = sanitizeHTML(link);
  placeCardImage.style.backgroundImage = `url(${bglink})`;
  placeCardName.textContent = sanitizeHTML(name);
  placeCardImage.setAttribute('data-url', bglink);
  return fragment.cloneNode(true);
}

// добавляет элемент фотокарточки
function addCard(name, link, container) {
  const placeCard = createCard(name, link);
  container.appendChild(placeCard);
}

function setStatusPopup(element) {
  element.classList.toggle('popup_is-opened');
}

function openPopupNewPlace() {
  resetErrorDefault(formNewPlace);
  setButtonDefault(formNewPlace);
  setStatusPopup(popupNewPlace);
}

// закрывает все popup по клику на крестик или вне popup
function closePopupClick(event) {
  const parentPopup = event.target.closest('.popup');
  if (event.target.matches('.popup__close')
    || (!event.target.closest('.popup__content')
      && !event.target.closest('.popup__image-container'))
  ) {
    if (parentPopup !== null) setStatusPopup(event.target.closest('.popup'));
  }
}

// закрывает открытый popup через Esc
function closePopupKey(event) {
  const popupArray = document.querySelectorAll('.popup');
  if (event.key === 'Escape') {
    popupArray.forEach(elem => {
      if (elem.matches('.popup_is-opened')) elem.classList.remove('popup_is-opened');
    });
  }
}

// Добавляет элемент фотокарточки из формы
function addCardFromForm(event) {
  event.preventDefault();
  const { name, link } = formNewPlace.elements;
  if (checkFormValidity(event.target.closest('form'))) {
    addCard(name.value, link.value, placesList);
    formNewPlace.reset();
    setStatusPopup(popupNewPlace);
  }
}

// добавляет фотокарточки из массива initialCards
function addCardDefault() {
  initialCards.forEach(item => addCard(item.name, item.link, placesList))
}

// удаляет элемент фотокарточки
function removeCard(event) {
  if (event.target.matches('.place-card__delete-icon')) {
    const placeCard = (event.target).closest('.place-card');
    placesList.removeChild(placeCard);
  }
}

// обработчик клика по сердечку
function likeHandler(target) {
  if (target.matches('.place-card__like-icon')) {
    target.classList.toggle('place-card__like-icon_liked');
  }
}

// открывает форму Edit профиля
function openPopupEdit() {
  popupInputNameProfile.value = userInfoName.textContent;
  popupInputAboutMe.value = userInfoJob.textContent;
  resetErrorDefault(formPofile);
  setButtonDefault(formPofile);
  setStatusPopup(popupProfile);
}

// работа с формой popupEdit при submit
function popupEdit(event) {
  event.preventDefault();
  if (checkFormValidity(formPofile)) {
    userInfoName.textContent = popupInputNameProfile.value;
    userInfoJob.textContent = popupInputAboutMe.value;
    formPofile.reset();
    setStatusPopup(popupProfile);
  }
}

// открывает popup с фото
function openPopupImage(event) {
  if (event.target.matches('.place-card__image')) {
    const imageSrc = event.target.dataset.url;
    const popupImg = popupImage.querySelector('.popup__img');
    popupImg.src = imageSrc;
    setStatusPopup(popupImage);
  }
}

/* Слушатели событий */

buttonPopupOpen.addEventListener('click', openPopupNewPlace);
document.addEventListener('click', closePopupClick);
document.addEventListener('keydown', closePopupKey);
placesList.addEventListener('click', (event) => likeHandler(event.target));
formNewPlace.addEventListener('submit', addCardFromForm);
placesList.addEventListener('click', removeCard);
buttonPopupEditOpen.addEventListener('click', openPopupEdit);
formPofile.addEventListener('submit', popupEdit);
placesList.addEventListener('click', openPopupImage);
formNewPlace.addEventListener('input', setEventListeners);
formPofile.addEventListener('input', setEventListeners);

addCardDefault();