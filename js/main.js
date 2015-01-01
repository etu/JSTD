'use strict';

var env, keyStates = {}, mousePos;


/**
 * Launch game on load of all resources
 */
window.addEvent('load', function() {
    env = new Environment();

    window.requestAnimationFrame((function () {
        env.gameLoop();
    }));


    /**
     * Add support for unpause button
     */
    $('unpause').addEvent('click', function() {
        env.unpause();
    });


    /**
     * Automagic pause if you loose focus of the game
     */
    window.addEvent('blur', function() {
        env.pause();
    });


    /**
     * Record keypresses
     */
    window.addEvent('keydown', function(e) {
        if (keyStates[e.key] !== null) {
            keyStates[e.key] = true;
        }

        if (keyStates.p) { // Hotkey for pausing/unpausing
            if (env.options.frame === undefined) {
                env.unpause();
            } else {
                env.pause();
            }
        }
    });
    window.addEvent('keyup', function(e) {
        delete keyStates[e.key];
    });

    /**
     * Track Mouse
     */
    $('screen').addEvent('mousemove', function(e) {
        var rect = $('screen').getBoundingClientRect();

        mousePos = new XY(
            e.client.x - rect.left,
            e.client.y - rect.top
        );
    });
});



String.prototype.lpad = function(padString, length) {
    var str = this;

    while (str.length < length) {
        str = padString + str;
    }

    return str;
}
