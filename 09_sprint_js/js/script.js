'use strict';
const container = document.querySelector('.places-list');
const userPhoto = document.querySelector('.user-info__photo');
const imageContainer = document.querySelector('#popupImage');
const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
};
const popupNewPlace = document.querySelector('#popupNewPlace');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const popupProfileNode = document.querySelector('#popupProfile');
new FormValidator(popupNewPlace.querySelector('form'), errorMessages);
new FormValidator(popupProfileNode.querySelector('form'), errorMessages);
const cardList = new CardList(container);
const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort10',
  headers: {
    authorization: 'e1b45cd6-f123-45ce-bec1-2b97665df892',
    'Content-Type': 'application/json'
  }
});


// устанавливает лайки в массиве карточек myLike
function showMyLikes(myLike) {
  myLike.forEach(item => {
    const likeCount = document.querySelector(`[data-id = "${item._id}"]`);
    const myLikeCard = likeCount.closest('.place-card__likes').querySelector('.place-card__like-icon');
    myLikeCard.classList.add('place-card__like-icon_liked');
  })
}

//устанавливаем кнопку Delete на мои карточки
function showMyDelBtn(delBtnArr) {
  delBtnArr.forEach(item => {
    const likeCount = document.querySelector(`[data-id = "${item._id}"]`);
    const delBtn = likeCount.closest('.place-card').querySelector('.place-card__delete-icon');
    delBtn.style.display = 'block';
  })
}

// получаем карточки с Api и отрисовываем на странице, с нашими лайками и иконками удаления
function getInitialCards() {
  api.getInitialCards()
    .then(result => {
      const cards = result.map(item => card.create(item.name, item.link, item.likes.length, item._id));
      cardList.render(cards);
      // получаем массив карточек с нашими лайками
      const myLike = result.filter(data => {
        for (let i = 0; i < data.likes.length; i++) {
          if (data.likes[i]._id === userInfo.idUser) return true;
        }
        return false;
      });
      // устанавливаем лайки в полученый массив
      showMyLikes(myLike);

      // получаем массив карточек установленных нами
      const delBtnArr = result.filter(data => {
        if (data.owner._id === userInfo.idUser) return true;
        return false;
      });
      // устанавливаем кнопку Delete на наши карточки
      showMyDelBtn(delBtnArr);
    })
    .catch((err) => {
      console.log(err);
    });
}

// создание новой карточки на странице после загрузки на сервер
function createCard(name, link) {
  api.createCard(name, link)
    .then(result => {
      cardList.addCard(card.create(result.name, result.link, result.likes.length, result._id));
      // делаем видимой кнопку Delete
      const likeCount = document.querySelector(`[data-id = "${result._id}"]`);
      const delBtn = likeCount.closest('.place-card').querySelector('.place-card__delete-icon');
      delBtn.style.display = 'block';
      popupNewPlace.querySelector('form').reset();
      popupNewPlace.classList.remove('popup_is-opened');
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingPopupCard(false);
    });
}

// удаление карточки
function deleteCard(likeCount) {
  api.cardDel(likeCount.dataset.id)
    .then(() => {
      const placeCard = likeCount.closest('.place-card');
      container.removeChild(placeCard);
    })
    .catch((err) => {
      console.log(err);
    });
}

// переключение лайков
function likeToggle(likeIcon, likeCount, toggle) {
  if (toggle) {
    api.likeAdd(likeCount.dataset.id)
      .then(result => {
        likeCount.textContent = result.likes.length;
        likeIcon.classList.add('place-card__like-icon_liked');
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.likeDel(likeCount.dataset.id)
      .then(result => {
        likeCount.textContent = result.likes.length;
        likeIcon.classList.remove('place-card__like-icon_liked');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// улучшенный UX в popupProfile
function renderLoading(isLoading) {
  const button = popupProfileNode.querySelector('.popup__button_text');
  if (isLoading) {
    button.textContent = 'Загрузка...';
  } else {
    button.textContent = 'Сохранить';
  }
}
// улучшенный UX в popupCard
function renderLoadingPopupCard(isLoading) {
  const button = popupNewPlace.querySelector('#popupButtonNewPlace');
  if (isLoading) {
    button.style.fontSize = '18px';
    button.textContent = 'Загрузка...';
  } else {
    button.style.fontSize = '36px';
    button.textContent = '+';
  }
}

// обновляем данные UserInfo
function updateUser(name, about) {
  api.updateUserInfo(name, about)
    .then(result => {
      userInfoName.textContent = result.name;
      userInfoJob.textContent = result.about;
      popupProfileNode.querySelector('form').reset();
      popupProfileNode.classList.remove('popup_is-opened');
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

const userInfo = new UserInfo(popupProfileNode, updateUser, [userInfoName, userInfoJob], renderLoading);
// загружаем данные UserInfo
function getUserInfo() {
  api.getUserInfo()
    .then(result => {
      userInfo.userInfoDefault(result.name, result.about);
      userPhoto.style.backgroundImage = `url(${result.avatar})`;
      userInfo.idUser = result._id;
    })
    .catch((err) => {
      console.log(err);
    });
}

function addAvatar(form) {
  api.setAvatar(form.querySelector('#avatar').value)
    .then(result => {
      userPhoto.style.backgroundImage = `url(${result.avatar})`;
      form.reset();
      popupAvatarNode.classList.remove('popup_is-opened');
    })
    .catch((err) => {
      console.log(err);
    });
}


const card = new Card('name', 'link', container, likeToggle, deleteCard);
const popupCard = new PopupCard(popupNewPlace, card, createCard, renderLoadingPopupCard);
new PopupProfile(popupProfileNode, popupCard, userInfo);
new PopupImage(imageContainer);

// добавление аватара
const popupAvatarNode = document.querySelector('#popupAvatar');
new PopupAvatar(popupAvatarNode, popupCard, addAvatar);
new FormValidator(popupAvatarNode.querySelector('form'), errorMessages);


getUserInfo();
getInitialCards();