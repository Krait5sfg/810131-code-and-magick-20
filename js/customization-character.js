'use strict';
// цвет фаербола персонажа, цвет мантии, глаз,
// обработчики клика по разным частям персонажа
window.customizationCharacter = (function () {

  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizardCoatElement = document.querySelector('.wizard-coat');
  var inputCoatColorElement = document.querySelector('input[name = coat-color]');
  var wizardEyesElement = document.querySelector('.wizard-eyes');
  var inputEyesColorElement = document.querySelector('input[name = eyes-color]');
  var setupFireballElement = document.querySelector('.setup-fireball');
  var inputFireBallColorElement = document.querySelector('input[name = fireball-color]');

  var wizard = {
    onEyesChange: function () { },
    onCoatChange: function () { },
  };

  return {
    wizardCoatElement: wizardCoatElement,
    wizardEyesElement: wizardEyesElement,
    setupFireballElement: setupFireballElement,
    onWizardCoatElementClick: function (evt) {
      var value = window.util.getRandomValueFromArray(COAT_COLORS);
      evt.target.style.fill = value;
      inputCoatColorElement.value = value;
      wizard.onCoatChange(value);
    },
    onWizardEyesElementClick: function (evt) {
      var value = window.util.getRandomValueFromArray(EYES_COLORS);
      evt.target.style.fill = value;
      inputEyesColorElement.value = value;
      wizard.onEyesChange(value);
    },
    onSetupFireballElementClick: function (evt) {
      var value = window.util.getRandomValueFromArray(FIREBALLS_COLORS);
      evt.target.style.backgroundColor = value;
      inputFireBallColorElement.value = value;
    },
    wizard: wizard,
  };
})();
