$(document).ready(function(){

  var game = {

    settings : {

      speed : 1,

      boardSize : 4

    }

  };

  _.extend(game, Backbone.Events);

  game.on("new-game", function(){

    game.trigger("reset-score",game.settings);

    game.trigger("create-snake",game.settings);

  });

});