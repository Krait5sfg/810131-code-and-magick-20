'use strict';
// загрузка и отрисовка похожих персонажей
(function () {


  var wizards = [];
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  // загрузка магов с сервера
  window.backend.load(onLoad, onError);

  window.customizationCharacter.wizard.onCoatChange = function (color) {
    coatColor = color;
    updateWizards();
  };

  window.customizationCharacter.wizard.onEyesChange = function (color) {
    eyesColor = color;
    updateWizards();
  };

  function onLoad(data) {
    wizards = data;
    updateWizards();
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

  function updateWizards() {
    window.render.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function getRank(wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  }
})();

