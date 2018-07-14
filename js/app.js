//TODO: Add collision detection and winning conditions.
//TODO: Research ES6 classes and impliment.
//TODO: Collapse classes into a main class and subclasses.
//TODO: Have the correct subclasses inherit from the correct classes.
//TODO: Add other functionalities like gems, scores, levels, etc...
var Enemy = function() {    
    //Stores the current row and column on board. Starting for all Enemies should be center brick row just off screen
    this.currentLocation = [2, -1];
    //Calculates drawing point for the sprite using currentLocation.
    this.y = ((this.currentLocation[0] * 83) - 20);
    this.x = (this.currentLocation[1] * 101);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    //Prevents Enemies from scrolling off into eternity.
    if (this.currentLocation[1] >= 5) {
        this.currentLocation[1] = -1;
    }
    //Updates currentLocation based on delta time and speed of Enemy.
    //TODO: Add ability for different enemy sprites has different speeds.
    this.currentLocation[1] = this.currentLocation[1] + dt;
    //Updates x coordinates based on currentLocation.
    this.x = (this.currentLocation[1] * 101);
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    //Stores the current row and column on board.
    this.currentLocation = [5, 2];
    //Calculates drawing point for the sprite using currentLocation.
    this.y = ((this.currentLocation[0] * 83) - 10);
    this.x = (this.currentLocation[1] * 101);
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    //Updates x and y coordinates based on currentLocation.
    this.y = ((this.currentLocation[0] * 83) - 10);
    this.x = (this.currentLocation[1] * 101);
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
