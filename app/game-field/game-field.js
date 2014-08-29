$(document).ready(function(){

  var snake = {

    speed : 1,

    size : 3,

    generate : function(){

      this.destroy();

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

    snake.speed = gameSettings.speed || 1;

    snake.size = gameSettings.snakeSize || 3;

    snake.generate();

    snake.placeApple();

  });

  snake.listenTo(siren,"snake-got-apple", function(snakeSize){

    snake.grow();

    snake.placeApple();

  });

});