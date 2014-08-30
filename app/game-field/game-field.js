$(document).ready(function(){

  var snake = {

    boardCanvas : undefined,

    settings : {},

    generate : function(){

      snake.boardCanvas = $('#game-board');

      snake.boardCanvas.attr({

        width : snake.settings.boardSize * 100,

        height : snake.settings.boardSize * 100

      });

      snake.boardContext = snake.boardCanvas[0].getContext('2d');

      snake.boardContext.clearRect(0,0,snake.settings.boardSize * 100,snake.settings.boardSize * 100);

    },

    destroy : function(){



    },

    move : function(){



    },

    turn : function(){



    },

    grow : function(){



    },

    check : function(){

      siren.trigger("snake-got-apple",snake.size);

      siren.trigger("snake-died")

    },

    placeApple : function(){



    }

  };

  _.extend(snake, Backbone.Events);

  snake.listenTo(siren,"create-snake", function(gameSettings){

    snake.settings = gameSettings;

    snake.generate();

    snake.placeApple();

  });

  snake.listenTo(siren,"snake-got-apple", function(snakeSize){

    snake.grow();

    snake.placeApple();

  });

});