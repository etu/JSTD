'use strict';

/**
 * Tower Class
 */
var Tower = new Class({
    Implements: Options,
    options: {
        lastUpdateTime: 0,
        tile: [0, 0]
    },
    initialize: function(options) {
        this.setOptions(options);

        this.ctx = env.options.ctxs.background;
    },
    update: function(time) {
        this.lastUpdateTime = time;
    },
    draw: function() {
        var xy = env.options.map.getXYByTile(this.options.tile);

        this.ctx.fillStyle = '#FFF';
        this.ctx.beginPath();
        this.ctx.arc(
            xy[0], // X Coord
            xy[1], // Y Coord
            (env.options.gridSize / 2) * 0.8, // Radius
            0,
            Math.PI * 2, true
        );
        this.ctx.closePath();
        this.ctx.fill();

        console.log(xy);
    }
});
