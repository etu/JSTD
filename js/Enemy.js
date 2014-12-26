'use strict';

/**
 * Enemy Class
 */
var Enemy = new Class({
    Implements: Options,
    options: {
        lastUpdateTime: 0,
        health: 255,
        speed: 0,
        remove: false
    },
    initialize: function(options) {
        this.setOptions(options);

        this.ctx = env.options.ctxs.screen;
    },
    update: function(time) {
        //console.log('updating');

        this.options.lastUpdateTime = time;

        this.options.health--;

        if (this.options.health <= 0) {
            this.options.remove = true;
        }
    },
    draw: function() {
        //console.log('drawing');

        this.ctx.fillStyle = this.calculateColor();
        this.ctx.beginPath();
	this.ctx.arc(
            200,   // X Coord
            200,   // Y Coord
            50,    // Radius
	    0,
	    Math.PI * 2, true
	);
	this.ctx.closePath();
	this.ctx.fill();
    },
    calculateColor: function() {
        var hex = this.options.health.toString(16).lpad(0, 2);

        return '#' + hex + hex + hex;
    }
});
