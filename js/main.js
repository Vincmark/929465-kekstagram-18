'use strict';

// (function () {
//   window.data.loadPhotos();
// })();

var Hashtags = function (tags) {
  this._hashtagsString = tags;
  this._hashtagsSplit = this._hashtagsString.split(' ');
  this._hashtags = [];
  this._isValid = true;
  this._errorString = '';
};

Hashtags.prototype.validate = function () {
  for (var i = 0; i < this._hashtagsSplit.length; i++) {
    if (this._hashtagsSplit[i] !== '') {
      this._hashtags.push(this._hashtagsSplit[i].toLowerCase());
    }
  }

  // if more than 5 elements
  if (this._hashtags.length > window.common.HASHTAGS.MAX_COUNT) {
    this.setError('Хэштегов должно быть не больше ' + window.common.HASHTAGS.MAX_COUNT.toString());
  }

  if (this._isValid) {
    for (var j = 0; j < this._hashtags.length; j++) {

    }
  }
};

Hashtags.prototype.setError = function (errorMessage) {
  this._isValid = false;
  this._errorString = errorMessage;
};

Hashtags.prototype.isValid = function () {
  console.log(this._hashtagsString);
  console.log(this._hashtagsSplit);
  console.log(this._hashtags);
  console.log(this._isValid);
};

var ht = new Hashtags('#123 #abc   hj k hkjh    k j h k hkj    ####     #123       #abc');
ht.validate();
ht.isValid();




// var validateHashtags = function () {
//   hashtagsInput.setCustomValidity('');
//   var hashtagsStr = hashtagsInput.value;
//   var hashtags = hashtagsStr.split(' ');
//   var hashtagsNoSpaces = [];
//
//   for (var m = 0; m < hashtags.length; m++) {
//     if (hashtags[m] !== '') {
//       hashtagsNoSpaces.push(hashtags[m].toLowerCase());
//     }
//   }
//
//   if (hashtagsNoSpaces.length > window.common.HASHTAGS.MAX_COUNT) {
//     hashtagsInput.setCustomValidity('Хэштегов должно быть не больше 5');
//     return false;
//   }

//   // check for #
//   for (var k = 0; k < hashtagsNoSpaces.length; k++) {
//     // starts from #
//     if (hashtagsNoSpaces[k][0] !== '#') {
//       hashtagsInput.setCustomValidity('Хэштеги должны начинаться с символа #');
//       return false;
//     }
//     // contains more than #
//     if (hashtagsNoSpaces[i].length === 1) {
//       hashtagsInput.setCustomValidity('Хэштегов не может состоять из одного символа #');
//       return false;
//     }
//     // length under or equal 20 symbols including #
//     if (hashtagsNoSpaces[i].length > window.common.HASHTAGS.MAX_LENGTH) {
//       hashtagsInput.setCustomValidity('Длина хэштега не может быть больше 20 символов');
//       return false;
//     }
//   }
//
//   for (var i = 0; i < hashtagsNoSpaces.length; i++) {
//     for (var j = i; j < hashtagsNoSpaces.length; j++) {
//       if (hashtagsNoSpaces[i] === hashtagsNoSpaces[j]) {
//         if (i !== j) {
//           hashtagsInput.setCustomValidity('Хэштеги не должны повторяться');
//           return false;
//         }
//       }
//     }
//   }
//   return true;
// };
//
