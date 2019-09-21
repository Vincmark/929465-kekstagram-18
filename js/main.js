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
      description: '',
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

createPhotos();
var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = new DocumentFragment();
renderPhotos(fragment);
addFragmentToDOM(fragment);
