class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
    this._headers = setting.headers;
  }

  getUserInformation() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => res.json());
  }

  getInitialCards() {
    return fetch(this._address, {
      method: "GET",
      headers: this._headers,
    }).then((res) => res.json());
    //   .then((result) => {
    //     // console.log(result);
    //   });
  }
}

export default Api;
