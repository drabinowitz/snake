$(document).ready(function(){

  var score = {

    value : 0,

    step : 1

  };

  _.extend(score, Backbone.Events);

  score.listenTo(siren,"reset-score", function(gameSettings){

    score.value = 0;

    score.step = Math.floor( gameSettings.speed * 20 / gameSettings.boardSize );

  });

  score.listenTo(siren,"snake-got-apple", function(snakeSize){

    score.value += score.step + snakeSize;

  });

  score.listenTo(siren,"change:value", function(model,value){

    $('span.current-score.value').text(value);

  });

});