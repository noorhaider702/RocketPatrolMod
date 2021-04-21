/*
Noor Haider
Kanye Patrol (Rocket Patrol Mod)
4/19/21
~6 hours
POINTS BREAKDOWN:
30 - simultaneous two-player
20 - New Artwork (new exlosions, Rocket, Spaceship)
20 - New Spaceship (smaller, faster, new artwork/explosion)
10 - 4 new explosion SFX (randomized on hit)
10 - New title Screen (changed font, colors, layout, background)
5 - New background scrolling sprite
5 - Added background sound
--------------------------------------------
TOTAL = 100
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480, 
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
 
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, keyA, keyD, keyL;