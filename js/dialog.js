'use strict';
// открытие и закрытие окна
// события связанные с персонажем
// перетаскивание окна
(function () {

  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = document.querySelector('.setup-close');
  var setupOpenIconElement = document.querySelector('.setup-open-icon');
  var setupUserNameElement = document.querySelector('.setup-user-name');
  var setupElement = document.querySelector('.setup');
  var setupSubmitElement = document.querySelector('.setup-submit');
  var popupStartCoordinates = {
    left: null,
    top: null
  };
  var form = document.querySelector('.setup-wizard-form');

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupOpenIconElement.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  function openPopup() {
    setupElement.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
    setupUserNameElement.addEventListener('focus', onInputFocus);
    setupUserNameElement.addEventListener('blur', onInputBlur);
    setupCloseElement.addEventListener('keydown', onSetupCloseElementEnterPress);
    window.customizationCharacter.wizardCoatElement.addEventListener('click', window.customizationCharacter.onWizardCoatElementClick);
    window.customizationCharacter.wizardEyesElement.addEventListener('click', window.customizationCharacter.onWizardEyesElementClick);
    window.customizationCharacter.setupFireballElement.addEventListener('click', window.customizationCharacter.onSetupFireballElementClick);
    setupSubmitElement.addEventListener('keydown', onSetupSubmitElementPressEnter);

    // положение окна при открытии
    popupStartCoordinates.left = setupElement.offsetLeft;
    popupStartCoordinates.top = setupElement.offsetTop;

    // отправка формы
    form.addEventListener('submit', onFormSubmit);
  }

  function closePopup() {
    setupElement.classList.add('hidden');

    document.removeEventListener('keydown', onPopupEscPress);
    setupUserNameElement.removeEventListener('focus', onInputFocus);
    setupUserNameElement.removeEventListener('blur', onInputBlur);
    setupCloseElement.removeEventListener('keydown', onSetupCloseElementEnterPress);
    window.customizationCharacter.wizardCoatElement.removeEventListener('click', window.customizationCharacter.onWizardCoatElementClick);
    window.customizationCharacter.wizardEyesElement.removeEventListener('click', window.customizationCharacter.onWizardEyesElementClick);
    window.customizationCharacter.setupFireballElement.removeEventListener('click', window.customizationCharacter.onSetupFireballElementClick);
    setupSubmitElement.removeEventListener('keydown', onSetupSubmitElementPressEnter);

    // возвращается изначальное положение окна, которое было при открытии
    setupElement.style.top = popupStartCoordinates.top + 'px';
    setupElement.style.left = popupStartCoordinates.left + 'px';

    form.removeEventListener('submit', onFormSubmit);
  }

  function onPopupEscPress(evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      closePopup();
    }
  }

  function onSetupCloseElementEnterPress(evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      closePopup();
    }
  }

  function onInputFocus() {
    document.removeEventListener('keydown', onPopupEscPress);
  }

  function onInputBlur() {
    document.addEventListener('keydown', onPopupEscPress);
  }

  function onSetupSubmitElementPressEnter(evt) {
    if (evt.key === 'Enter') {
      form.submit();
    }
  }

  // перетаскивание
  var uploadElement = document.querySelector('.upload');
  uploadElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    // кооринаты с которых начали перемещение
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    // элемент который перемещается также поле для загрузки фото поэтому при mouseup появится окно загрузки
    // устанавливаем флаг
    var dragged = false;

    // обработчики на передвижение мыши и отпускание кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      // если флаг true значит произошло событие mousemove, т.е. мы перетаскиваем окно а не загружаем фото
      dragged = true;

      // при каждом движении мыши находим смещение относительно старта движения
      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      // новые координаты элемента на котором происходит mousedown
      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      // устанавливаем значения координат в попап
      setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
      setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
    }

    // при отжимании кнопки мыши надо прекратить слушать события
    // обработчик mouseup только удаляет события mouseMove mouseUp
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      // если окно перетаскивалось при mouseup надо удалить появляение окна загрузки
      // вешаем на поле событие клик, которое удаляет само себя
      if (dragged) {
        uploadElement.addEventListener('click', onClickPreventDefault);
      }
    }

    function onClickPreventDefault(clickEvt) {
      clickEvt.preventDefault();
      uploadElement.removeEventListener('click', onClickPreventDefault);
    }
  });

  // обработчик и функции связанные с отправкой формы
  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onLoad, onError);
  }

  function onLoad() {
    closePopup();
  }

  function onError(error) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
  }
})();
