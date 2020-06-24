'use strict';
// модуль debounce
window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;

  return {
    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },
  };
})();
