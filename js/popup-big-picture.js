function openPopup(itemObject) {
  const modal = document.querySelector('.big-picture');
  modal.classList.remove('hidden');
  const image = modal.querySelector('.big-picture__img img');
  image.src = itemObject.url;
  const like = modal.querySelector('.likes-count');
  like.textContent = itemObject.likes;
  const commentNumber = modal.querySelector('.social__comment-total-count');
  commentNumber.textContent = itemObject.comments.length;
  createListComment(itemObject.comments)
  const descPicture = document.querySelector('.social__caption');
  descPicture.textContent = itemObject.description;
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', handlerEscKeydown);
}

function closePopup () {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', handlerEscKeydown);
}

function handlerEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

function createListComment (arr) {
  const list = document.querySelector('.social__comments');
  list.innerHTML = '';

  arr.forEach((object) => {
    const item = document.createElement('li');
    item.classList.add('social__comment');
    // создаем и наполняем <img>
    const image = document.createElement('img');
    image.classList.add('social__picture');
    image.src = object.avatar;
    image.alt = object.name;
    // тут я понял что нужно было скопировать 'li'
    image.width = '35';
    image.height = '35';
    item.appendChild(image);
    // создаем и наполняем <p>
    const desc = document.createElement('p');
    desc.classList.add('social__text');
    desc.textContent = object.message;
    item.appendChild(desc);
    // добавляем наполненный item в список
    list.appendChild(item);
  });
}

export {openPopup};

/* <li class="social__comment">
  <img
    class="social__picture"
    src="{{аватар}}"
    alt="{{имя комментатора}}"
    width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>
</li> */
