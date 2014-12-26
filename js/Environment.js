'use strict';

/**
 * Environment Class
 */
var Environment = new Class({
    Implements: [ Options ],
    options: {
        gameObjects: [],
        width: 640,
        height: 480,
        pause: false
    },
    initialize: function(options) {
        this.setOptions(options);

        this.options.ctxs = {
            background: $('background').getContext('2d'),
            screen: $('screen').getContext('2d')
        }

        /**
         * Set up other things
         */
        // this.options.starfield = new StarField();
        // this.options.player    = new Player();

        return this;
    },
    gameLoop: function() {
        /**
         * Move ALL the things!
         */
        var time = Date.now();

        /*
          self.options.player.move();
        */
        Array.each(this.options.gameObjects, function(object) {
            object.update(time);
        });


        /**
         * Remove dead things
         */
        Array.each(this.options.gameObjects, function(object, key) {
            if (object.options.remove) {
                delete this.options.gameObjects[key];
            }
        }, this);


        /**
         * Draw ALL the things!
         */
        /*
          self.options.player.draw();
        */
        this.options.ctxs.screen.clearRect(0, 0, this.options.width, this.options.height);

        Array.each(this.options.gameObjects, function(object) {
            object.draw();
        });


        /**
         * If not paused, request a new frame
         */
        if(!this.options.pause) {
            var self = this;

            window.requestAnimationFrame((function() {
                self.gameLoop();
            }));
        }
    },
    pause: function() {
        this.options.pause = true;

        $('pausescreen').setStyle('display', 'block');
    },
    unpause: function() {
        var self = this,
            time = Date.now();

        $('pausescreen').setStyle('display', 'none');

        /**
         * Update all timingevents
         */
        Array.each(this.options.gameObjects, function (object) {
            object.options.lastUpdateTime = time;
        });

        this.options.pause = false;

        window.requestAnimationFrame((function() {
            self.gameLoop();
        }));
    }
});
