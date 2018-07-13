// Enemies our player must avoid
var Enemy = function() {
    
    //TODO: Update Enemy to ensure proper functionality in a Frogger like game.
    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//TODO: Create Player class to ensure proper functionality in a Frogger like game.

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//TODO: Create Player class methods (update, render, and handleInput) to ensure proper functionality in a Frogger like game.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//TODO: Create instances for Enemy and Player classes to ensure proper functionality in a Frogger like game.

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
