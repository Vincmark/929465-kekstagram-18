'use strict';

var PHOTOS_COUNT = 25;

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var NAMES = [
  'Артем',
  'Марина',
  'Игорь',
  'Татьяна',
  'Владимир',
  'Дарья',
];

var photos = [];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createPhotos = function () {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    var photo = {
      url: 'photos/' + (i + 1).toString() + '.jpg',
      description: 'description',
      likes: getRandomInt(15, 200),
      comments: createComments()
    };
    photos.push(photo);
  }
};

var createComments = function () {
  var comments = [];
  var commentsCount = getRandomInt(1, 10);
  for (var i = 0; i < commentsCount; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: createMessage(),
      name: NAMES [getRandomInt(0, NAMES.length - 1)]
    };
    comments.push(comment);
  }
  return comments;
};

var createMessage = function () {
  var message = '';
  var messagePartsCount = getRandomInt(1, 2);
  for (var i = 0; i < messagePartsCount; i++) {
    if (i >= 1) {
      message += ' ';
    }
    message += COMMENTS [getRandomInt(0, COMMENTS.length - 1)];
  }
  return message;
};

var renderPhotos = function (fragment) {
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    fragment.appendChild(getPhoto(photoTemplate, i));
  }
  return fragment;
};

var getPhoto = function (template, index) {
  var photoElement = template.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photos[index].url;
  photoElement.querySelector('.picture__comments').textContent = photos[index].comments.length.toString();
  photoElement.querySelector('.picture__likes').textContent = photos[index].likes;
  return (photoElement);
};

var addFragmentToDOM = function (fragment) {
  var pictures = document.querySelector('.pictures');
  pictures.appendChild(fragment);
};

var showBigPhoto = function () {
  var bigPhoto = document.querySelector('.big-picture');
  bigPhoto.classList.remove('hidden');
};

var hideInterfaceElement = function (elementClass) {
  var element = document.querySelector(elementClass);
  element.classList.add('visually-hidden');
};

var setupBigPicture = function (index) {
  var picture = document.querySelector('.big-picture');
  var image = picture.querySelector('.big-picture__img').children[0];
  image.src = photos[index].url;

  //
  var likesCount = picture.querySelector('.likes-count');
  likesCount.textContent = photos[index].likes;

  //
  var commentsCount = picture.querySelector('.comments-count');
  commentsCount.textContent = photos[index].comments.length.toString();

  //
  var photoDescription = picture.querySelector('.social__caption');
  photoDescription.textContent = photos[index].description;
};

var showComments = function (index) {
  var commentsList = document.querySelector('.social__comments');
  for (var i = 0; i < photos[index].comments.length; i++) {
    var commentElement = commentsList.querySelector('.social__comment').cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');

    commentAvatar.src = photos[index].comments[i].avatar;
    commentAvatar.alt = photos[index].comments[i].name;
    commentText.textContent = photos[index].comments[i].message;

    commentsList.appendChild(commentElement);
  }
  commentsList.removeChild(commentsList.children[0]);
  commentsList.removeChild(commentsList.children[0]);
};

createPhotos();
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = new DocumentFragment();
renderPhotos(fragment);
addFragmentToDOM(fragment);

// showBigPhoto();
// setupBigPicture(0);
// showComments(0);

hideInterfaceElement('.social__comment-count');
hideInterfaceElement('.comments-loader');


