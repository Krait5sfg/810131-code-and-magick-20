'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

document.querySelector('.setup').classList.remove('hidden');

function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getCharacters(names, surnames, coatColors, eyesColors) {
  var characters = [];
  for (var i = 0; i < 4; i++) {
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
