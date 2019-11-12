'use strict';

(function () {
  var errorMsg = null;
  var photos = [];
  var getRandomUniqueNumbers = function (min, max, count) {
    var numArray = [];
    while (numArray.length < count) {
      var rand = Math.floor(Math.random() * max) + min;
      if (numArray.indexOf(rand) === -1) {
        numArray.push(rand);
      }
    }
    return numArray;
  };

  window.data = {
    filteredPhotos: [],
    loadPhotos: function () {
      var outerThis = this;
      var onReloadButtonClick = function (evt) {
        evt.preventDefault();
        errorMsg.close();
        outerThis.loadPhotos();
      };

      var onCancelButtonClick = function (evt) {
        evt.preventDefault();
        errorMsg.close();
      };

      var onRequestError = function (message) {
        errorMsg = new window.ErrorMessage(message, ['Попробовать снова', 'ОК'], [onReloadButtonClick, onCancelButtonClick]);
        errorMsg.open();
      };

      var onRequestSuccess = function (data) {
        photos = data;
        outerThis.getInitialPhotos();
        window.drawPhotos();
      };

      var request = new window.NetworkRequest(window.REQUEST.METHOD.GET, '', window.GET_DATA_URL, onRequestSuccess, onRequestError);
      request.send();
    },

    getInitialPhotos: function () {
      this.filteredPhotos = photos.slice();
    },

    getRandomPhotos: function () {
      this.filteredPhotos = [];
      var RandomUniqueNumbers = getRandomUniqueNumbers(0, photos.length - 1, window.RANDOM_PHOTOS_COUNT);
      var outerThis = this;
      RandomUniqueNumbers.forEach(function (index) {
        outerThis.filteredPhotos.push(photos[index]);
      });
    },

    getDiscussedPhotos: function () {
      this.filteredPhotos = photos.slice();
      this.filteredPhotos.sort(function compareNumbers(a, b) {
        return b.comments.length - a.comments.length;
      });
    },
  };
})();
