'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  window.RANDOM_PHOTOS_COUNT = 10;
  window.LOAD_COMMENTS_PER_ITERATION = 5;
  window.FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  window.FILTER_POPULAR = 1;
  window.FILTER_RANDOM = 2;
  window.FILTER_DISCUSSED = 3;
  window.FILTER_TIMEOUT = 200;

  window.ErrorMessage = function (errorMessage, buttonTitles, buttonCallbacks) {
    this._errorMessage = errorMessage;
    this._buttonTitles = buttonTitles;
    this._buttonCallbacks = buttonCallbacks;
    this._formElement = null;
    this._formButtons = null;
  };

  window.ErrorMessage.prototype.open = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    document.body.querySelector('main').appendChild(errorMessage);
    this._formElement = document.querySelector('.error');
    var errorMessageText = this._formElement.querySelector('.error__title');
    this._formButtons = this._formElement.querySelectorAll('.error__button');
    errorMessageText.textContent = this._errorMessage;
    this._formButtons[0].textContent = this._buttonTitles[0];
    this._formButtons[1].textContent = this._buttonTitles[1];

    this._formButtons[0].addEventListener('click', this._buttonCallbacks[0]);
    this._formButtons[1].addEventListener('click', this._buttonCallbacks[1]);
  };

  window.ErrorMessage.prototype.close = function () {
    this._formButtons[0].removeEventListener('click', this._buttonCallbacks[0]);
    this._formButtons[1].removeEventListener('click', this._buttonCallbacks[1]);
    document.body.querySelector('main').removeChild(this._formElement);
  };

  window.UploadMessage = function () {
    this._formElement = null;
  };

  window.UploadMessage.prototype.open = function () {
    var uploadTemplate = document.querySelector('#messages').content.querySelector('div');
    var uploadMessage = uploadTemplate.cloneNode(true);
    document.body.querySelector('main').appendChild(uploadMessage);
    this._formElement = document.querySelector('.img-upload__message');
  };

  window.UploadMessage.prototype.close = function () {
    document.body.querySelector('main').removeChild(this._formElement);
  };

  window.SuccessMessage = function (buttonCallback) {
    this._buttonCallback = buttonCallback;
    this._formButton = null;
    this._formElement = null;
  };

  window.SuccessMessage.prototype.open = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    document.body.querySelector('main').appendChild(successMessage);
    this._formElement = document.querySelector('.success');
    this._formButton = this._formElement.querySelector('.success__button');
    this._formButton.addEventListener('click', this._buttonCallback);
  };

  window.SuccessMessage.prototype.close = function () {
    this._formButton.removeEventListener('click', this._buttonCallback);
    document.body.querySelector('main').removeChild(this._formElement);
  };
})();
