'use strict';
// похожие персонажи в окне создания персонажа
window.setup = (function () {

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizards = getCharacters();
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  pushWizardsInPage(similarWizardTemplate, wizards);

  document.querySelector('.setup-similar').classList.remove('hidden');

  function getCharacters() {
    var characters = [];
    var count = 4;
    for (var i = 0; i < count; i++) {
      var person = {
        name: window.util.getRandomValueFromArray(NAMES) + ' ' + window.util.getRandomValueFromArray(SURNAMES),
        coatColor: window.util.getRandomValueFromArray(COAT_COLORS),
        eyesColor: window.util.getRandomValueFromArray(EYES_COLORS)
      };
      characters[i] = person;
    }
    return characters;
  }

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

  return {
    EYES_COLORS: EYES_COLORS,
    COAT_COLORS: COAT_COLORS,
    FIREBALLS_COLORS: FIREBALLS_COLORS,
  };
})();

