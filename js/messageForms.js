'use strict';

// error message
(function () {

  var errorMessageForm;
  var errorMessageText;
  var errorMessageButtons;
  var errorMessageCallBacks;

  window.showErrorMessage = function (errorText, buttons, callBacks) {
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorMessageTemplate.cloneNode(true);
    errorMessageCallBacks = callBacks;
    document.body.querySelector('main').appendChild(errorMessage);
    errorMessageForm = document.querySelector('.error');
    errorMessageText = errorMessageForm.querySelector('.error__title');
    errorMessageButtons = errorMessageForm.querySelectorAll('.error__button');
    errorMessageText.textContent = errorText;
    errorMessageButtons[0].textContent = buttons[0];
    errorMessageButtons[1].textContent = buttons[1];
    errorMessageButtons[0].addEventListener('click', errorMessageCallBacks[0]);
    errorMessageButtons[1].addEventListener('click', errorMessageCallBacks[1]);
  };

  window.closeErrorMessage = function () {
    errorMessageButtons[0].removeEventListener('click', errorMessageCallBacks[0]);
    errorMessageButtons[1].removeEventListener('click', errorMessageCallBacks[1]);
    document.body.querySelector('main').removeChild(errorMessageForm);
  };

})();

// upload message
(function () {

  var uploadMessageForm;

  window.showUploadMessage = function () {
    var uploadMessageTemplate = document.querySelector('#messages').content.querySelector('div');
    var uploadMessage = uploadMessageTemplate.cloneNode(true);
    document.body.querySelector('main').appendChild(uploadMessage);
    uploadMessageForm = document.querySelector('.img-upload__message');
  };

  window.closeUploadMessage = function () {
    document.body.querySelector('main').removeChild(uploadMessageForm);
  };

})();

// success message
(function () {

  var successMessageForm;
  var successMessageButton;
  var successButtonCallBack;

  window.showSuccessMessage = function (ButtonCallBack) {
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    document.body.querySelector('main').appendChild(successMessage);
    successMessageForm = document.querySelector('.success');
    successMessageButton = successMessageForm.querySelector('.success__button');
    successButtonCallBack = ButtonCallBack;
    successMessageButton.addEventListener('click', successButtonCallBack);
  };

  window.closeSuccessMessage = function () {
    successMessageButton.removeEventListener('click', successButtonCallBack);
    document.body.querySelector('main').removeChild(successMessageForm);
  };

})();
