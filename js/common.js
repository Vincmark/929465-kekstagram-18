'use strict';

(function () {

  window.common = {
    ESC_KEYCODE: 27,
    RANDOM_PHOTOS_COUNT: 10,
    LOAD_COMMENTS_PER_ITERATION: 5,
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],

    GALLERY_FILTER: {
      POPULAR: 'popular',
      RANDOM: 'random',
      DISCUSSED: 'discussed',
      TIMEOUT: 200,
    },

    PHOTO_FILTER: {
      ORIGINAL: 'original',
      CHROME: 'chrome',
      SEPIA: 'sepia',
      MARVIN: 'marvin',
      PHOBOS: 'phobos',
      HEAT: 'heat',
    },

    EFFECT: {
      PHOBOS: {
        MIN: 0,
        MAX: 3,
      },
      HEAT: {
        MIN: 1,
        MAX: 3,
      }
    },

    REQUEST: {
      TIMEOUT: 10000,
      STATUS_OK: 200,
      METHOD: {
        GET: 'GET',
        POST: 'POST',
      }
    },

    HASHTAGS: {
      MAX_LENGTH: 20,
      MAX_COUNT: 5,
    },

    COMMENTS: {
      MAX_LENGTH: 140,
    },

    GET_DATA_URL: 'https://js.dump.academy/kekstagram/data',
    POST_DATA_URL: 'https://js.dump.academy/kekstagram',

    SCALE_LEVEL: {
      MIN: 25,
      MAX: 100,
      STEP: 25,
    },

    EFFECT_INTENSITY_LEVEL: {
      MIN: 0,
      MAX: 100,
    },

    ErrorMessage: function (errorMessage, buttonTitles, buttonCallbacks) {
      this._errorMessage = errorMessage;
      this._buttonTitles = buttonTitles;
      this._buttonCallbacks = buttonCallbacks;
      this._formElement = null;
      this._formButtons = null;
    },

    UploadMessage: function () {
      this._formElement = null;
    },

    SuccessMessage: function (buttonCallback) {
      this._buttonCallback = buttonCallback;
      this._formButton = null;
      this._formElement = null;
    },
  };

  window.common.ErrorMessage.prototype.open = function () {
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

  window.common.ErrorMessage.prototype.close = function () {
    this._formButtons[0].removeEventListener('click', this._buttonCallbacks[0]);
    this._formButtons[1].removeEventListener('click', this._buttonCallbacks[1]);
    document.body.querySelector('main').removeChild(this._formElement);
  };

  window.common.UploadMessage.prototype.open = function () {
    var uploadTemplate = document.querySelector('#messages').content.querySelector('div');
    var uploadMessage = uploadTemplate.cloneNode(true);
    document.body.querySelector('main').appendChild(uploadMessage);
    this._formElement = document.querySelector('.img-upload__message');
  };

  window.common.UploadMessage.prototype.close = function () {
    document.body.querySelector('main').removeChild(this._formElement);
  };

  window.common.SuccessMessage.prototype.open = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    document.body.querySelector('main').appendChild(successMessage);
    this._formElement = document.querySelector('.success');
    this._formButton = this._formElement.querySelector('.success__button');
    this._formButton.addEventListener('click', this._buttonCallback);
  };

  window.common.SuccessMessage.prototype.close = function () {
    this._formButton.removeEventListener('click', this._buttonCallback);
    document.body.querySelector('main').removeChild(this._formElement);
  };

})();
