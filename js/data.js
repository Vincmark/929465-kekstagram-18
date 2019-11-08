'use strict';

// load photos
(function () {
  window.photos = [];
  var errorMsg = null;
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
      window.drawPhotos(window.filteredPhotos);
    };
    window.loadNoForm('https://js.dump.academy/kekstagram/data', onSuccess, onError);
  };
})();

// filter photos
(function () {
  window.filteredPhotos = [];

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

// draw photos
(function () {
  var i;
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var photosContainer = document.querySelector('.pictures');

  var getPhoto = function (template, index, photoDataElement) {
    var photoElement = template.cloneNode(true);
    photoElement.id = index;
    photoElement.querySelector('.picture__img').src = photoDataElement['url'];
    photoElement.querySelector('.picture__comments').textContent = photoDataElement['comments'].length.toString();
    photoElement.querySelector('.picture__likes').textContent = photoDataElement['likes'];
    return (photoElement);
  };

  var renderPhotos = function (fragment, photosArray) {
    photosArray.forEach(function (element, index) {
      fragment.appendChild(getPhoto(photoTemplate, index, element));
    });
    return fragment;
  };

  var addFragmentToDOM = function (fragment) {
    photosContainer.appendChild(fragment);
  };

  var onPictureClick = function () {
    window.initBigPhoto(this.id);
  };

  window.clearPhotos = function () {
    var allPhotosInDOM = photosContainer.querySelectorAll('.picture');
    for (i = 0; i < allPhotosInDOM.length; i++) {
      photosContainer.removeChild(allPhotosInDOM[i]);
    }
  };

  window.drawPhotos = function (photosArray) {
    window.clearPhotos();

    var fragment = new DocumentFragment();

    renderPhotos(fragment, photosArray);
    addFragmentToDOM(fragment);
    var allPictures = document.querySelectorAll('.picture');

    allPictures.forEach(function (image) {
      image.addEventListener('click', onPictureClick);
    });

    window.showFilter();
  };

})();

(function () {


})();

// filter select
(function () {

  var filterBlock = document.querySelector('.img-filters');
  var filterPopularButton = filterBlock.querySelector('#filter-popular');
  var filterRandomButton = filterBlock.querySelector('#filter-random');
  var filterDiscussedButton = filterBlock.querySelector('#filter-discussed');

  var lastTimeout;

  var onPopularButton = function () {
    filterPopularButton.classList.add('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      console.log('popular button pressed');
    }, 300);
    window.getInitialPhotos();
    window.drawPhotos(window.filteredPhotos);
  };

  var onRandomButton = function () {
    filterPopularButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    window.getRandomPhotos();
    window.drawPhotos(window.filteredPhotos);
  };

  var onDiscussedButton = function () {
    filterPopularButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.add('img-filters__button--active');
    window.getDiscussedPhotos();
    window.drawPhotos(window.filteredPhotos);
  };

  window.showFilter = function () {
    if (filterBlock.classList.contains('img-filters--inactive')) {
      filterBlock.classList.remove('img-filters--inactive');
    }
    filterPopularButton.addEventListener('click', onPopularButton);
    filterRandomButton.addEventListener('click', onRandomButton);
    filterDiscussedButton.addEventListener('click', onDiscussedButton);
  };

  window.closeFilter = function () {
    filterPopularButton.removeEventListener('click', onPopularButton);
    filterRandomButton.removeEventListener('click', onRandomButton);
    filterDiscussedButton.removeEventListener('click', onDiscussedButton);
    if (!filterBlock.classList.contains('img-filters--inactive')) {
      filterBlock.classList.add('img-filters--inactive');
    }
  };
})();

