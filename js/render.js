'use strict';
// отрисовка персонажей
window.render = (function () {

  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var setupSimilarListElement = document.querySelector('.setup-similar-list');
  var setupSimilarElement = document.querySelector('.setup-similar');


  function getElementWithWizard(template, wizard) {
    var wizardTemplate = template.cloneNode(true);
    wizardTemplate.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardTemplate.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardTemplate.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardTemplate;
  }

  return {
    render: function (data) {
      var takeNumber = data.length > MAX_SIMILAR_WIZARD_COUNT ? MAX_SIMILAR_WIZARD_COUNT : data.length;
      setupSimilarListElement.innerHTML = '';
      for (var i = 0; i < takeNumber; i++) {
        setupSimilarListElement.appendChild(getElementWithWizard(similarWizardTemplate, data[i]));
      }
      setupSimilarElement.classList.remove('hidden');
    },
  };
})();
