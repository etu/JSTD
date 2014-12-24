
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

        return this;
    },
    gameLoop: function() {
        console.log('Request frame');

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
	//this.options.player.options.lastUpdateTime    = time;
	//this.options.starfield.options.lastUpdateTime = time;

	this.options.pause = false;

	window.requestAnimationFrame((function() {
	    self.gameLoop();
	}));
    }
});






var Enviroment_old = new Class({
    Implements: [ Options ],
    options: {
	gameObjects: [],
	width:  640,
	height: 480,
	pause:  false
    },
    initialize: function(options) {
	env = this; // Set this to the global env variable

	this.setOptions(options);

	this.options.ctxs = {
	    background: $('background').getContext('2d'),
	    screen:     $('screen').getContext('2d')
	}

	this.options.starfield = new StarField();
	this.options.player    = new Player();
    },
    gameLoop: function() {
	var self = this;

	/**
	 * Move ALL the things!
	 */
	self.options.player.move();

	Array.each(self.options.gameObjects, function(object) {
	    object.move();
	});

	/**
	 * Draw ALL the things!
	 */
	self.options.ctxs.screen.clearRect(0, 0, self.options.width, self.options.height);

	self.options.player.draw();

	Array.each(self.options.gameObjects, function(object) {
	    object.draw();
	});

	/**
	 * Move/Draw starfield, it got it's own canvas and own life anyways
	 */
	self.options.starfield.move();

	/**
	 * If not paused, request a new frame
	 */
	if(!self.options.pause) {
	    window.requestAnimationFrame((function() {
		self.gameLoop();
	    }));
	}
    },
    unpause: function() {
	var self = this,
	    time = Date.now();

	/**
	 * Hide the pausescreen
	 */
	$('pausescreen').setStyle('display', 'none');

	/**
	 * Update all timingevents
	 */
	this.options.player.options.lastUpdateTime    = time;
	this.options.starfield.options.lastUpdateTime = time;

	/**
	 * unpause
	 */
	this.options.pause = false;

	/**
	 * Request a new timed frame
	 */
	window.requestAnimationFrame((function() {
	    self.gameLoop();
	}));
    }
});
