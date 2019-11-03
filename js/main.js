'use strict';


var showBigPhoto = function () {
  var bigPhoto = document.querySelector('.big-picture');
  bigPhoto.classList.remove('hidden');
};

var closeBigPhoto = function () {
  var bigPhoto = document.querySelector('.big-picture');
  bigPhoto.classList.add('hidden');
};

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

var setupBigPicture = function (index) {
  var picture = document.querySelector('.big-picture');
  var image = picture.querySelector('.big-picture__img').children[0];
  image.src = window.photos[index]['url'];

  //
  var likesCount = picture.querySelector('.likes-count');
  likesCount.textContent = window.photos[index].likes;

  //
  var commentsCount = picture.querySelector('.comments-count');
  commentsCount.textContent = window.photos[index].comments.length.toString();

  //
  var photoDescription = picture.querySelector('.social__caption');
  photoDescription.textContent = window.photos[index].description;

  // delete comments
  var commentsContainer = document.querySelector('.social__comments');
  var commentsList = commentsContainer.querySelectorAll('.social__comment');
  for (var i = 0; i < commentsList.length-1; i++) {
    commentsContainer.removeChild(commentsContainer.children[0]);
  }

};

var showComments = function (index) {
  var commentsList = document.querySelector('.social__comments');
  var commentsCount = window.photos[index].comments.length;
  var showCount = 0;
  if (commentsCount >= 5) {
    showCount = 5;
  } else {
    showCount = commentsCount;
  }

  if (commentsCount > 5) {
    showInterfaceElement('.comments-loader');
  } else {
    hideInterfaceElement('.comments-loader');
  }

  for (var i = 0; i < showCount; i++) {
    var commentElement = commentsList.querySelector('.social__comment').cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = window.photos[index].comments[i].avatar;
    commentAvatar.alt = window.photos[index].comments[i].name;
    commentText.textContent = window.photos[index].comments[i].message;

    commentsList.appendChild(commentElement);
  }
  commentsList.removeChild(commentsList.children[0]);
};

var showMoreComments = function (index) {
  var commentsList = document.querySelector('.social__comments');
  var visibleCommentsCount = commentsList.querySelectorAll('.social__comment').length;
  var commentsToPublish = window.photos[index].comments.length - visibleCommentsCount;

  var showCount = 0;
  if (commentsToPublish >= 5) {
    showCount = 5;
  } else {
    showCount = commentsToPublish;
  }

  if (commentsToPublish > 5) {
    showInterfaceElement('.comments-loader');
  } else {
    hideInterfaceElement('.comments-loader');
  }

  for (var i = visibleCommentsCount - 1; i < ((visibleCommentsCount - 1) + showCount); i++) {
    var commentElement = commentsList.querySelector('.social__comment').cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = window.photos[index].comments[i].avatar;
    commentAvatar.alt = window.photos[index].comments[i].name;
    commentText.textContent = window.photos[index].comments[i].message;

    commentsList.appendChild(commentElement);
  }
};

var onShowMoreCommentsButton = function (evt) {
  evt.preventDefault();
  showMoreComments();
};

var initBigPhoto = function (photoId) {
  showBigPhoto();
  setupBigPicture(photoId);
  showComments(photoId);
  closeBigPhotoButton.addEventListener('click', onCloseBigPhotoButton);
  document.addEventListener('keydown', onBigPhotoFormESCPress);
  showMoreCommentsButton.addEventListener('click', onShowMoreCommentsButton);
};

var deinitBigPhoto = function () {
  closeBigPhotoButton.removeEventListener('click', onCloseBigPhotoButton);
  document.removeEventListener('keydown', onBigPhotoFormESCPress);
  closeBigPhoto();
};

var closeBigPhotoButton = document.querySelector('#picture-cancel');
var showMoreCommentsButton = document.querySelector('.comments-loader');

var onCloseBigPhotoButton = function () {
  deinitBigPhoto();
};

var onBigPhotoFormESCPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    deinitBigPhoto();
  }
};


loadPhotos();



