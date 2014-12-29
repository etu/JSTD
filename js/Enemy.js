'use strict';

/**
 * Enemy Class
 */
var Enemy = new Class({
    Implements: Options,
    options: {
        lastUpdateTime: 0,
        health: 255,
        speed: 1,
        distance: 0,
        remove: false
    },
    initialize: function(options) {
        this.setOptions(options);

        this.ctx = env.options.ctxs.screen;

        this.options.lastUpdateTime = Date.now();
    },
    update: function(time) {
        this.options.distance += (time - this.options.lastUpdateTime) * this.options.speed / 100;

        this.options.health--;
        this.options.speed += 0.006;

        if (this.options.health <= 0) {
            this.options.remove = true;
        }

        this.options.lastUpdateTime = time;
    },
    draw: function() {
        var xy = env.options.map.getXYByDistance(this.options.distance);

        this.ctx.fillStyle = this.calculateColor();
        this.ctx.beginPath();
	this.ctx.arc(
            xy[0], // X Coord
            xy[1], // Y Coord
            (env.options.gridSize / 2) * 0.8,    // Radius
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
