

// var PHOTOS_COUNT = 25;
//
// var COMMENTS = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
// ];
//
// var NAMES = [
//   'Артем',
//   'Марина',
//   'Игорь',
//   'Татьяна',
//   'Владимир',
//   'Дарья',
// ];
//
// var photos = [];
//
// var getRandomInt = function (min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// var createPhotos = function () {
//   for (var i = 0; i < PHOTOS_COUNT; i++) {
//     var photo = {
//       url: 'photos/' + (i + 1).toString() + '.jpg',
//       description: 'description',
//       likes: getRandomInt(15, 200),
//       comments: createComments()
//     };
//     photos.push(photo);
//   }
// };

// var createComments = function () {
//   var comments = [];
//   var commentsCount = getRandomInt(1, 10);
//   for (var i = 0; i < commentsCount; i++) {
//     var comment = {
//       avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
//       message: createMessage(),
//       name: NAMES [getRandomInt(0, NAMES.length - 1)]
//     };
//     comments.push(comment);
//   }
//   return comments;
// };

// var createMessage = function () {
//   var message = '';
//   var messagePartsCount = getRandomInt(1, 2);
//   for (var i = 0; i < messagePartsCount; i++) {
//     if (i >= 1) {
//       message += ' ';
//     }
//     message += COMMENTS [getRandomInt(0, COMMENTS.length - 1)];
//   }
//   return message;
// };

// var renderPhotos = function (fragment) {
//   for (var i = 0; i < PHOTOS_COUNT; i++) {
//     fragment.appendChild(getPhoto(photoTemplate, i));
//   }
//   return fragment;
// };




// var onOpenFormButton = function (evt) {
//   evt.preventDefault();
//   var errorMessageTemplate = document.querySelector('#error').content.querySelector('section');
//   var errorMessage = errorMessageTemplate.cloneNode(true);
//   var fr = new DocumentFragment();
//   fr.appendChild(errorMessage);
//   document.body.appendChild(fr);
//
//   var errorMsg = document.querySelector('.error');
//   var errorBtns = document.querySelector('.error').querySelectorAll('.error__button');
//   var onTryAgainButton = function (evt) {
//     evt.preventDefault();
//     console.log('onTryAgain');
//     // document.body.removeChild(errorMessage);
//   };
//
//   var onLoadAnotherFileButton = function (evt) {
//     evt.preventDefault();
//     console.log('onAnotherr file');
//     document.body.removeChild(errorMsg);
//   };
//
//   errorBtns[0].addEventListener('click', onTryAgainButton);
//   errorBtns[1].addEventListener('click', onLoadAnotherFileButton);
// };
//
// var onCloseFormButton = function (evt) {
//   evt.preventDefault();
//   var errorMessage = document.querySelector('.error');
//   document.body.removeChild(errorMessage);
// };
//
//
// var openFormButton = document.querySelector('#openForm');
// openFormButton.addEventListener('click', onOpenFormButton);
//
// var closeFormButton = document.querySelector('#closeForm');
// closeFormButton.addEventListener('click', onCloseFormButton);
