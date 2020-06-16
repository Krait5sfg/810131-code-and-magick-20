'use strict';
// цвет фаербола персонажа, цвет мантии, глаз,
// обработчики клика по разным частям персонажа
window.customizationCharacter = (function () {

  var wizardCoatElement = document.querySelector('.wizard-coat');
  var inputCoatColorElement = document.querySelector('input[name = coat-color]');
  var wizardEyesElement = document.querySelector('.wizard-eyes');
  var inputEyesColorElement = document.querySelector('input[name = eyes-color]');
  var setupFireballElement = document.querySelector('.setup-fireball');
  var inputFireBallColorElement = document.querySelector('input[name = fireball-color]');

  return {
    wizardCoatElement: wizardCoatElement,
    wizardEyesElement: wizardEyesElement,
    setupFireballElement: setupFireballElement,
    onWizardCoatElementClick: function (evt) {
      var value = window.util.getRandomValueFromArray(window.setup.COAT_COLORS);
      evt.target.style.fill = value;
      inputCoatColorElement.value = value;
    },
    onwizardEyesElementClick: function (evt) {
      var value = window.util.getRandomValueFromArray(window.setup.EYES_COLORS);
      evt.target.style.fill = value;
      inputEyesColorElement.value = value;
    },
    onSetupFireballElementClick: function (evt) {
      var value = window.util.getRandomValueFromArray(window.setup.FIREBALLS_COLORS);
      evt.target.style.backgroundColor = value;
      inputFireBallColorElement.value = value;
    }
  };
})();
