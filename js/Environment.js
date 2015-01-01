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
        gridSize: 40,
        frame: undefined
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

        this.options.map = new Map(this.options.ctxs.background);

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

        this.options.map.draw();


        /**
         * Request a new frame
         */
        var self = this;

        this.options.frame = window.requestAnimationFrame((function() {
            self.gameLoop();
        }));
    },
    pause: function() {
        window.cancelAnimationFrame(this.options.frame);

        this.options.frame = undefined;

        $('pausescreen').setStyle('display', 'block');
    },
    unpause: function() {
        var self = this,
            time = Date.now();

        if (this.options.frame !== undefined) {
            return;
        }

        $('pausescreen').setStyle('display', 'none');

        /**
         * Update all timingevents
         */
        this.options.frame = window.requestAnimationFrame((function() {
            Array.each(self.options.gameObjects, function (object) {
                object.options.lastUpdateTime = time;
            });

            self.gameLoop();
        }));
    }
});
