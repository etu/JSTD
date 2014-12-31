'use strict';

/**
 * Enemy Class
 */
var Enemy = new Class({
    Implements: Options,
    options: {
        lastUpdateTime: 0,
        health: 511,
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
        this.options.distance += (time - this.options.lastUpdateTime) * this.options.speed / 1000;

        if (this.options.health <= 0) {
            this.options.remove = true;
        }

        this.options.lastUpdateTime = time;
    },
    draw: function() {
        var xy = env.options.map.getXYByDistance(this.options.distance);

        if (xy === false) {
            this.options.remove = true;
        }

        this.ctx.fillStyle = this.calculateColor();
        this.ctx.beginPath();
	this.ctx.arc(
            xy.x, // X Coord
            xy.y, // Y Coord
            (env.options.gridSize / 2) * 0.8,    // Radius
	    0,
	    Math.PI * 2, true
	);
	this.ctx.closePath();
	this.ctx.fill();
    },
    calculateColor: function() {
        // Green:  #00FF00
        // Yellow: #FFFF00
        // Red:    #FF0000

        if (this.options.health >= 256) {
            var val = 255 - (256 - this.options.health) * -1;
            var hex = '#' + val.toString(16).lpad(0, 2) + 'FF00';

            return hex;
        }

        var hex = '#FF' + this.options.health.toString(16).lpad(0, 2) + '00';

        return hex;
    }
});
