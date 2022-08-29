class UserInfo {
  // у меня на этой логике многие вещи завязаны, в том числе и вёрстка, менять это будет очень проблемно. Могу ли я оставить эти названия? Заранее благодарю.
  constructor({ name, job }) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
export default UserInfo;
