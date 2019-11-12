'use strict';

(function () {
  window.photos = [];
  window.filteredPhotos = [];
  var errorMsg = null;

  // load photos
  window.loadPhotos = function () {
    var onReloadButtonClick = function (evt) {
      evt.preventDefault();
      errorMsg.close();
      window.loadPhotos();
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
      window.photos = data;
      window.getInitialPhotos();
      window.drawPhotos();
    };

    var request = new window.NetworkRequest(window.REQUEST.METHOD.GET, '', window.GET_DATA_URL, onRequestSuccess, onRequestError);
    request.send();
  };

  // filter algorythms
  window.getInitialPhotos = function () {
    window.filteredPhotos = window.photos.slice();
  };

  window.getRandomPhotos = function () {
    window.filteredPhotos = [];
    var RandomUniqueNumbers = getRandomUniqueNumbers(0, window.photos.length - 1, window.RANDOM_PHOTOS_COUNT);
    RandomUniqueNumbers.forEach(function (index) {
      window.filteredPhotos.push(window.photos[index]);
    });
  };

  window.getDiscussedPhotos = function () {
    window.filteredPhotos = window.photos.slice();
    window.filteredPhotos.sort(function compareNumbers(a, b) {
      return b.comments.length - a.comments.length;
    });
  };

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
})();


