'use strict';
// статистика при завершении игры
(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var GAP_FOR_MESSAGE = 20;
  var GAP_FOR_PLAYER_X = 40;
  var GAP_FOR_PLAYER_Y = 90;
  var WIDTH_COLUMN = 40;
  var GAP_COLUMN = 50;
  var HEIGHT_COLUMN = 150;

  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  }

  function getMaxElement(arr) {
    var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  }

  function getRandomSaturation(hslColor) {
    var randomSaturation = (Math.round(Math.random() * 100));
    var colors = hslColor.split(',');
    colors[1] = randomSaturation + '%';
    return colors.join(',');
  }

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP_FOR_MESSAGE, CLOUD_Y + GAP_FOR_MESSAGE);
    ctx.fillText('Список результатов:', CLOUD_X + GAP_FOR_MESSAGE, CLOUD_Y + GAP_FOR_MESSAGE * 2);

    for (var j = 0; j < times.length; j++) {
      times[j] = Math.round(times[j]);
    }

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      var colorPlayerColumn;
      if (players[i] === 'Вы') {
        colorPlayerColumn = 'rgba(255, 0, 0, 1)';
      } else {
        colorPlayerColumn = getRandomSaturation('hsl(249, 50%, 50%)');
      }

      ctx.fillStyle = colorPlayerColumn;
      ctx.fillRect(CLOUD_X + GAP_FOR_PLAYER_X + ((WIDTH_COLUMN + GAP_COLUMN) * i), GAP_FOR_PLAYER_Y + (HEIGHT_COLUMN - (HEIGHT_COLUMN * times[i] / maxTime)), WIDTH_COLUMN, (HEIGHT_COLUMN * times[i] / maxTime));

      ctx.fillStyle = '#000';
      ctx.fillText(times[i], CLOUD_X + GAP_FOR_PLAYER_X + ((WIDTH_COLUMN + GAP_COLUMN) * i), (GAP_FOR_PLAYER_Y + (HEIGHT_COLUMN - (HEIGHT_COLUMN * times[i] / maxTime))) - 20);

      ctx.fillText(players[i], CLOUD_X + GAP_FOR_PLAYER_X + ((WIDTH_COLUMN + GAP_COLUMN) * i), CLOUD_Y + HEIGHT_COLUMN + GAP_FOR_PLAYER_Y);
    }
  };
})();
