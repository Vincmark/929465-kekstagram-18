'use strict';

// draw photos
(function () {
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

  var renderPhotos = function (fragment) {
    window.filteredPhotos.forEach(function (element, index) {
      fragment.appendChild(getPhoto(photoTemplate, index, element));
    });
    return fragment;
  };

  var addFragmentToDOM = function (fragment) {
    photosContainer.appendChild(fragment);
  };

  var onPictureClick = function (evt) {
    evt.preventDefault();
    var element = evt.currentTarget.id;
    window.initBigPhoto(element);
  };

  window.clearPhotos = function () {
    var allPhotosInDOM = photosContainer.querySelectorAll('.picture');
    for (var i = 0; i < allPhotosInDOM.length; i++) {
      photosContainer.removeChild(allPhotosInDOM[i]);
    }
  };

  window.drawPhotos = function () {
    window.clearPhotos();
    var fragment = new DocumentFragment();
    renderPhotos(fragment);
    addFragmentToDOM(fragment);
    var allPictures = document.querySelectorAll('.picture');

    allPictures.forEach(function (image) {
      image.addEventListener('click', onPictureClick);
    });

    window.showFilter();
  };

  // filter
  var filterBlock = document.querySelector('.img-filters');
  var filterPopularButton = filterBlock.querySelector('#filter-popular');
  var filterRandomButton = filterBlock.querySelector('#filter-random');
  var filterDiscussedButton = filterBlock.querySelector('#filter-discussed');

  var lastTimeout;

  var setFilter = function (filterOption) {
    filterPopularButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    switch (filterOption) {
      case window.GALLERY_FILTER.POPULAR:
        filterPopularButton.classList.add('img-filters__button--active');
        window.getInitialPhotos();
        window.drawPhotos();
        break;
      case window.GALLERY_FILTER.RANDOM:
        filterRandomButton.classList.add('img-filters__button--active');
        window.getRandomPhotos();
        window.drawPhotos();
        break;
      case window.GALLERY_FILTER.DISCUSSED:
        filterDiscussedButton.classList.add('img-filters__button--active');
        window.getDiscussedPhotos();
        window.drawPhotos(window.filteredPhotos);
        break;
      default:
    }
  };

  var onPopularButtonClick = function () {
    filterAntiThrottling(window.GALLERY_FILTER.POPULAR);
  };

  var onRandomButtonClick = function () {
    filterAntiThrottling(window.GALLERY_FILTER.RANDOM);
  };

  var onDiscussedButtonClick = function () {
    filterAntiThrottling(window.GALLERY_FILTER.DISCUSSED);
  };

  var filterAntiThrottling = function (filterType) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      setFilter(filterType);
    }, window.GALLERY_FILTER.TIMEOUT);
  };

  window.showFilter = function () {
    if (filterBlock.classList.contains('img-filters--inactive')) {
      filterBlock.classList.remove('img-filters--inactive');
    }
    filterPopularButton.addEventListener('click', onPopularButtonClick);
    filterRandomButton.addEventListener('click', onRandomButtonClick);
    filterDiscussedButton.addEventListener('click', onDiscussedButtonClick);
  };

  window.closeFilter = function () {
    filterPopularButton.removeEventListener('click', onPopularButtonClick);
    filterRandomButton.removeEventListener('click', onRandomButtonClick);
    filterDiscussedButton.removeEventListener('click', onDiscussedButtonClick);
    if (!filterBlock.classList.contains('img-filters--inactive')) {
      filterBlock.classList.add('img-filters--inactive');
    }
  };
})();
