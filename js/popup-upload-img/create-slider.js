const sliderElement = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
const filtersRadio = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');
const rangeFilter = document.querySelector('.img-upload__effect-level');
const chrome = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  filter: 'grayscale',
  unit: ''
};
const sepia = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  filter: 'sepia',
  unit: ''
};
const marvin = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  filter: 'invert',
  unit: '%'
};
const phobos = {
  range: {
    min: 0,
    max: 3
  },
  start: 3,
  step: 0.1,
  filter: 'blur',
  unit: 'px'
};
const heat = {
  range: {
    min: 0,
    max: 3
  },
  start: 3,
  step: 0.1,
  filter: 'brightness',
  unit: ''
};



function filterRangeSlider () {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  function reloadValueSlider (filterStyleString) {
    let filterStyle = eval(filterStyleString);
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: filterStyle.range.min,
        max: filterStyle.range.max,
      },
      start: filterStyle.start,
      step: filterStyle.step
    });
    sliderElement.noUiSlider.on('update', function () {
      sliderInput.value = sliderElement.noUiSlider.get();
      imagePreview.style.filter = filterStyle.filter + '(' + sliderInput.value + filterStyle.unit + ')';
    });
    rangeFilter.classList.remove('hidden');
  }

  rangeFilter.classList.add('hidden');

  sliderElement.noUiSlider.on('update', function () {
    sliderInput.value = sliderElement.noUiSlider.get();
  });

  filtersRadio.forEach( function (filterRadio) {
    filterRadio.addEventListener('change', function (evt) {
      const nameEffect = filterRadio.value;
      if (nameEffect === 'none') {
        imagePreview.style.filter = null;
        rangeFilter.classList.add('hidden');
      } else {
        reloadValueSlider(nameEffect);
      }
    })
  });
};

function removeFilterRangeSlider () {
  sliderElement.noUiSlider.destroy();
  imagePreview.style.filter = null;
}

export {filterRangeSlider, removeFilterRangeSlider};
