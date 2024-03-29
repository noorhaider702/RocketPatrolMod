// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        if(pointValue == 40) {
            this.moveSpeed = game.settings.spaceshipSpeed + .7; 
        } else {
            this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        }
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        } 
    }

    //position reset
    reset() {
        this.x = game.config.width;
    }
}