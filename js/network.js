'use strict';

(function () {

  window.NetworkRequest = function (method, formData, url, onSuccess, onError) {
    this._method = method;
    this._url = url;
    this._onSuccess = onSuccess;
    this._onError = onError;
    this._xhr = null;
    if (formData) {
      this._formData = new FormData(formData);
    }
  };

  window.NetworkRequest.prototype.send = function () {
    this._xhr = new XMLHttpRequest();
    this._xhr.responseType = 'json';
    this._xhr.timeout = 10000; // 10s
    var outerThis = this;

    this.onLoad = function () {
      if (outerThis._xhr.status === 200) {
        outerThis._onSuccess(outerThis._xhr.response);
      } else {
        outerThis._onError('Cтатус ответа: ' + outerThis._xhr.status + ' ' + outerThis._xhr.statusText);
      }
    };

    this.onError = function () {
      outerThis._onError('Произошла ошибка соединения');
    };

    this.onTimeout = function () {
      outerThis._onError('Запрос не успел выполниться за ' + outerThis._xhr.timeout + 'мс');
    };

    this._xhr.addEventListener('load', this.onLoad);
    this._xhr.addEventListener('error', this.onError);
    this._xhr.addEventListener('timeout', this.onTimeout);

    this._xhr.open(this._method, this._url);

    if (this._formData) {
      this._xhr.send(this._formData);
    } else {
      this._xhr.send();
    }
  };
})();
