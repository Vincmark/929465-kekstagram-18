'use strict';

(function () {
  window.photos = [];
  window.filteredPhotos = [];
  var errorMsg = null;

  // load photos
  window.loadPhotos = function () {
    var onReload = function (evt) {
      evt.preventDefault();
      errorMsg.close();
      window.loadPhotos();
    };

    var onCancel = function (evt) {
      evt.preventDefault();
      errorMsg.close();
    };

    var onError = function (message) {
      errorMsg = new window.ErrorMessage(message, ['Попробовать снова', 'ОК'], [onReload, onCancel]);
      errorMsg.open();
    };

    var onSuccess = function (data) {
      window.photos = data;
      window.getInitialPhotos();
      window.drawPhotos();
    };

    var request = new window.NetworkRequest('GET', '', 'https://js.dump.academy/kekstagram/data', onSuccess, onError);
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


