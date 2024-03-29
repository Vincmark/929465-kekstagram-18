'use strict';
(function () {
  // dialog forms
  var errorMsg = null;
  var uploadMsg = null;
  var successMsg = null;

  //
  var isHashtagsValid;
  var isCommentsValid;

  // variables
  var scaleLevel = window.common.SCALE_LEVEL.MAX;
  var effectIntensity = window.common.EFFECT_INTENSITY_LEVEL.MAX;
  var currentEffect = window.common.PHOTO_FILTER.ORIGINAL;

  // elements
  var imageUploadForm = document.querySelector('.img-upload__overlay');
  var uploadFileElement = document.querySelector('#upload-file');

  //
  var imageUploadFormData = document.querySelector('.img-upload__form');

  //
  var hashtagsInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');
  var scaleValue = document.querySelector('.scale__control--value');
  var imagePreview = document.querySelector('.img-upload__preview');
  var loadedImage = imagePreview.querySelector('img');

  //
  var sliderWrapper = document.querySelector('.img-upload__effect-level');
  var sliderInput = document.querySelector('.effect-level__value');
  var sliderPin = document.querySelector('.effect-level__pin');
  var sliderLine = document.querySelector('.effect-level__depth');
  var sliderBackLine = document.querySelector('.effect-level__line');

  //
  var closeButton = document.querySelector('#upload-cancel');
  var plusButton = document.querySelector('.scale__control--bigger');
  var minusButton = document.querySelector('.scale__control--smaller');
  var publishButton = document.querySelector('#upload-submit');

  //
  var originalEffectButton = document.querySelector('#effect-none');
  var cromeEffectButton = document.querySelector('#effect-chrome');
  var sepiaEffectButton = document.querySelector('#effect-sepia');
  var marvinEffectButton = document.querySelector('#effect-marvin');
  var phobosEffectButton = document.querySelector('#effect-phobos');
  var heatEffectButton = document.querySelector('#effect-heat');

  // functions
  var addPhotoFormInit = function () {
    document.addEventListener('keydown', onAddPhotoFormESCPress);
    // clear form
    originalEffectButton.checked = true;
    hashtagsInput.value = '';
    descriptionInput.value = '';
    scaleLevel = window.common.SCALE_LEVEL.MAX;
    effectIntensity = window.common.EFFECT_INTENSITY_LEVEL.MAX;
    currentEffect = window.common.PHOTO_FILTER.ORIGINAL;
    setEffectIntensity();
    setScaleLevel();
    hideIntensitySlider();
    isHashtagsValid = true;
    isCommentsValid = true;
  };

  var addPhotoFormDeinit = function () {
    uploadFileElement.value = '';
    document.removeEventListener('keydown', onAddPhotoFormESCPress);
  };

  var applyScale = function () {
    imagePreview.style.transform = 'scale(' + String(scaleLevel / window.common.SCALE_LEVEL.MAX) + ')';
  };

  var applyEffect = function () {
    switch (currentEffect) {
      case window.common.PHOTO_FILTER.ORIGINAL:
        imagePreview.style.filter = '';
        break;
      case window.common.PHOTO_FILTER.CHROME:
        imagePreview.style.filter = 'grayscale(' + String(effectIntensity / window.common.EFFECT_INTENSITY_LEVEL.MAX) + ')';
        break;
      case window.common.PHOTO_FILTER.SEPIA:
        imagePreview.style.filter = 'sepia(' + String(effectIntensity / window.common.EFFECT_INTENSITY_LEVEL.MAX) + ')';
        break;
      case window.common.PHOTO_FILTER.MARVIN:
        imagePreview.style.filter = 'invert(' + String(effectIntensity) + '%)';
        break;
      case window.common.PHOTO_FILTER.PHOBOS:
        imagePreview.style.filter = 'blur(' + String((effectIntensity * (window.common.EFFECT.PHOBOS.MAX - window.common.EFFECT.PHOBOS.MIN)) / window.common.EFFECT_INTENSITY_LEVEL.MAX) + 'px)';
        break;
      case window.common.PHOTO_FILTER.HEAT:
        imagePreview.style.filter = 'brightness(' + String((effectIntensity * (window.common.EFFECT.HEAT.MAX - window.common.EFFECT.HEAT.MIN)) / window.common.EFFECT_INTENSITY_LEVEL.MAX + window.common.EFFECT.HEAT.MIN) + ')';
        break;
      default:
        break;
    }
  };

  var showAddPhotoForm = function () {
    imageUploadForm.classList.remove('hidden');
    minusButton.focus();
  };

  var closeAddPhotoForm = function () {
    addPhotoFormDeinit();
    imageUploadForm.classList.add('hidden');
  };

  var setScaleLevel = function () {
    scaleValue.value = scaleLevel + '%';
    applyScale();
  };

  var setEffectIntensity = function (intensity) {
    if (!isNaN(intensity)) {
      effectIntensity = intensity;
    }
    sliderInput.value = effectIntensity;
    sliderPin.style.left = effectIntensity + '%';
    sliderLine.style.width = effectIntensity + '%';
    applyEffect();
  };

  var showIntensitySlider = function () {
    sliderWrapper.classList.remove('hidden');
  };

  var hideIntensitySlider = function () {
    sliderWrapper.classList.add('hidden');
  };

  // Handlers
  var onUploadFileChange = function () {
    var file = uploadFileElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.common.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        loadedImage.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
    addPhotoFormInit();
    showAddPhotoForm();
  };

  var onCrossCloseButtonClick = function () {
    closeAddPhotoForm();
  };

  var onIncreaseButtonClick = function () {
    if (scaleLevel !== window.common.SCALE_LEVEL.MAX) {
      scaleLevel += window.common.SCALE_LEVEL.STEP;
      setScaleLevel();
      applyScale();
    }
  };

  var onDecreaseButtonClick = function () {
    if (scaleLevel !== window.common.SCALE_LEVEL.MIN) {
      scaleLevel -= window.common.SCALE_LEVEL.STEP;
      setScaleLevel();
      applyScale();
    }
  };

  var validateHashtags = function () {
    hashtagsInput.setCustomValidity('');
    var hashtags = new Hashtags(hashtagsInput.value);
    hashtags.validate();
    if (!hashtags.isValid()) {
      hashtagsInput.setCustomValidity(hashtags.getErrorMessage());
      hashtagsInput.reportValidity();
      return false;
    }
    return true;
  };

  var onHashTagInputChange = function () {
    isHashtagsValid = validateHashtags();
  };

  var Hashtags = function (tags) {
    this._hashtagsString = tags;
    this._hashtagsSplit = this._hashtagsString.split(' ');
    this._hashtags = [];
    this._isValid = true;
    this._errorString = '';
    for (var i = 0; i < this._hashtagsSplit.length; i++) {
      if (this._hashtagsSplit[i] !== '') {
        this._hashtags.push(this._hashtagsSplit[i].toLowerCase());
      }
    }
  };

  Hashtags.prototype.validate = function () {
    if (this._hashtags.length > window.common.HASHTAGS.MAX_COUNT) {
      this.setError('Хэштегов должно быть не больше ' + window.common.HASHTAGS.MAX_COUNT.toString());
    }

    if (this._isValid) {
      for (var j = 0; j < this._hashtags.length; j++) {
        if (this._hashtags[j][0] !== '#') {
          this.setError('Хэштеги должны начинаться с символа #');
          break;
        }
        if (this._hashtags[j].length === 1) {
          this.setError('Хэштегов не должен состоять только из одного символа #');
          break;
        }
        if (this._hashtags[j].indexOf('#', 1) !== -1) {
          this.setError('Хэштеги должны быть разделены пробелами');
          break;
        }
        if (this._hashtags[j].length > window.common.HASHTAGS.MAX_LENGTH) {
          this.setError('Длина хэштега не должна быть больше ' + window.common.HASHTAGS.MAX_LENGTH.toString() + ' символов');
          break;
        }
        if (this._hashtags.includes(this._hashtags[j], j + 1)) {
          this.setError('Хэштеги не должны повторяться');
          break;
        }
      }
    }
  };

  Hashtags.prototype.setError = function (errorMessage) {
    this._isValid = false;
    this._errorString = errorMessage;
  };

  Hashtags.prototype.isValid = function () {
    return this._isValid;
  };

  Hashtags.prototype.getErrorMessage = function () {
    return this._errorString;
  };

  var onCommentsInputChange = function () {
    isCommentsValid = validateComment();
  };

  var validateComment = function () {
    descriptionInput.setCustomValidity('');
    var comment = descriptionInput.value;
    if (comment.length > window.common.COMMENTS.MAX_LENGTH) {
      descriptionInput.setCustomValidity('Комментарий не должен превышать 140 символов');
      descriptionInput.reportValidity();
      return false;
    }
    return true;
  };

  var onPublishButtonClick = function (evt) {
    evt.preventDefault();

    if (isHashtagsValid && isCommentsValid) {
      //
      var onReloadButtonClick = function (evt1) {
        evt1.preventDefault();
        errorMsg.close();
        showAddPhotoForm();
      };

      var onCancelButtonClick = function (evt2) {
        evt2.preventDefault();
        errorMsg.close();
        closeAddPhotoForm();
      };

      var onOKButtonClick = function (evt3) {
        evt3.preventDefault();
        successMsg.close();
      };

      var onError = function (message) {
        uploadMsg.close();
        closeAddPhotoForm();
        errorMsg = new window.common.ErrorMessage(message, ['Попробовать снова', 'Загрузить другой файл'], [onReloadButtonClick, onCancelButtonClick]);
        errorMsg.open();
      };

      var onSuccess = function () {
        uploadMsg.close();
        closeAddPhotoForm();
        successMsg = new window.common.SuccessMessage(onOKButtonClick);
        successMsg.open();
      };

      var saveRequest = new window.network.NetworkRequest(window.common.REQUEST.METHOD.POST, imageUploadFormData, window.common.POST_DATA_URL, onSuccess, onError);
      saveRequest.send();

      uploadMsg = new window.common.UploadMessage();
      uploadMsg.open();
    }
  };

  var onOriginalEffectIconClick = function () {
    hideIntensitySlider();
    setEffectIntensity(window.common.EFFECT_INTENSITY_LEVEL.MAX);
    currentEffect = window.common.PHOTO_FILTER.ORIGINAL;
    applyEffect();
  };

  var onCromeEffectIconClick = function () {
    showIntensitySlider();
    setEffectIntensity(window.common.EFFECT_INTENSITY_LEVEL.MAX);
    currentEffect = window.common.PHOTO_FILTER.CHROME;
    applyEffect();
  };

  var onSepiaEffectIconClick = function () {
    showIntensitySlider();
    setEffectIntensity(window.common.EFFECT_INTENSITY_LEVEL.MAX);
    currentEffect = window.common.PHOTO_FILTER.SEPIA;
    applyEffect();
  };

  var onMarvinEffectIconClick = function () {
    showIntensitySlider();
    setEffectIntensity(window.common.EFFECT_INTENSITY_LEVEL.MAX);
    currentEffect = window.common.PHOTO_FILTER.MARVIN;
    applyEffect();
  };

  var onPhobosEffectIconClick = function () {
    showIntensitySlider();
    setEffectIntensity(window.common.EFFECT_INTENSITY_LEVEL.MAX);
    currentEffect = window.common.PHOTO_FILTER.PHOBOS;
    applyEffect();
  };

  var onHeatEffectIconClick = function () {
    showIntensitySlider();
    setEffectIntensity(window.common.EFFECT_INTENSITY_LEVEL.MAX);
    currentEffect = window.common.PHOTO_FILTER.HEAT;
    applyEffect();
  };

  var onAddPhotoFormESCPress = function (evt) {
    if (evt.keyCode === window.common.ESC_KEYCODE) {
      if ((!(document.activeElement === hashtagsInput)) && (!(document.activeElement === descriptionInput))) {
        closeAddPhotoForm();
      }
    }
  };

  var onSliderPinDragStart = function (evt) {
    evt.preventDefault();
    var rect = sliderBackLine.getBoundingClientRect();
    var lineBoundaries = {
      xStart: rect.left,
      xEnd: rect.right,
    };

    var onSliderPinDragMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (moveEvt.clientX <= lineBoundaries.xStart) {
        effectIntensity = window.common.EFFECT_INTENSITY_LEVEL.MIN;
        setEffectIntensity();
      } else if (moveEvt.clientX >= lineBoundaries.xEnd) {
        effectIntensity = window.common.EFFECT_INTENSITY_LEVEL.MAX;
        setEffectIntensity();
      } else {
        var percentPrice = (lineBoundaries.xEnd - lineBoundaries.xStart) / 100;
        var val = (moveEvt.clientX - lineBoundaries.xStart) / percentPrice;
        effectIntensity = Math.round(val);
        setEffectIntensity();
      }
    };

    var onSliderPinDragEnd = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onSliderPinDragMove);
      document.removeEventListener('mouseup', onSliderPinDragEnd);
    };

    document.addEventListener('mousemove', onSliderPinDragMove);
    document.addEventListener('mouseup', onSliderPinDragEnd);
  };

  // setup listeners
  uploadFileElement.addEventListener('change', onUploadFileChange);
  closeButton.addEventListener('click', onCrossCloseButtonClick);
  plusButton.addEventListener('click', onIncreaseButtonClick);
  minusButton.addEventListener('click', onDecreaseButtonClick);
  publishButton.addEventListener('click', onPublishButtonClick);
  originalEffectButton.addEventListener('click', onOriginalEffectIconClick);
  cromeEffectButton.addEventListener('click', onCromeEffectIconClick);
  sepiaEffectButton.addEventListener('click', onSepiaEffectIconClick);
  marvinEffectButton.addEventListener('click', onMarvinEffectIconClick);
  phobosEffectButton.addEventListener('click', onPhobosEffectIconClick);
  heatEffectButton.addEventListener('click', onHeatEffectIconClick);
  sliderPin.addEventListener('mousedown', onSliderPinDragStart);
  hashtagsInput.addEventListener('input', onHashTagInputChange);
  descriptionInput .addEventListener('input', onCommentsInputChange);
})();
