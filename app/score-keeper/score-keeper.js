$(document).ready(function(){

  var score = new Backbone.Model;

  score.set({

    value : undefined

  });

  score.step = 1;

  score.listenTo(siren,"reset-score", function(gameSettings){

    score.set({value : 0});

    score.step = Math.floor( gameSettings.speed * 20 / gameSettings.boardSize );

  });

  score.listenTo(siren,"snake-got-apple", function(snakeSize){

    var val = score.get("value");

    score.set({value : val + score.step + snakeSize});

  });

  score.on("change:value", function(model,value){

    $('span.current-score.value').text(value);

  });

});