
'use strict';
var uploadMessageForm = null;
var errorMessageForm = null;
var successMessageForm = null;
var errorMessageText = null;
var errorMessageButtons = null;


var showUploadMessage = function () {
  var uploadMessageTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
  var uploadMessage = uploadMessageTemplate.cloneNode(true);
  document.body.querySelector('.img-upload__overlay').appendChild(uploadMessage);
  uploadMessageForm = document.querySelector('.img-upload__message');
};

var closeUploadMessage = function () {
  document.body.removeChild(uploadMessageForm);
};

var onErrorButton1 = function (evt) {
  evt.preventDefault();
  closeErrorMessage();
  setTimeout(loadPhotos, 3000);
};

var onErrorButton2 = function (evt) {
  evt.preventDefault();
  closeErrorMessage();
};

var showErrorMessage = function (errorText, buttons) {
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorMessageTemplate.cloneNode(true);
  document.body.querySelector('main').appendChild(errorMessage);
  errorMessageForm = document.querySelector('.error');
  errorMessageText = errorMessageForm.querySelector('.error__title');
  errorMessageButtons = errorMessageForm.querySelectorAll('.error__button');
  errorMessageText.textContent = errorText;
  errorMessageButtons[0].textContent = buttons[0];
  errorMessageButtons[1].textContent = buttons[1];
  errorMessageButtons[0].addEventListener('click', onErrorButton1);
  errorMessageButtons[1].addEventListener('click', onErrorButton2);
};

var closeErrorMessage = function () {
  // delete event listener
  errorMessageButtons[0].removeEventListener('click', onErrorButton1);
  errorMessageButtons[1].removeEventListener('click', onErrorButton2);
  document.body.querySelector('main').removeChild(errorMessageForm);
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
