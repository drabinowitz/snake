$(document).ready(function(){

  var snake = {

    boardContext : undefined,

    settings : {},

    body : [],

    currentGrow : 0,

    currentDirection : 40,

    intervalID : undefined,

    generate : function(){

      snake.destroy();

      snake.boardContext.fillStyle=snake.settings.snakeColor;

      _.each(_.range(snake.settings.snakeSize),function(value){

        var blockPosition = snake.settings.startingPos[1] + value * snake.settings.bodySize;

        snake.boardContext.fillRect(snake.settings.startingPos[0],blockPosition,snake.settings.bodySize,snake.settings.bodySize);

        snake.body.push([snake.settings.startingPos[0],blockPosition]);

      });

      $(document).on('keydown',function(e){

        if(e.which >= 37 && e.which <= 40){

          e.preventDefault();

          snake.move.turn(e.which);

        }

      });

      snake.placeApple();

      snake.move.start();

    },

    destroy : function(){

      clearInterval(snake.intervalID);

      snake.body = [];

      snake.currentDirection = 40;

      $(document).off('keydown');

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

      start : function(){

        snake.intervalID = setInterval(function(){

          snake.move.continue(snake.move.step);

        },1000 / snake.settings.speed);

      },

      step : function(x,y){

        if(snake.currentGrow == 0){

          var tail = snake.body.shift();

          snake.boardContext.fillStyle = snake.settings.backgroundColor;

          snake.boardContext.fillRect(tail[0],tail[1],snake.settings.bodySize,snake.settings.bodySize);

        } else {

          snake.currentGrow--;

        }

        var head = snake.body[snake.body.length - 1];

        snake.boardContext.fillStyle = snake.settings.snakeColor;

        snake.body.push([head[0] + x*snake.settings.bodySize,head[1] + y*snake.settings.bodySize]);

        head = snake.body[snake.body.length - 1];

        var result = snake.check(head);

        snake.boardContext.fillRect(head[0],head[1],snake.settings.bodySize,snake.settings.bodySize);

        snake.handle(result);

      },

      isOpposite : function(direction){

        if( (direction + snake.currentDirection == 76 || direction + snake.currentDirection == 78) && snake.currentDirection != direction ){

          return true;

        }

        return false;

      },

      reverseDirection : function(){

        snake.body.reverse();

      },

      turn : function(direction){

        if(snake.move.isOpposite(direction)){

          snake.move.reverseDirection();

          snake.currentDirection = direction;

        } else if (snake.currentDirection != direction){

          snake.currentDirection = direction;
          
        }

      },

      grow : function(){

        snake.currentGrow += snake.settings.growCount;

      }

    },

    check : function(head){

      var squareColor = rgb2hex( snake.boardContext.getImageData(head[0],head[1],1,1).data );

      if(squareColor == snake.settings.appleColor){

        return "apple";
        
      } else if (squareColor == snake.settings.snakeColor || squareColor == snake.settings.wallColor ){

        return "died";
              
      }

    },

    handle : function(result){

      switch(result){

        case "apple":

          siren.trigger("snake-got-apple",snake.body.length);

          break;

        case "died":

          siren.trigger("snake-died");

          break;


      }

    },

    placeApple : function(){

      function getPos(){

        var xPos = Math.floor(Math.random() * snake.settings.boardSize / snake.settings.bodySize) * snake.settings.bodySize;

        var yPos = Math.floor(Math.random() * snake.settings.boardSize / snake.settings.bodySize) * snake.settings.bodySize;

        return [xPos,yPos];

      }

      var pos = getPos();

      var locationColor = rgb2hex( snake.boardContext.getImageData(pos[0],pos[1],1,1).data );

      while (locationColor == snake.settings.wallColor || locationColor == snake.settings.snakeColor){

        pos = getPos();

        locationColor = rgb2hex( snake.boardContext.getImageData(pos[0],pos[1],1,1).data );

      }

      snake.settings.boardContext.fillStyle = snake.settings.appleColor;

      snake.settings.boardContext.fillRect(pos[0],pos[1],snake.settings.bodySize,snake.settings.bodySize);

      snake.settings.boardContext.fillStyle = snake.settings.snakeColor;

    }

  };

  _.extend(snake, Backbone.Events);

  snake.listenTo(siren,"create-snake", function(gameSettings){

    snake.settings = gameSettings;

    snake.boardContext = gameSettings.boardContext;

    snake.generate();

  });

  snake.listenTo(siren,"snake-got-apple", function(snakeSize){

    snake.move.grow();

    snake.placeApple();

  });

  snake.listenTo(siren,"snake-died", function(){

    snake.destroy();

  });

});