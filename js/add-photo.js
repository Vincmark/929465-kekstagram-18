'use strict';
(function () {


  // Variables
  var scaleLevel = 100;
  var effectIntensity = 100;
  var currentEffect = 'ORIGINAL';


  // Elements
  var imageUploadForm = document.querySelector('.img-upload__overlay');
  var uploadFileElement = document.querySelector('#upload-file');

  // form
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
    scaleLevel = 100;
    effectIntensity = 100;
    currentEffect = 'ORIGINAL';
    setEffectIntensity();
    setScaleLevel();
    hideIntensitySlider();
  };

  var addPhotoFormDeinit = function () {
    uploadFileElement.value = '';
    document.removeEventListener('keydown', onAddPhotoFormESCPress);
  };

  var applyScale = function () {
    imagePreview.style.transform = 'scale(' + String(scaleLevel / 100) + ')';
  };

  var applyEffect = function () {
    switch (currentEffect) {
      case 'ORIGINAL':
        imagePreview.style.filter = '';
        // hideIntensitySlider();
        break;
      case 'CHROME':
        // showIntensitySlider();
        imagePreview.style.filter = 'grayscale(' + String(effectIntensity / 100) + ')';
        break;
      case 'SEPIA':
        // showIntensitySlider();
        imagePreview.style.filter = 'sepia(' + String(effectIntensity / 100) + ')';
        break;
      case 'MARVIN':
        // showIntensitySlider();
        imagePreview.style.filter = 'invert(' + String(effectIntensity) + '%)';
        break;
      case 'PHOBOS':
        // showIntensitySlider();
        imagePreview.style.filter = 'blur(' + String((effectIntensity / 25) - 1) + 'px)';
        break;
      case 'HEAT':
        // showIntensitySlider();
        imagePreview.style.filter = 'brightness(' + String((effectIntensity * (3 / 100))) + ')';
        break;
      default:
        break;
    }
  };

  var showAddPhotoForm = function () {
    addPhotoFormInit();
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

  var setEffectIntensity = function (intencity) {
    if (!isNaN(intencity)) {
      effectIntensity = intencity;
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

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        loadedImage.src = reader.result;
      });
      reader.readAsDataURL(file);
    }

    showAddPhotoForm();
  };

  var onCloseButton = function () {
    // ESC
    // Click
    closeAddPhotoForm();
  };

  var onPlusButton = function () {
    if (scaleLevel !== 100) {
      scaleLevel += 25;
      setScaleLevel();
      applyScale();
    }
  };

  var onMinusButton = function () {
    if (scaleLevel !== 25) {
      scaleLevel -= 25;
      setScaleLevel();
      applyScale();
    }
  };

  var validateHashtags = function () {
    return true;
    hashtagsInput.setCustomValidity('');
    var hashtagsStr = hashtagsInput.value;
    var hashtags = hashtagsStr.split(' ');
    var hashtagsNoSpaces = [];
    var i = 0;
    var j = 0;
    for (i = 0; i < hashtags.length; i++) {
      if (hashtags[i] !== '') {
        hashtagsNoSpaces.push(hashtags[i].toLowerCase());
      }
    }

    if (hashtagsNoSpaces.length > 5) {
      hashtagsInput.setCustomValidity('Хэштегов должно быть не больше 5');
      return false;
    }
    // check for #
    for (i = 0; i < hashtagsNoSpaces.length; i++) {
      // starts from #
      if (hashtagsNoSpaces[i][0] !== '#') {
        hashtagsInput.setCustomValidity('Хэштеги должны начинаться с символа #');
        return false;
      }
      // contains more than #
      if (hashtagsNoSpaces[i].length === 1) {
        hashtagsInput.setCustomValidity('Хэштегов не может состоять из одного символа #');
        return false;
      }
      // length under or equal 20 symbols including #
      if (hashtagsNoSpaces[i].length > 20) {
        hashtagsInput.setCustomValidity('Длина хэштега не может быть больше 20 символов');
        return false;
      }
    }

    for (i = 0; i < hashtagsNoSpaces.length; i++) {
      for (j = i; j < hashtagsNoSpaces.length; j++) {
        if (hashtagsNoSpaces[i] === hashtagsNoSpaces[j]) {
          if (i !== j) {
            hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
            return false;
          }
        }
      }
    }
    return true;
  };

  var validateComment = function () {
    descriptionInput.setCustomValidity('');
    var comment = descriptionInput.value;
    if (comment.length > 140) {
      descriptionInput.setCustomValidity('Комментарий не должен превышать 140 символов');
      return false;
    }
    return true;
  };

  var onPublishButton = function (evt) {
    evt.preventDefault();
    var hashtagValidation = validateHashtags();
    var commentValidation = validateComment();

    if (hashtagValidation && commentValidation) {
      //

      var onReload = function (evt) {
        evt.preventDefault();
        closeErrorMessage();
        showAddPhotoForm();
      };

      var onCancel = function (evt) {
        evt.preventDefault();
        closeErrorMessage();
        closeAddPhotoForm();
      };

      var onOK = function (evt) {
        evt.preventDefault();
        closeSuccessMessage();
      };

      var onError = function (message) {
        console.error(message);
        closeUploadMessage();
        closeAddPhotoForm();
        showErrorMessage(message, ['Попробовать снова', 'Загрузить другой файл'], [onReload, onCancel]);
      };

      var onSuccess = function (data) {
        console.log(data);
        closeUploadMessage();
        closeAddPhotoForm();
        showSuccessMessage(onOK);
      };
      window.load('https://js.dump.academy/kekstagram', imageUploadFormData, onSuccess, onError);
      showUploadMessage();

    }
  };

  var onOriginalEffect = function () {
    hideIntensitySlider();
    setEffectIntensity(100);
    currentEffect = 'ORIGINAL';
    applyEffect();
  };

  var onCromeEffect = function () {
    showIntensitySlider();
    setEffectIntensity(100);
    currentEffect = 'CHROME';
    applyEffect();
  };

  var onSepiaEffect = function () {
    showIntensitySlider();
    setEffectIntensity(100);
    currentEffect = 'SEPIA';
    applyEffect();
  };

  var onMarvinEffect = function () {
    showIntensitySlider();
    setEffectIntensity(100);
    currentEffect = 'MARVIN';
    applyEffect();
  };

  var onPhobosEffect = function () {
    showIntensitySlider();
    setEffectIntensity(100);
    currentEffect = 'PHOBOS';
    applyEffect();
  };

  var onHeatEffect = function () {
    showIntensitySlider();
    setEffectIntensity(100);
    currentEffect = 'HEAT';
    applyEffect();
  };

  var onAddPhotoFormESCPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
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
        effectIntensity = 0;
        setEffectIntensity();
      } else if (moveEvt.clientX >= lineBoundaries.xEnd) {
        effectIntensity = 100;
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
  closeButton.addEventListener('click', onCloseButton);
  plusButton.addEventListener('click', onPlusButton);
  minusButton.addEventListener('click', onMinusButton);
  publishButton.addEventListener('click', onPublishButton);
  originalEffectButton.addEventListener('click', onOriginalEffect);
  cromeEffectButton.addEventListener('click', onCromeEffect);
  sepiaEffectButton.addEventListener('click', onSepiaEffect);
  marvinEffectButton.addEventListener('click', onMarvinEffect);
  phobosEffectButton.addEventListener('click', onPhobosEffect);
  heatEffectButton.addEventListener('click', onHeatEffect);
  sliderPin.addEventListener('mousedown', onSliderPinDragStart);
})();
