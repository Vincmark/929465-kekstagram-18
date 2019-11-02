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
  element.classList.add('visually-hidden');
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
};

var showComments = function (index) {
  var commentsList = document.querySelector('.social__comments');
  for (var i = 0; i < window.photos[index].comments.length; i++) {
    var commentElement = commentsList.querySelector('.social__comment').cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = window.photos[index].comments[i].avatar;
    commentAvatar.alt = window.photos[index].comments[i].name;
    commentText.textContent = window.photos[index].comments[i].message;

    commentsList.appendChild(commentElement);
  }
  commentsList.removeChild(commentsList.children[0]);
  commentsList.removeChild(commentsList.children[0]);
};

var initBigPhoto = function (photoId) {
  showBigPhoto();
  setupBigPicture(photoId);
  showComments(photoId);
  closeBigPhotoButton.addEventListener('click', onCloseBigPhotoButton);
  document.addEventListener('keydown', onBigPhotoFormESCPress);
};

var deinitBigPhoto = function () {
  closeBigPhotoButton.removeEventListener('click', onCloseBigPhotoButton);
  document.removeEventListener('keydown', onBigPhotoFormESCPress);
  closeBigPhoto();
};

var closeBigPhotoButton = document.querySelector('#picture-cancel');

var onCloseBigPhotoButton = function () {
  deinitBigPhoto();
};

var onBigPhotoFormESCPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    deinitBigPhoto();
  }
};


loadPhotos();


//hideInterfaceElement('.social__comment-count');
//hideInterfaceElement('.comments-loader');




