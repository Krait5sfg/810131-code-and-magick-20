'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// module4-task1
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = document.querySelector('.setup-close');
var setupOpenIconElement = document.querySelector('.setup-open-icon');
var setupUserNameElement = document.querySelector('.setup-user-name');
var setupElement = document.querySelector('.setup');
var setupSubmitElement = document.querySelector('.setup-submit');
var wizardCoatElement = document.querySelector('.wizard-coat');
var inputCoatColorElement = document.querySelector('input[name = coat-color]');
var wizardEyesElement = document.querySelector('.wizard-eyes');
var inputEyesColorElement = document.querySelector('input[name = eyes-color]');
var setupFireballElement = document.querySelector('.setup-fireball');
var inputFireBallColorElement = document.querySelector('input[name = fireball-color]');

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
  wizardCoatElement.addEventListener('click', onWizardCoatElementClick);
  wizardEyesElement.addEventListener('click', onwizardEyesElementClick);
  setupFireballElement.addEventListener('click', onSetupFireballElementClick);
  setupSubmitElement.addEventListener('keydown', onSetupSubmitElementPressEnter);
}

function closePopup() {
  setupElement.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  setupUserNameElement.removeEventListener('focus', onInputFocus);
  setupUserNameElement.removeEventListener('blur', onInputBlur);
  setupCloseElement.removeEventListener('keydown', onSetupCloseElementEnterPress);
  wizardCoatElement.removeEventListener('click', onWizardCoatElementClick);
  wizardEyesElement.removeEventListener('click', onwizardEyesElementClick);
  setupFireballElement.removeEventListener('click', onSetupFireballElementClick);
  setupSubmitElement.removeEventListener('keydown', onSetupSubmitElementPressEnter);
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
    document.querySelector('.setup-wizard-form').submit();
  }
}

function onWizardCoatElementClick(evt) {
  var value = getRandomValueFromArray(COAT_COLORS);
  evt.target.style.fill = value;
  inputCoatColorElement.value = value;
}

function onwizardEyesElementClick(evt) {
  var value = getRandomValueFromArray(EYES_COLORS);
  evt.target.style.fill = value;
  inputEyesColorElement.value = value;
}

function onSetupFireballElementClick(evt) {
  var value = getRandomValueFromArray(FIREBALLS_COLORS);
  evt.target.style.backgroundColor = value;
  inputFireBallColorElement.value = value;
}

function getRandomValueFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// --- end module4-task1

function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getCharacters(names, surnames, coatColors, eyesColors) {
  var characters = [];
  var count = 4;
  for (var i = 0; i < count; i++) {
    var person = {
      name: getRandomValue(names) + ' ' + getRandomValue(surnames),
      coatColor: getRandomValue(coatColors),
      eyesColor: getRandomValue(eyesColors)
    };
    characters[i] = person;
  }
  return characters;
}

var wizards = getCharacters(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

function getElementWithWizard(template, name, coatColor, eyesColor) {
  var wizardTemplate = template.cloneNode(true);
  wizardTemplate.querySelector('.setup-similar-label').textContent = name;
  wizardTemplate.querySelector('.wizard-coat').style.fill = coatColor;
  wizardTemplate.querySelector('.wizard-eyes').style.fill = eyesColor;
  return wizardTemplate;
}

function pushWizardsInPage(template, characters) {
  var similarListElement = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < characters.length; i++) {
    var newWizardElement = getElementWithWizard(template, characters[i].name, characters[i].coatColor, characters[i].eyesColor);
    fragment.appendChild(newWizardElement);
  }
  similarListElement.appendChild(fragment);
}

pushWizardsInPage(similarWizardTemplate, wizards);

document.querySelector('.setup-similar').classList.remove('hidden');
