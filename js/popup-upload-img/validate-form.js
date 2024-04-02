import {isEscapeKey} from '../util.js';
import {showErrorMessageBigPicture, showSuccessMessageBigPicture} from '../function-remote-server.js';
import {sendData} from '../api.js';

const HASTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const form = document.querySelector('.img-upload__form');
const hastagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'

}, false);

function validateHastag (valueHastagInput) {
  const hastags = valueHastagInput.trim().split(' ');
  for (let i = 0; i < hastags.length - 1; i++) {
    for (let j = i + 1; j < hastags.length; j++) {

      if (hastags[i].trim().toLowerCase() === hastags[j].trim().toLowerCase()) {
        return false;
      }
    }
  }

  if (hastags.length > 5) {
    return false;
  }
  for (let i = 0; i < hastags.length; i++) {
    if (hastags[i] && !HASTAG.test(hastags[i])) {
      return false;
    }
  }
  return true;
}

function handlerFocusEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}
hastagInput.addEventListener('keydown', handlerFocusEsc);

pristine.addValidator(hastagInput,validateHastag, 'Неккоректное значение');

commentInput.addEventListener('keydown', handlerFocusEsc);

function formSubmit (onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(onSuccess)
        .then(() => {
          form.reset();
        })
        .then(() => {
          showSuccessMessageBigPicture();
        })
        .catch(() => {
          showErrorMessageBigPicture();
        })
        .finally(unblockSubmitButton);
    }
  });
}

export {formSubmit};
