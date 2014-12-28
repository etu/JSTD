'use strict';

/**
 * Map class
 */
var Map = new Class({
    Implements: [ Options ],
    options: {
        colors: {
            0: '#FF00FF',
            1: '#FFFF00'
        }
    },
    map: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    initialize: function(options) {
        this.setOptions(options);
    },
    draw: function() {
        if (this.ctx) { // If ctx is defined, chicken out, we don't redraw this.
            return;
        }

        this.ctx = env.options.ctxs.background;
        this.options.gridSize = env.options.gridSize;

        var drawX = 0;
        var drawY = 0;

        Array.each(this.map, function(row) {
            Array.each(row, function(col) {
                this.ctx.fillStyle = this.options.colors[col];
                this.ctx.beginPath();
                this.ctx.rect(drawX, drawY, this.options.gridSize, this.options.gridSize);
                this.ctx.closePath();
                this.ctx.fill();

                drawX += this.options.gridSize;
            }, this);

            drawX = 0;
            drawY += this.options.gridSize;
        }, this);
    }
});
