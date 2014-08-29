var siren = {};

_.extend(siren, Backbone.Events);

$(document).ready(function(){

  function generateBoard(boardSize){

    var i = 0;

    var j = 0;

    for (i = 0; i < boardSize; i++){

      $('.game-board tr').append('<td>').attr('class','board-cell').data({



      })

    }

  }

  var game = {

    settings : {

      speed : 1,

      boardSize : 10,

      snakeSize : 3

    }

  };

  _.extend(game, Backbone.Events);

  game.listenTo(siren,"new-game", function(){

    generateBoard( game.settings.boardSize );

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