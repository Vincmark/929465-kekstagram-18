'use strict';

// load photos
(function () {
  window.photos = [];
  window.loadPhotos = function () {

    var onReload = function (evt) {
      evt.preventDefault();
      closeErrorMessage();
      loadPhotos();
    };

    var onCancel = function (evt) {
      evt.preventDefault();
      closeErrorMessage();
    };

    var onError = function (message) {
      showErrorMessage(message, ['Попробовать снова', 'ОК'], [onReload, onCancel]);
      console.error(message);
    };

    var onSuccess = function (data) {
      console.log(data);
      window.photos = data;
      drawPhotos(photos);
    };

    window.loadNoForm('https://js.dump.academy/kekstagram/data', onSuccess, onError);
  };
})();

// filter photos
(function () {
  window.filteredPhotos = [];
})();

// draw photos
(function () {
  var i;
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var getPhoto = function (template, index) {
    var photoElement = template.cloneNode(true);
    photoElement.id = index;
    photoElement.querySelector('.picture__img').src = window.photos[index]['url'];
    photoElement.querySelector('.picture__comments').textContent = window.photos[index]['comments'].length.toString();
    photoElement.querySelector('.picture__likes').textContent = window.photos[index]['likes'];
    return (photoElement);
  };

  var renderPhotos = function (fragment, photosArray) {
    for (i = 0; i < photosArray.length; i++) {
      fragment.appendChild(getPhoto(photoTemplate, i));
    }
    return fragment;
  };

  var addFragmentToDOM = function (fragment) {
    var pictures = document.querySelector('.pictures');
    pictures.appendChild(fragment);
  };


  // console.log (allPictures.length);

  var onPictureClick = function () {
    console.log('picture clicked' + this.id);
    initBigPhoto(this.id);
  };



  window.clearPhotos = function () {
    // var allPhotosInDOM = document.querySelectorAll('.picture');
    // allPhotosInDOM.forEach() {
    //
    // }
  };

  window.drawPhotos = function (photosArray) {
    clearPhotos();

    var fragment = new DocumentFragment();

    renderPhotos(fragment, photosArray);
    addFragmentToDOM(fragment);
    var allPictures = document.querySelectorAll('.picture');

    allPictures.forEach(function (image) {
      image.addEventListener('click', onPictureClick);
    });

    showFilter();
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
    lastTimeout = window.setTimeout(function() { console.log('popular button pressed'); }, 300);
  };

  var onRandomButton = function () {
    filterPopularButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
  };

  var onDiscussedButton = function () {
    filterPopularButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.add('img-filters__button--active');
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

