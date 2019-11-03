'use strict';

var currentBigPhoto = -1;
var LOAD_COMMENTS_PER_ITERATION = 5;

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

var setupBigPicture = function () {
  var picture = document.querySelector('.big-picture');
  var image = picture.querySelector('.big-picture__img').children[0];
  image.src = window.photos[currentBigPhoto]['url'];

  //
  var likesCount = picture.querySelector('.likes-count');
  likesCount.textContent = window.photos[currentBigPhoto].likes;

  //
  var photoDescription = picture.querySelector('.social__caption');
  photoDescription.textContent = window.photos[currentBigPhoto].description;

  // delete comments
  var commentsContainer = document.querySelector('.social__comments');
  var commentsList = commentsContainer.querySelectorAll('.social__comment');
  for (var i = 0; i < commentsList.length; i++) {
    commentsContainer.removeChild(commentsContainer.children[0]);
  }
};

var showComments = function () {
  var commentsContainer = document.querySelector('.social__comments');
  var openedComments = commentsContainer.querySelectorAll('.social__comment').length;
  var commentsCount = window.photos[currentBigPhoto].comments.length;

  var startIndex = openedComments;
  var endIndex = startIndex + LOAD_COMMENTS_PER_ITERATION - 1;
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
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = window.photos[currentBigPhoto].comments[i]['avatar'];
    commentAvatar.alt = window.photos[currentBigPhoto].comments[i].name;
    commentText.textContent = window.photos[currentBigPhoto].comments[i].message;
    fragment.appendChild(commentElement);
  }
  commentsContainer.appendChild(fragment);
  setCommentCounter();
};

var setCommentCounter = function () {
  var commentsCounterElement = document.querySelector('.social__comment-count');
  var commentsCount = window.photos[currentBigPhoto].comments.length;
  var openedComments = document.querySelectorAll('.social__comment').length;
  commentsCounterElement.innerHTML = openedComments + ' из <span class="comments-count">' + commentsCount + '</span> комментариев';
};


var onShowMoreCommentsButton = function (evt) {
  evt.preventDefault();
  showComments();
};

var initBigPhoto = function (photoId) {
  currentBigPhoto = photoId;
  showBigPhoto();
  setupBigPicture();
  showComments();
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


