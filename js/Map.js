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

        /**
         * Save all walkable tiles to pathMap
         */
        this.pathMap = pathMap;

        /**
         * Calculate a new pathMap that knows the order of the tiles in the path
         */
        var currentTile = this.findPreStartTile();
        var lastTile = currentTile;
        var tile;

        var pathMap = [ currentTile ];

        while (this.pathMap.length > pathMap.length - 1) {
            tile = this.findNextTile(currentTile, lastTile);

            lastTile = currentTile;
            currentTile = tile;

            pathMap.push(tile);
        }

        pathMap.push([ tile[0] + 1, tile[1] ]);

        this.pathMap = pathMap;
    },
    /**
     * Calculate starting tile of the map
     */
    findPreStartTile: function() {
        var startTile;

        Array.each(this.pathMap, function(tile) {
            if (tile[0] == 0) {
                startTile = tile;
            }
        });

        startTile = [ startTile[0] - 1, startTile[1] ];

        return startTile;
    },
    /**
     * Find next tile that intersect to currentTile and ignores previousTile
     */
    findNextTile: function(currentTile, previousTile) {
        var nextTile;

        Array.each(this.pathMap, function(tile) {
            if ((tile[0] === currentTile[0] + 1 && tile[1] === currentTile[1]) || // East
                (tile[0] === currentTile[0] && tile[1] === currentTile[1] - 1) || // North
                (tile[0] === currentTile[0] && tile[1] === currentTile[1] + 1) || // South
                (tile[0] === currentTile[0] - 1 && tile[1] === currentTile[1])) { // West

                if (!(tile[0] === previousTile[0] && tile[1] === previousTile[1])) {
                    nextTile = tile;
                }
            }
        });

        return nextTile;
    },
    /**
     * Get XY coords by Distance
     */
    getXYByDistance: function(distance) {
        var tile;
        var coords = [ this.options.gridSize / 2, this.options.gridSize / 2 ];
        var tileNumber = distance.floor();
        var tileFragment = distance - tileNumber;

        if (!this.pathMap[tileNumber]) {
            return false;
        }

        tile = this.pathMap[tileNumber];

        // Get the rough numbers by tile location
        coords[0] += tile[0] * this.options.gridSize;
        coords[1] += tile[1] * this.options.gridSize;

        return coords;
    }
});
