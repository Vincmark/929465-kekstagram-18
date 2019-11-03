'use strict';
(function () {
  window.photos = [];
  window.loadPhotos = function () {
    var onError = function (message) {
      showErrorMessage(message, ['Попробовать снова', 'ОК']);
      console.error(message);
    };

    var onSuccess = function (data) {
      console.log(data);
      window.photos = data;

      var getPhoto = function (template, index) {
        var photoElement = template.cloneNode(true);
        photoElement.id = index;
        photoElement.querySelector('.picture__img').src = window.photos[index]['url'];
        photoElement.querySelector('.picture__comments').textContent = window.photos[index]['comments'].length.toString();
        photoElement.querySelector('.picture__likes').textContent = window.photos[index]['likes'];
        return (photoElement);
      };

      var renderPhotos = function (fragment) {
        for (var i = 0; i < window.photos.length; i++) {
          fragment.appendChild(getPhoto(photoTemplate, i));
        }
        return fragment;
      };

      var addFragmentToDOM = function (fragment) {
        var pictures = document.querySelector('.pictures');
        pictures.appendChild(fragment);
      };

      var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
      var fragment = new DocumentFragment();

      renderPhotos(fragment);
      addFragmentToDOM(fragment);

      var allPictures = document.querySelectorAll('.picture');
      console.log (allPictures.length);

      var onPictureClick = function () {
        console.log('picture clicked' + this.id);
        initBigPhoto(this.id);
      };

      allPictures.forEach(function (image) {
        image.addEventListener('click', onPictureClick);
      });

      var photo1 = window.photos[0];
      var comment1 = photo1['comments'][0];

    };

    window.loadNoForm('https://js.dump.academy/kekstagram/data', onSuccess, onError);
  };
})();
