$(document).ready(function(){

  var game = {

    settings : {

      speed : 1,

      boardSize : 5,

      snakeSize : 3

    }

  };

  _.extend(game, Backbone.Events);

  game.listenTo(siren,"new-game", function(){

    siren.trigger("reset-score",game.settings);

    siren.trigger("create-snake",game.settings);

  });

  $('.new-game').click(function(){

    siren.trigger("new-game");

  });

  game.listenTo(siren,"snake-died", function(){

    siren.trigger("new-game");

  });

});