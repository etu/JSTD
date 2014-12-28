'use strict';

/**
 * Map class
 */
var Map = new Class({
    Implements: [ Options ],
    options: {
        colors: [ '#054A11', '#411414' ]
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

        var cCol = 0;
        var cRow = 0;
        var pathMap = [];

        Array.each(this.map, function(row) {
            Array.each(row, function(col) {
                /**
                 * Draw Tile
                 */
                this.ctx.fillStyle = this.options.colors[col];
                this.ctx.beginPath();
                this.ctx.rect(
                    cCol * this.options.gridSize, // X
                    cRow * this.options.gridSize, // Y
                    this.options.gridSize,        // Width
                    this.options.gridSize         // Height
                );
                this.ctx.closePath();
                this.ctx.fill();

                /**
                 * Add cooardinate to map of tiles that enemies may walk in
                 */
                if (col == 1) {
                    pathMap.push([cCol, cRow]);
                }

                cCol++;
            }, this);

            cCol = 0;
            cRow++;
        }, this);

        this.pathMap = pathMap;
    }
});
