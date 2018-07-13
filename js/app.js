// Enemies our player must avoid
var Enemy = function() {
    
    //TODO: Update Enemy to ensure proper functionality in a Frogger like game.
    
    //Stores the current row and column on board. Starting for all Enemies should be center brick row just off screen
    this.currentLocation = [2, -1];
    //Calculates drawing point for the sprite using currentLocation.
    this.y = ((this.currentLocation[0] * 83) - 20);
    this.x = (this.currentLocation[1] * 101);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    //TODO: Update Enemy method to ensure proper functionality in a Frogger like game.
    
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//TODO: Create Player class to ensure proper functionality in a Frogger like game.

var Player = function() {
    //Stores the current row and column on board.
    this.currentLocation = [5, 2];
    //Calculates drawing point for the sprite using currentLocation.
    this.y = ((this.currentLocation[0] * 83) - 10);
    this.x = (this.currentLocation[1] * 101);
    this.sprite = 'images/char-boy.png';
};

//TODO: Create Player class methods (update, render, and handleInput) to ensure proper functionality in a Frogger like game.

Player.prototype.update = function(dt) {
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dt) {
    if (dt === 'up' && this.currentLocation[0] > 0) {
        this.currentLocation[0]--;
    }
    if (dt === 'down' && this.currentLocation[0] < 5) {
        this.currentLocation[0]++;
    }
    if (dt === 'left' && this.currentLocation[1] > 0) {
        this.currentLocation[1]--;
    }
    if (dt === 'right' && this.currentLocation[1] < 4) {
        this.currentLocation[1]++;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//TODO: Create instances for Enemy and Player classes to ensure proper functionality in a Frogger like game.

var allEnemies = [new Enemy];
var player = new Player;

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
