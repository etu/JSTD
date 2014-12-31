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
                    pathMap.push(new XY(cCol, cRow));
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

        pathMap.push(new XY(tile.x + 1, tile.y));

        this.pathMap = pathMap;
    },
    /**
     * Calculate starting tile of the map
     */
    findPreStartTile: function() {
        var startTile;

        Array.each(this.pathMap, function(tile) {
            if (tile.x === 0) {
                startTile = tile;
            }
        });

        startTile = new XY(startTile.x - 1, startTile.y);

        return startTile;
    },
    /**
     * Find next tile that intersect to currentTile and ignores previousTile
     */
    findNextTile: function(currentTile, previousTile) {
        var nextTile;

        Array.each(this.pathMap, function(tile) {
            if ((tile.x === currentTile.x + 1 && tile.y === currentTile.y) || // East
                (tile.x === currentTile.x && tile.y === currentTile.y - 1) || // North
                (tile.x === currentTile.x && tile.y === currentTile.y + 1) || // South
                (tile.x === currentTile.x - 1 && tile.y === currentTile.y)) { // West

                if (!(tile.x === previousTile.x && tile.y === previousTile.y)) {
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
        var tile, nextTile;
        var coords = new XY(this.options.gridSize / 2, this.options.gridSize / 2);
        var tileNumber = distance.floor();
        var tileFragment = distance - tileNumber;

        if (!this.pathMap[tileNumber]) {
            return false;
        }

        tile = this.pathMap[tileNumber];

        // Get the rough numbers by tile location
        coords.x += tile.x * this.options.gridSize;
        coords.y += tile.y * this.options.gridSize;

        // Calculate direction for next tile, calculate which of the following to execute:
        nextTile = this.pathMap[tileNumber + 1];

        if (nextTile !== undefined) {
            coords[this.nextTileAxis(tile, nextTile)]
                += this.options.gridSize * tileFragment * this.nextTileOperator(tile, nextTile);
        }

        return coords;
    },
    /**
     * Get XY coords by Tile
     */
    getXYByTile: function(tile) {
        return [
            (this.options.gridSize / 2) + this.options.gridSize * tile.x,
            (this.options.gridSize / 2) + this.options.gridSize * tile.y
        ];
    },
    /**
     * Calculate if we should add or subtract pixels to go in the direction of next tile
     */
    nextTileOperator: function(currentTile, nextTile) {
        if ((currentTile.x < nextTile.x) ||
            (currentTile.y < nextTile.y)) {
            return 1;
        }
        if ((currentTile.x > nextTile.x) ||
            (currentTile.y > nextTile.y)) {
            return -1;
        }
    },
    /**
     * Figure out axis to add or subtract pixels to to go in the direction of next tile
     */
    nextTileAxis: function(currentTile, nextTile) {
        if (currentTile.x === nextTile.x) {
            return 'y';
        }

        return 'x';
    }
});
