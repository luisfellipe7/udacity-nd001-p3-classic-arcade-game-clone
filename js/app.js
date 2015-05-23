/* Some global variables that might be usefull */

// Debugging
var debug = true;

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
    if (this.row == player.row && Math.ceil(this.x/colWidth) == player.col) {
        console.log("Enemy hit player");
        player.reset();
    }


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

    // Set enemy's location based on col/row
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
    // TODO: implement
    if (this.moved) {
        this.x = this.col * colWidth;
        this.y = this.row * rowHeight;
        this.moved = false;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
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
    console.log("Key pressed: " + key);
    this.move(key);
};

// Move player by 1 row/col
Player.prototype.move = function(direction) {
    if (direction === "left") {
        if (this.x < colWidth) {
            console.log("Player not allowed to move off screen");
        } else {
            this.col -= 1;
        }
    } else if (direction === "up") {
        if (this.y < rowHeight) {
            console.log("Player not allowed to move off screen");
        } else {
            this.row -= 1;
        }
    } else if (direction === "right") {
        if (this.x >= boundaryRight-colWidth) {
            console.log("Player not allowed to move off screen");
        } else {
            this.col += 1;
        }
    } else if (direction === "down") {
        if (this.y >= boundaryBottom-rowHeight) {
            console.log("Player not allowed to move off screen");
        } else {
            this.row += 1;
        }
    }
    this.moved = true;
    console.log("Moved to x=" + this.x + " and y=" + this.y);
};

// Reset the player to its initial state
Player.prototype.reset = function() {
    // Set the player's initial col/row
    this.col = initialPlayerCol;
    this.row = initialPlayerRow;

    // Set location based on col/row
    this.x = this.col * colWidth;
    this.y = this.row * rowHeight;
};



// HUD to project game-status (and for debugging)
var Hud = function() {
};

Hud.prototype.render = function() {
    if (debug) {
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
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
