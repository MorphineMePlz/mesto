import { data } from "autoprefixer";
import { ids } from "webpack";

class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  handelResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  }

  getUserInformation() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this.handelResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this.handelResponse(res));
  }

  editUserInformation({ job, name }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: job,
      }),
    }).then((res) => this.handelResponse(res));
  }

  addNewCard({ place, link }) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link,
      }),
    }).then((res) => this.handelResponse(res));
  }

  deleteOwnCard(id) {
    return fetch(`${this._address}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this.handelResponse(res));
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "ecb6ef6c-d4a1-4cc5-86ed-4ee02166ff91",
    "Content-Type": "application/json",
  },
});
