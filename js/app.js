/* Some global variables that might be usefull */

// Settings
var settings = {
    debug: true,
    pause: false
};

// Define dimensions in game
var colWidth = 101;
var rowHeight = 83;
var tileSize = 83;
var numCols = 5;
var numRows = 6;

// Define boundaries of game board
var boundaryLeft = 0;
var boundaryRight = numCols * colWidth;
var boundaryTop = 0;
var boundaryBottom = numRows * tileSize;

// Define initial values
var initialEnemyCol = 0;
var initialPlayerCol = 2;
var initialPlayerRow = 5;
var minEnemies = 3;
var maxEnemies = 6;
var numEnemies = Math.floor((Math.random() * (maxEnemies-minEnemies)) + 0.5) + minEnemies;



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Set the enemy's initial values
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

    // TODO: handle collision with the Player based on pixels and their
    // alpha channel
    //if (this.row == player.row && Math.ceil(this.x/colWidth) == player.col) {
    //    console.log("Enemy hit player");
    //    if (!settings.debug) {
    //        player.reset();
    //    }
    //}


    // reset when enemy left the canvas
    if (this.x > boundaryRight) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset the enemy to its initial state
Enemy.prototype.reset = function() {
    this.row = Math.floor((Math.random() * 3) + 1);

    // Set enemy's location based on column/row
    this.x = -colWidth;
    this.y = this.row * rowHeight;

    // Set enemy's speed based on row
    this.speed = (4-this.row) * 110;
};


var Player = function() {
    // Set default values
    this.reset();

    // Load the image to this.sprite
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Only update coordinates when the player has made a move
    if (this.moved) {
        this.x = this.col * colWidth;
        this.y = this.row * rowHeight;
        this.moved = false;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
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
    console.log("Key pressed: " + keyCode);
    switch (keyCode) {
        case "left":
            if (this.x < colWidth) {
                console.log("Player not allowed to move off screen");
            } else {
                this.move(keyCode);
            }
            break;
        case "up":
            if (this.y < rowHeight) {
                console.log("Player not allowed to move off screen");
            } else {
                this.move(keyCode);
            }
            break;
        case "right":
            if (this.x >= boundaryRight-colWidth) {
                console.log("Player not allowed to move off screen");
            } else {
                this.move(keyCode);
            }
            break;
        case "down":
            if (this.y >= boundaryBottom-rowHeight) {
                console.log("Player not allowed to move off screen");
            } else {
                this.move(keyCode);
            }
            break;
    }
};

// Move player one column/row in the given direction
Player.prototype.move = function(direction) {
    switch (direction) {
        case "left":
            this.col -= 1;
            break;
        case "up":
            this.row -= 1;
            break;
        case "right":
            this.col += 1;
            break;
        case "down":
            this.row += 1;
            break;
    }
    this.moved = true;
};

// Reset the player to its initial state
Player.prototype.reset = function() {
    // Set the player's initial column/row
    this.col = initialPlayerCol;
    this.row = initialPlayerRow;

    // Set location based on column/row
    this.x = this.col * colWidth;
    this.y = this.row * rowHeight;
};



// HUD to project game-status (and for debugging)
var Hud = function() {
};

Hud.prototype.render = function() {
    if (settings.debug) {
        this.drawBoundingBoxes();
    }
};

// This will help understanding the behavior of the algorithms by
// visualizing the data that's being used behind the scenes.
Hud.prototype.drawBoundingBoxes = function() {
    // Draw bounding boxes of the entities
    allEnemies.forEach(function(e) {
        ctx.strokeRect(e.x, e.y, 101, 170);
    });
    ctx.strokeRect(player.x, player.y, 101, 170);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i=0; i<numEnemies; i++) {
    allEnemies.push(new Enemy());
}
console.log("Amount of enemies created: " + allEnemies.length);
console.log(numEnemies);
var player = new Player();

var hud = new Hud();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        27: 'esc',   // Escape (reset)
        37: 'left',  // ArrowLeft
        38: 'up',    // ArrowUp
        39: 'right', // ArrowRight
        40: 'down',  // ArrowDown
        68: 'd',     // Debug
        80: 'p'      // Pause
    };

    console.log("pressed: " + e.keyCode);

    switch (allowedKeys[e.keyCode]) {
        case 'esc':
            player.reset();
            break;
        case 'd':
            settings.debug = !settings.debug;
            console.log("debug: " + (settings.debug ? "on" : "off") );
            break;
        case 'p':
            settings.pause = !settings.pause;
            console.log( (settings.pause ? "paused" : "resumed") );
            break;
        default:
            if (!settings.pause) {
                player.handleInput(allowedKeys[e.keyCode]);
            }
    }

    if (settings.pause && settings.debug) {
        debugger;
    }
});
