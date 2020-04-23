class Api {
  constructor(options) {
    this.options = options;
  }


  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  getUserInfo() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  updateUserInfo(name, about) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  createCard(name, link) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  likeAdd(idCard) {
    return fetch(`${this.options.baseUrl}/cards/like/${idCard}`, {
      method: 'PUT',
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  likeDel(idCard) {
    return fetch(`${this.options.baseUrl}/cards/like/${idCard}`, {
      method: 'Delete',
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  cardDel(idCard) {
    return fetch(`${this.options.baseUrl}/cards/${idCard}`, {
      method: 'Delete',
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  setAvatar(link) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }
}