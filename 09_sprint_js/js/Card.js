class Card {
    constructor(name, link, cardId, likeCounter, idUser, idOwner, api) {
        this.name = name;
        this.link = link;
        this.cardId = cardId;
        this.likeCounter = likeCounter;
        this.idUser = idUser;
        this.idOwner = idOwner;
        this.api = api;
        this.popupImage = document.querySelector('#popupImage');
    }

    like(event) {
        const likeCount = event.target.closest('.place-card__likes').querySelector('.place-card__like-count');
        if (!event.target.matches('.place-card__like-icon_liked')) {
            this.api.likeAdd(likeCount.dataset.id)
                .then(result => {
                    likeCount.textContent = result.likes.length;
                    event.target.classList.add('place-card__like-icon_liked');
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.api.likeDel(likeCount.dataset.id)
                .then(result => {
                    likeCount.textContent = result.likes.length;
                    event.target.classList.remove('place-card__like-icon_liked');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    remove(event) {
        if (confirm('Вы действительно хотите удалить эту карточку?')) {
            const likeCount = event.target.closest('.place-card').querySelector('.place-card__like-count');
            this.api.cardDel(likeCount.dataset.id)
                .then(() => {
                    const placeCard = likeCount.closest('.place-card');
                    container.removeChild(placeCard);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    create() {
        const tmpl = document.getElementById('tmpl'); // тег template
        const fragment = (tmpl.content).cloneNode(true);
        const placeCardImage = fragment.querySelector('.place-card__image');
        const placeCardName = fragment.querySelector('.place-card__name');
        const likeCount = fragment.querySelector('.place-card__like-count');
        likeCount.setAttribute('data-id', this.cardId);
        likeCount.textContent = this.likeCounter.length;
        placeCardImage.style.backgroundImage = `url(${this.link})`;
        placeCardName.textContent = this.name;

        const likeIcon = fragment.querySelector('.place-card__like-icon');
        this.likeCounter.forEach(item => {
            if (item._id === this.idUser) {
                likeIcon.classList.add('place-card__like-icon_liked');
            }
        });

        const delBtn = fragment.querySelector('.place-card__delete-icon');
        if(this.idOwner === this.idUser) delBtn.style.display = 'block';

        placeCardImage.setAttribute('data-url', this.link);
        const template = fragment.cloneNode(true);
        template.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));
        template.querySelector('.place-card__delete-icon').addEventListener('click', this.remove.bind(this));
        template.querySelector('.place-card__image').addEventListener('click', this.openImage.bind(this));
        return template;
    }

    openImage(event) {
        if (event.target.matches('.place-card__image')) {
            const imageSrc = event.target.dataset.url;
            const popupImg = this.popupImage.querySelector('.popup__img');
            popupImg.src = imageSrc;
            this.popupImage.classList.add('popup_is-opened');
        }
    }
}