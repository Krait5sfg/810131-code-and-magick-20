'use strict';
// утилитарные функции
window.util = (function () {

  return {
    getRandomValueFromArray: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  };
})();
