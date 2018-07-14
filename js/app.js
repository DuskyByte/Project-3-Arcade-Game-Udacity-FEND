//TODO: Research ES6 classes and impliment.
//TODO: Collapse classes into a main class and subclasses.
//TODO: Have the correct subclasses inherit from the correct classes.
//TODO: Add other functionalities like gems, scores, levels, etc...
let Enemy = function() {    
    //Stores the current row and column on board. Starting for all Enemies should be center brick row just off screen
    this.currentLocation = [-1, 2];
    //Calculates drawing point for the sprite using currentLocation.
    this.x = (this.currentLocation[0] * 101);
    this.y = ((this.currentLocation[1] * 83) - 20);
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    //Prevents Enemies from scrolling off into eternity.
    if (this.currentLocation[0] >= 5) {
        this.currentLocation[0] = -1;
    }
    //Updates currentLocation based on delta time and speed of Enemy.
    //TODO: Add ability for different enemy sprites has different speeds.
    this.currentLocation[0] = this.currentLocation[0] + dt;
    //Updates x coordinates based on currentLocation.
    this.x = (this.currentLocation[0] * 101);
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function() {
    //Stores the current row and column on board.
    this.currentLocation = [2, 5];
    //Calculates drawing point for the sprite using currentLocation.
    this.x = (this.currentLocation[0] * 101);
    this.y = ((this.currentLocation[1] * 83) - 10);
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    //Updates x and y coordinates based on currentLocation.
    this.x = (this.currentLocation[0] * 101);
    this.y = ((this.currentLocation[1] * 83) - 10);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    if (input === 'left' && this.currentLocation[0] > 0) {
        this.currentLocation[0]--;
    }
    if (input === 'right' && this.currentLocation[0] < 4) {
        this.currentLocation[0]++;
    }
    if (input === 'up' && this.currentLocation[1] > 0) {
        this.currentLocation[1]--;
    }
    if (input === 'down' && this.currentLocation[1] < 5) {
        this.currentLocation[1]++;
    }
};

//TODO: Add functionality for additional Enemies to be added, based on difficulty.
let allEnemies = [new Enemy];
let player = new Player;

//Detects key presses to be sent to handleInput function.
document.addEventListener('keyup', function(input) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[input.keyCode]);
});

function checkCollisions() {
    //Checks if player is touching an Enemy.
    if ((player.y - 10) === (allEnemies[0].y)) {
        if((player.x) < (allEnemies[0].x + 81.81) && (player.x) > (allEnemies[0].x - 79.99)) {
            player.currentLocation = [2, 5];
        }
    }
    //Checks if player is in the water.
    if (player.currentLocation[1] === 0) {
        player.currentLocation = [2, 5];
    }
}