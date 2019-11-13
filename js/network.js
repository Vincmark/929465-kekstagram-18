'use strict';

(function () {

  window.network = {
    NetworkRequest: function (method, formData, url, onRequestSuccess, onRequestError) {
      this._method = method;
      this._url = url;
      this._onRequestSuccess = onRequestSuccess;
      this._onRequestError = onRequestError;
      this._xhr = null;
      if (formData) {
        this._formData = new FormData(formData);
      }
    },
  };

  window.network.NetworkRequest.prototype.send = function () {
    this._xhr = new XMLHttpRequest();
    this._xhr.responseType = 'json';
    this._xhr.timeout = window.common.REQUEST.TIMEOUT;
    var outerThis = this;

    this.onRequestLoad = function () {
      if (outerThis._xhr.status === window.common.REQUEST.STATUS_OK) {
        outerThis._onRequestSuccess(outerThis._xhr.response);
      } else {
        outerThis._onRequestError('Статус ответа: ' + outerThis._xhr.status + ' ' + outerThis._xhr.statusText);
      }
    };

    this.onRequestError = function () {
      outerThis._onRequestError('Произошла ошибка соединения');
    };

    this.onRequestTimeout = function () {
      outerThis._onRequestError('Запрос не успел выполниться за ' + outerThis._xhr.timeout + 'мс');
    };

    this._xhr.addEventListener('load', this.onRequestLoad);
    this._xhr.addEventListener('error', this.onRequestError);
    this._xhr.addEventListener('timeout', this.onRequestTimeout);

    this._xhr.open(this._method, this._url);

    if (this._formData) {
      this._xhr.send(this._formData);
    } else {
      this._xhr.send();
    }
  };
})();
