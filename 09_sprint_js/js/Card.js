class Card {
  constructor(name, link, container, likeToggle, deleteCard) {
    this.name = name;
    this.link = link;
    this.container = container;
    this.likeToggle = likeToggle;
    this.deleteCard = deleteCard;
    this.popupImage = document.querySelector('#popupImage');;
  }

  like(event) {
    const likeCount = event.target.closest('.place-card__likes').querySelector('.place-card__like-count');
    if (!event.target.matches('.place-card__like-icon_liked')) {
      this.likeToggle(event.target, likeCount, true);
    } else {
      this.likeToggle(event.target, likeCount, false);
    }
  }

  remove(event) {
    if (confirm('Вы действительно хотите удалить эту карточку?')) {
      const likeCount = event.target.closest('.place-card').querySelector('.place-card__like-count');
      this.deleteCard(likeCount);
    }
  }

  sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.textContent;
  }

  create(name, link, likes, cardId) {
    const tmpl = this.container.querySelector('#tmpl'); // тег template
    const fragment = (tmpl.content).cloneNode(true);
    const placeCardImage = fragment.querySelector('.place-card__image');
    const placeCardName = fragment.querySelector('.place-card__name');
    const bglink = this.sanitizeHTML(link);
    const likeCount = fragment.querySelector('.place-card__like-count');
    likeCount.setAttribute('data-id', cardId);
    likeCount.textContent = likes;
    placeCardImage.style.backgroundImage = `url(${bglink})`;
    placeCardName.textContent = this.sanitizeHTML(name);
    placeCardImage.setAttribute('data-url', bglink);
    const template = fragment.cloneNode(true);
    template.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));
    template.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this));
    template.querySelector('.place-card__image').addEventListener('click', this.openImage.bind(this));
    return template;
  }

  openImage() {
    if (event.target.matches('.place-card__image')) {
      const imageSrc = event.target.dataset.url;
      const popupImg = this.popupImage.querySelector('.popup__img');
      popupImg.src = imageSrc;
      this.popupImage.classList.add('popup_is-opened');
    }
  }
}