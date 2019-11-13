'use strict';

window.data = (function () {
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

  return {
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
        errorMsg = new window.common.ErrorMessage(message, ['Попробовать снова', 'ОК'], [onReloadButtonClick, onCancelButtonClick]);
        errorMsg.open();
      };

      var onRequestSuccess = function (data) {
        photos = data;
        outerThis.getInitialPhotos();
        window.gallery.drawPhotos();
      };

      var request = new window.network.NetworkRequest(window.common.REQUEST.METHOD.GET, '', window.common.GET_DATA_URL, onRequestSuccess, onRequestError);
      request.send();
    },

    getInitialPhotos: function () {
      this.filteredPhotos = photos.slice();
    },

    getRandomPhotos: function () {
      this.filteredPhotos = [];
      var RandomUniqueNumbers = getRandomUniqueNumbers(0, photos.length - 1, window.common.RANDOM_PHOTOS_COUNT);
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
