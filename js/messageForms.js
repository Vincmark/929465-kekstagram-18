<!-- Экран загрузки изображения -->
// <template id="messages">
//   <div class="img-upload__message  img-upload__message--loading">Загружаем...</div>
// </template>


<!-- Сообщение с ошибкой загрузки изображения -->
// <template id="error">
//   <section class="error">
//   <div class="error__inner">
//   <h2 class="error__title">Ошибка загрузки файла</h2>
// <div class="error__buttons">
//   <button type="button" class="error__button">Попробовать снова</button>
// <button type="button" class="error__button">Загрузить другой файл</button>
// </div>
// </div>
// </section>
// </template>



// <!-- Сообщение об успешной загрузке изображения -->
// <template id="success">
//   <section class="success">
//   <div class="success__inner">
//   <h2 class="success__title">Изображение успешно загружено</h2>
// <button type="button" class="success__button">Круто!</button>
// </div>
// </section>
// </template>
'use strict';
var uploadMessageForm = null;
var errorMessageForm = null;
var successMessageForm = null;


var showUploadMessage = function () {
  var uploadMessageTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
  var uploadMessage = uploadMessageTemplate.cloneNode(true);
  document.body.querySelector('.img-upload__overlay').appendChild(uploadMessage);
  uploadMessageForm = document.querySelector('.img-upload__message');
};

var closeUploadMessage = function () {
  document.body.removeChild(uploadMessageForm);
};

var showErrorMessage = function () {
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('section');
  var errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.querySelector('main').appendChild(errorMessage);
  errorMessageForm = document.querySelector('.error');
};

var closeErrorMessage = function () {
  document.body.removeChild(errorMessageForm);
};

var showSuccessMessage = function () {
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessage = successMessageTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  successMessageForm = document.querySelector('.success');
};

var closeSuccessMessage = function () {
  document.body.removeChild(successMessageForm);
};

var onOpenFormButton = function (evt) {
  evt.preventDefault();
  showErrorMessage();
  //showUploadMessage();
  //showSuccessMessage();


  // var errorBtns = errorMessageForm.querySelectorAll('.error__button');
  // var onTryAgainButton = function (evt) {
  //   evt.preventDefault();
  //   console.log('onTryAgain');
  // };
  //
  // var onLoadAnotherFileButton = function (evt) {
  //   evt.preventDefault();
  //   console.log('onAnotherr file');
  //   document.body.removeChild(errorMessageForm);
  // };
  //
  // errorBtns[0].addEventListener('click', onTryAgainButton);
  // errorBtns[1].addEventListener('click', onLoadAnotherFileButton);

};

var onCloseFormButton = function (evt) {
  evt.preventDefault();
  closeErrorMessage();

  //document.body.removeChild(errorMessageForm);
};

var openFormButton = document.querySelector('#openForm');
openFormButton.addEventListener('click', onOpenFormButton);

var closeFormButton = document.querySelector('#closeForm');
closeFormButton.addEventListener('click', onCloseFormButton);
