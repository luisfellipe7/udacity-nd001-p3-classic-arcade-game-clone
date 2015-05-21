// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Set the Enemy initial location
    this.row = Math.floor((Math.random() * 3) + 1);
    this.col = -1;
    // Set the Enemy speed
    this.speed = 1; // XXX let's just try 1 for now
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // TODO: update the Enemy location
    // TODO: handle collision with the Player
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Load the image to this.sprite
    this.sprite = 'images/char-boy.png';
    // Set the player initial Location
    this.row = 6; // XXX let's just try 6 for now
    this.col = 2; // XXX let's just try 2 for now
}

Player.prototype.update = function() {
    // TODO: implement
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // TODO: implement
}

Player.prototype.handleInput = function() {
    // TODO: implement
    /*
     * This method should receive user input, allowedKeys (the key which
     * was pressed) and move the player according to that input.
     * Left key should move the player to the left.
     * Right key should move the player to the right.
     * Up key should move the player up
     * Down key should move the player down
     * The player cannot move off screen
     * If the player reaches the water the game should be reset by
     * moving the player back to the initial locaion
     */
}

/*
 * Reset to initial state
 */
Player.prototype.reset = function() {
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i=0; i<3; i++) {
    allEnemies.push(new Enemy());
}
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
