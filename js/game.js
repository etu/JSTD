
'use strict';

console.log('loaded');

var env;
//var env, keyStates = {};


/**
 * Launch game on load of all resources
 */
window.addEvent('load', function() {
    env = new Environment();

    window.requestAnimationFrame((function () {
        env.gameLoop();
    }));

    $('unpause').addEvent('click', function() {
        env.unpause();
    });
});

// Automagic pause if you loose focus of the game
window.addEvent('blur', function() {
    env.pause();
});





// Record keypresses
/*
window.addEvent('keydown', function(e) {
    if(keyStates[e.key] !== null) keyStates[e.key] = true;

    if(keyStates.p) { // Hotkey for pausing/unpausing
	if(env.options.pause) env.unpause();
	else env.pause();
    }
});
window.addEvent('keyup',   function(e) { delete keyStates[e.key]; });
*/


/**
 * BaseClass with basic creating of objects and basic structure
 */
/*
var BaseClass = new Class({
    Implements: [ Options ],
    options: {
	lastUpdateTime: Date.now(),
	x: 0,
	y: 0
    },
    initialize: function(options) {
	// Override some default options, if I put the random operations
	// in the options object, it will be the same random for all objects :-)
	this.options.x = Number.random(0, env.width);
	this.options.y = Number.random(0, env.height);

	this.setOptions(options);

	env.gameObjects.push(this);
    },
    move: function() {
    },
    draw: function() {
    }
});
*/
