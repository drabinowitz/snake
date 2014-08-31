$(document).ready(function(){

  var snake = {

    boardContext : undefined,

    settings : {},

    body : [],

    currentDirection : 40,

    intervalID : undefined,

    generate : function(){

      snake.boardContext.fillStyle="#00FF00";

      _.each(_.range(snake.settings.snakeSize),function(value){

        var blockPosition = snake.settings.startingPos[1] + value * snake.settings.bodySize;

        snake.boardContext.fillRect(snake.settings.startingPos[0],blockPosition,snake.settings.bodySize,snake.settings.bodySize);

        snake.body.push([snake.settings.startingPos[0],blockPosition]);

      });

      $(document).keydown(function(e){

        if(e.which >= 37 && e.which <= 40){

          e.preventDefault();

          snake.move.turn(e.which);

        }

      });

      snake.move.start(snake.intervalID);

    },

    destroy : function(){



    },

    move : {

      continue : function(){

        switch(snake.currentDirection){

          case 37:

            snake.move.step(-1,0);
            break;

          case 38:

            snake.move.step(0,-1);
            break;

          case 39:

            snake.move.step(1,0);
            break;

          case 40:

            snake.move.step(0,1);
            break;

        }

      },

      start : function(intervalID){

        if(intervalID){

          clearInterval(intervalID);

        }

        snake.intervalID = setInterval(snake.move.continue,snake.settings.speed * 1000);

      },

      step : function(x,y){

        var tail = snake.body.shift();

        snake.boardContext.clearRect(tail[0],tail[1],snake.settings.bodySize,snake.settings.bodySize);

        var head = snake.body[snake.body.length - 1];

        snake.body.push([head[0] + x*snake.settings.bodySize,head[1] + y*snake.settings.bodySize]);

        head = snake.body[snake.body.length - 1];

        snake.boardContext.fillRect(head[0],head[1],snake.settings.bodySize,snake.settings.bodySize);

      },

      isOpposite : function(direction){

        if(direction + snake.currentDirection == 77){

          return true;

        }

        return false;

      },

      reverseDirection : function(){

        var holder = snake.body[snake.body.length - 1].slice();

        snake.body[snake.body.length - 1] = snake.body[0].slice();

        snake.body[0] = holder;

      },

      turn : function(direction){

        if(snake.move.isOpposite(direction)){

          snake.move.reverseDirection();

        }

        snake.currentDirection = direction;

      },

      grow : function(){



      }

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

    snake.boardContext = gameSettings.boardContext;

    snake.generate();

    snake.placeApple();

  });

  snake.listenTo(siren,"snake-got-apple", function(snakeSize){

    snake.grow();

    snake.placeApple();

  });

});