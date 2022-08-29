class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
  }

  setUserInfo({ nameSelector, jobSelector }) {
    this._nameSelector.textContent = nameSelector;
    this._jobSelector.textContent = jobSelector;
  }
}
export default UserInfo;
