'use strict';

// выбор файла с изображением для загрузки;
// изменение масштаба изображения;
// применение одного из заранее заготовленных эффектов;
// выбор глубины эффекта с помощью ползунка;
// добавление текстового комментария;
// добавление хэш-тегов.

// Закрытие формы по кресту или ESC
// скрывать слайдер по переходу на оригинал эффект
// при переключении эффектов, слайдер на 100%
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
// если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
// все элементы должны быть фокусируемы и нажиматься по энтеру

// Constants
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Variables
var effectIntensity = 100;
var currentEffect = 'ORIGINAL';

// Elements
var imageUploadForm = document.querySelector('.img-upload__overlay');
var uploadFileElement = document.querySelector('#upload-file');

var hashtagsInput = document.querySelector('.text__hashtags');
var descriptionInput = document.querySelector('.text__description');
var scaleValue = document.querySelector('.scale__control--value');
var imagePreview = document.querySelector('.img-upload__preview');

var sliderWrapper = document.querySelector('.img-upload__effect-level');
var sliderInput = document.querySelector('.effect-level__value');
var sliderPin = document.querySelector('.effect-level__pin');
var sliderLine = document.querySelector('.effect-level__depth');



var closeButton = document.querySelector('#upload-cancel');
var plusButton = document.querySelector('.scale__control--bigger');
var minusButton = document.querySelector('.scale__control--smaller');
var publishButton = document.querySelector('#upload-submit');


var originalEffectButton = document.querySelector('#effect-none');
var cromeEffectButton = document.querySelector('#effect-chrome');
var sepiaEffectButton = document.querySelector('#effect-sepia');
var marvinEffectButton = document.querySelector('#effect-marvin');
var phobosEffectButton = document.querySelector('#effect-phobos');
var heatEffectButton = document.querySelector('#effect-heat');

var addPhotoFormInit = function () {
  // manage upload file data
  // put big image to main window
  // put small images to effects windows
  // set scale t0 100% and handle scale on the top lable and set slider
  // set effect to original

  // clear comment/description

  document.addEventListener('keydown', onAddPhotoFormESCPress);

  // clear form
  originalEffectButton.checked = true;
  hashtagsInput.value = '';
  descriptionInput.value = '';
  setMaxEffectIntensity();
  applyEffect('ORIGINAL');
  hideIntensitySlider();
};

var addPhotoFormDeinit = function () {
  uploadFileElement.value = '';
  document.removeEventListener('keydown', onAddPhotoFormESCPress);
};

var applyEffect = function () {
  switch (currentEffect) {
    case 'ORIGINAL':
      imagePreview.style.filter = '';
      break;
    case 'CHROME':
      imagePreview.style.filter = 'grayscale(' + String(effectIntensity / 100) + ')';
      break;
    case 'SEPIA':
      imagePreview.style.filter = 'sepia(' + String(effectIntensity / 100) + ')';
      break;
    case 'MARVIN':
      imagePreview.style.filter = 'invert(' + String(effectIntensity) + '%)';
      break;
    case 'PHOBOS':
      imagePreview.style.filter = 'blur(' + String((effectIntensity / 25) - 1) + 'px)';
      break;
    case 'HEAT':
      imagePreview.style.filter = 'brightness(' + String((effectIntensity * (3  / 100))) + ')';
      break;
    default:
      break;
  }
};

var showAddPhotoForm = function () {
  addPhotoFormInit();
  imageUploadForm.classList.remove('hidden');
};

var closeAddPhotoForm = function () {
  addPhotoFormDeinit();
  imageUploadForm.classList.add('hidden');
};

var setEffectIntensity = function () {
  scaleValue.value = effectIntensity + '%';
  sliderPin.style.left = effectIntensity + '%';
  sliderLine.style.width = effectIntensity + '%';
};

var setMaxEffectIntensity = function () {
  effectIntensity = 100;
  setEffectIntensity();
};

var showIntensitySlider = function () {

};

var hideIntensitySlider = function () {

};

var setIntensitySlider = function () {
  sliderInput.value = effectIntensity;
};


// Handlers
var onUploadFileChange = function () {
  showAddPhotoForm();
};

var onCloseButton = function () {
  // ESC
  // Click
  closeAddPhotoForm();
};

var onPlusButton = function () {
  if (effectIntensity !== 100) {
    effectIntensity += 25;
    setEffectIntensity();
    setIntensitySlider();
    applyEffect();
  }
};

var onMinusButton = function () {
  if (effectIntensity !== 25) {
    effectIntensity -= 25;
    setEffectIntensity();
    setIntensitySlider();
    applyEffect();
  }
};

var onPublishButton = function () {

};


var onOriginalEffect = function () {
  hideIntensitySlider();
  setMaxEffectIntensity();
  currentEffect = 'ORIGINAL';
  applyEffect();
};

var onCromeEffect = function () {
  showIntensitySlider();
  setMaxEffectIntensity();
  currentEffect = 'CHROME';
  applyEffect();
};

var onSepiaEffect = function () {
  showIntensitySlider();
  setMaxEffectIntensity();
  currentEffect = 'SEPIA';
  applyEffect();
};

var onMarvinEffect = function () {
  showIntensitySlider();
  setMaxEffectIntensity();
  currentEffect = 'MARVIN';
  applyEffect();
};

var onPhobosEffect = function () {
  showIntensitySlider();
  setMaxEffectIntensity();
  currentEffect = 'PHOBOS';
  applyEffect();
};

var onHeatEffect = function () {
  showIntensitySlider();
  setMaxEffectIntensity();
  currentEffect = 'HEAT';
  applyEffect();
};

var onAddPhotoFormESCPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeAddPhotoForm();
  }
};

// setup listeners
uploadFileElement.addEventListener('change', onUploadFileChange);
closeButton.addEventListener('click', onCloseButton);
plusButton.addEventListener('click', onPlusButton);
minusButton.addEventListener('click', onMinusButton);

originalEffectButton.addEventListener('click', onOriginalEffect);
cromeEffectButton.addEventListener('click', onCromeEffect);
sepiaEffectButton.addEventListener('click', onSepiaEffect);
marvinEffectButton.addEventListener('click', onMarvinEffect);
phobosEffectButton.addEventListener('click', onPhobosEffect);
heatEffectButton.addEventListener('click', onHeatEffect);
