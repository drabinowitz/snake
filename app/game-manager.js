$(document).ready(function(){

  var game = {

    generateBoard : function(){

      game.settings.boardCanvas = $('#game-board');

      game.settings.boardCanvas.attr({

        width : game.settings.boardSize * 100,

        height : game.settings.boardSize * 100

      });

      game.settings.boardContext = game.settings.boardCanvas[0].getContext('2d');

      game.settings.boardContext.clearRect(0,0,game.settings.boardSize * 100,game.settings.boardSize * 100);
      
      game.settings.boardContext.fillStyle=game.settings.backgroundColor;

      game.settings.boardContext.fillRect(0,0,game.settings.boardSize * 100,game.settings.boardSize * 100);

    },

    settings : {

      boardCanvas : undefined,

      boardContext : undefined,

      backgroundColor : "#B85C00",

      wallColor : '#000000',

      startingPos : [100,100],

      speed : 1,

      boardSize : 3,

      snakeSize : 3,

      snakeColor : "#00FF00",

      bodySize : 20,

      appleColor : '#FF0000'

    }

  };

  _.extend(game, Backbone.Events);

  game.listenTo(siren,"new-game", function(){

    game.generateBoard();

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