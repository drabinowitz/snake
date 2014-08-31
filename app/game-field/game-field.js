$(document).ready(function(){

  var snake = {

    boardCanvas : undefined,

    settings : {},

    head : [0,0],

    tail : [0,0],

    bodySize : 50,

    currentDirection : 40,

    generate : function(){

      snake.boardCanvas = $('#game-board');

      snake.boardCanvas.attr({

        width : snake.settings.boardSize * 100,

        height : snake.settings.boardSize * 100

      });

      snake.boardContext = snake.boardCanvas[0].getContext('2d');

      snake.boardContext.clearRect(0,0,snake.settings.boardSize * 100,snake.settings.boardSize * 100);

      snake.boardContext.fillStyle="#00FF00";

      _.each(_.range(snake.settings.snakeSize),function(value){

        snake.boardContext.fillRect(10,10 + value * snake.bodySize,snake.bodySize,snake.bodySize);

        if(value == 0){snake.tail = [10,10 + value * snake.bodySize]}
        else if(value == snake.settings.snakeSize - 1){snake.head = [10,10 + value * snake.bodySize]}

      });

      snake.head = [10,110];

      snake.tail = [10,10];

      snake.move.down();

      $(document).keydown(function(e){

        snake.turn(e.which);

      });

    },

    destroy : function(){



    },

    move : {

      down : function(){

        setTimeout(function(){

          snake.boardContext.clearRect(snake.tail[0],snake.tail[1],snake.bodySize,snake.bodySize);

          snake.tail = [snake.tail[0],snake.tail[1] + snake.bodySize];

          snake.head = [snake.head[0],snake.head[1] + snake.bodySize];

          snake.boardContext.fillRect(snake.head[0],snake.head[1],50,50);

          if(snake.currentDirection == 40){snake.move.down();}

        },snake.settings.speed * 1000);

      }

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