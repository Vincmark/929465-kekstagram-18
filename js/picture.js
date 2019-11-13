'use strict';

(function () {

  var currentBigPhoto = null;

  var hideInterfaceElement = function (elementClass) {
    var element = document.querySelector(elementClass);
    if (!element.classList.contains('visually-hidden')) {
      element.classList.add('visually-hidden');
    }
  };

  var showInterfaceElement = function (elementClass) {
    var element = document.querySelector(elementClass);
    if (element.classList.contains('visually-hidden')) {
      element.classList.remove('visually-hidden');
    }
  };

  var showBigPhoto = function () {
    var bigPhoto = document.querySelector('.big-picture');
    if (bigPhoto.classList.contains('hidden')) {
      bigPhoto.classList.remove('hidden');
    }
  };

  var closeBigPhoto = function () {
    var bigPhoto = document.querySelector('.big-picture');
    if (!bigPhoto.classList.contains('hidden')) {
      bigPhoto.classList.add('hidden');
    }
  };

  var setupBigPicture = function () {
    var pictureElement = document.querySelector('.big-picture');
    var imageElement = pictureElement.querySelector('.big-picture__img').children[0];
    imageElement.src = window.data.filteredPhotos[currentBigPhoto]['url'];

    //
    var likesCountElement = pictureElement.querySelector('.likes-count');
    likesCountElement.textContent = window.data.filteredPhotos[currentBigPhoto].likes;

    //
    var photoDescriptionElement = pictureElement.querySelector('.social__caption');
    photoDescriptionElement.textContent = window.data.filteredPhotos[currentBigPhoto].description;

    //
    var commentsContainerElement = document.querySelector('.social__comments');
    var commentsListElement = commentsContainerElement.querySelectorAll('.social__comment');
    for (var i = 0; i < commentsListElement.length; i++) {
      commentsContainerElement.removeChild(commentsContainerElement.children[0]);
    }
  };

  var showComments = function () {
    var commentsContainerElement = document.querySelector('.social__comments');
    var openedCommentsCount = commentsContainerElement.querySelectorAll('.social__comment').length;
    var commentsCount = window.data.filteredPhotos[currentBigPhoto].comments.length;

    var startIndex = openedCommentsCount;
    var endIndex = startIndex + window.common.LOAD_COMMENTS_PER_ITERATION - 1;
    if ((commentsCount - 1) <= endIndex) {
      endIndex = commentsCount - 1;
      hideInterfaceElement('.comments-loader');
    } else {
      showInterfaceElement('.comments-loader');
    }

    var commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
    var fragment = new DocumentFragment();

    for (var i = startIndex; i <= endIndex; i++) {
      var commentElement = commentTemplate.cloneNode(true);
      var commentAvatarElement = commentElement.querySelector('.social__picture');
      var commentTextElement = commentElement.querySelector('.social__text');

      commentAvatarElement.src = window.data.filteredPhotos[currentBigPhoto].comments[i]['avatar'];
      commentAvatarElement.alt = window.data.filteredPhotos[currentBigPhoto].comments[i].name;
      commentTextElement.textContent = window.data.filteredPhotos[currentBigPhoto].comments[i].message;
      fragment.appendChild(commentElement);
    }
    commentsContainerElement.appendChild(fragment);
    setCommentCounter();
  };

  var setCommentCounter = function () {
    var commentsCounterElement = document.querySelector('.social__comment-count');
    var commentsCount = window.data.filteredPhotos[currentBigPhoto].comments.length;
    var openedCommentsCount = document.querySelectorAll('.social__comment').length;
    commentsCounterElement.innerHTML = openedCommentsCount + ' из <span class="comments-count">' + commentsCount + '</span> комментариев';
  };

  var onShowMoreCommentsButtonClick = function (evt) {
    evt.preventDefault();
    showComments();
  };

  var deinitBigPhoto = function () {
    closeBigPhotoButton.removeEventListener('click', onCloseBigPhotoButtonClick);
    document.removeEventListener('keydown', onBigPhotoFormESCPress);
    closeBigPhoto();
  };

  var closeBigPhotoButton = document.querySelector('#picture-cancel');
  var showMoreCommentsButton = document.querySelector('.comments-loader');

  var onCloseBigPhotoButtonClick = function () {
    deinitBigPhoto();
  };

  var onBigPhotoFormESCPress = function (evt) {
    if (evt.keyCode === window.common.ESC_KEYCODE) {
      deinitBigPhoto();
    }
  };
  window.picture = {
    initBigPhoto: function (photoId) {
      currentBigPhoto = photoId;
      showBigPhoto();
      setupBigPicture();
      showComments();
      closeBigPhotoButton.addEventListener('click', onCloseBigPhotoButtonClick);
      document.addEventListener('keydown', onBigPhotoFormESCPress);
      showMoreCommentsButton.addEventListener('click', onShowMoreCommentsButtonClick);
    },
  };
})();
