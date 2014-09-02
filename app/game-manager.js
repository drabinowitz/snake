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

      startingPos : [140,0],

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

    siren.trigger("new-game");

  });

  $('.board-size-button').click(function(event){

    var target = $(event.target);

    $('.board-size-button').removeClass('selected');

    target.addClass('selected');

    var targetSize = target.text().toLowerCase();

    switch(targetSize){

      case "small":

        game.settings.boardSize = 100;
        break;

      case "medium":

        game.settings.boardSize = 300;
        break;

      case "large":

        game.settings.boardSize = 500;
        break;

    }

      game.settings.startingPos[0] = Math.floor( game.settings.boardSize / ( 2 * game.settings.bodySize ) ) * game.settings.bodySize;

      $('.game-field,.game-overlay').removeClass('small').

      removeClass('medium').

      removeClass('large').

      addClass(targetSize);

      $('#game-board').attr({

        width : game.settings.boardSize,

        height : game.settings.boardSize

      });

      if( $('.game-overlay').hasClass('hidden') ){

        siren.trigger('snake-died');

      }

  });

  game.listenTo(siren,"new-game", function(){

    game.toggleOverlay();

    game.generateBoard();

    siren.trigger("reset-score",game.settings);

    siren.trigger("create-snake",game.settings);

  });

  game.listenTo(siren,"snake-died", function(){

    game.toggleOverlay();

  });

});