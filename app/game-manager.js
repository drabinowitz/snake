$(document).ready(function(){

  var game = {

    generateBoard : function(){

      game.settings.boardCanvas = $('#game-board');

      game.settings.boardCanvas.attr({

        width : game.settings.boardSize,

        height : game.settings.boardSize

      });

      game.settings.boardContext = game.settings.boardCanvas[0].getContext('2d');

      game.settings.boardContext.clearRect(0,0,game.settings.boardSize,game.settings.boardSize);
      
      game.settings.boardContext.fillStyle = game.settings.backgroundColor;

      game.settings.boardContext.fillRect(0,0,game.settings.boardSize,game.settings.boardSize);

    },

    toggleOverlay : function(){

      $('.game-overlay').toggleClass('hidden');

    },

    settings : {

      boardCanvas : undefined,

      boardContext : undefined,

      backgroundColor : "#b85c00",

      wallColor : '#000000',

      startingPos : [0,140],

      speed : 5,

      boardSize : 300,

      snakeSize : 3,

      snakeColor : "#00ff00",

      bodySize : 20,

      growCount : 2,

      appleColor : '#ff0000'

    }

  };

  _.extend(game, Backbone.Events);

  $('.new-game').click(function(){

    game.toggleOverlay();

    game.generateBoard();

    siren.trigger("reset-score",game.settings);

    siren.trigger("create-snake",game.settings);

  });

  game.listenTo(siren,"snake-died", function(){

    game.toggleOverlay();

  });

});