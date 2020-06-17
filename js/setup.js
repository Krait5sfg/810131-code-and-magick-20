'use strict';
// похожие персонажи в окне создания персонажа
window.setup = (function () {
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLS_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var similarListElement = document.querySelector('.setup-similar-list');

  // загрузка магов с сервера
  window.backend.load(onLoad, onError);

  function getElementWithWizard(template, wizard) {
    var wizardTemplate = template.cloneNode(true);
    wizardTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardTemplate;
  }

  function onLoad(wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(getElementWithWizard(similarWizardTemplate, window.util.getRandomValueFromArray(wizards)));
    }
    similarListElement.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');

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

  return {
    EYES_COLORS: EYES_COLORS,
    COAT_COLORS: COAT_COLORS,
    FIREBALLS_COLORS: FIREBALLS_COLORS,
  };
})();

