$(document).ready(function(){

  var game = {

    generateBoard : function(){

      game.settings.boardCanvas = $('#game-board');

      game.settings.boardContext = game.settings.boardCanvas[0].getContext('2d');

      game.settings.boardContext.clearRect(0,0,game.settings.boardSize,game.settings.boardSize);
      
      game.settings.boardContext.fillStyle = game.settings.backgroundColor;

      game.settings.boardContext.fillRect(0,0,game.settings.boardSize,game.settings.boardSize);

    },

    toggleOverlay : function(){

      $('.game-overlay').toggleClass('hidden');

    },

    triggerCountdown : function(callback){

      var countdown = $('.countdown');

      countdown.removeClass('hidden');

      function countingdown () {

        setTimeout(function(){

          if (countdown.text() > 1){

            countdown.text( countdown.text() - 1 );

            countingdown();

          } else {

            countdown.text( 3 );

            countdown.addClass('hidden');

            callback();

          }

        },1000);

      }

      countingdown();

    },

    settings : {

      boardCanvas : undefined,

      boardContext : undefined,

      backgroundColor : "#b85c00",

      wallColor : '#000000',

      startingPos : [140,0],

      speed : 3,

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

        game.settings.boardSize = 200;
        break;

      case "medium":

        game.settings.boardSize = 300;
        break;

      case "large":

        game.settings.boardSize = 400;
        break;

    }

      game.settings.startingPos[0] = Math.floor( game.settings.boardSize / ( 2 * game.settings.bodySize ) ) * game.settings.bodySize;

      $('.game-overlay').removeClass('small').

      removeClass('medium').

      removeClass('large').

      addClass(targetSize);

      $('.game-field').removeClass('small-field').

      removeClass('medium-field').

      removeClass('large-field').

      addClass(targetSize + "-field");

      

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

    game.triggerCountdown(function(){

      siren.trigger("reset-score",game.settings)

      siren.trigger("create-snake",game.settings);

    });

  });

  game.listenTo(siren,"snake-died", function(){

    game.toggleOverlay();

  });

});