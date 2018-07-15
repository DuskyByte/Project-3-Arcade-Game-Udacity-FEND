//TODO: Add other functionalities like gems, scores, levels, etc...

//Vechile class (All sprites on screen that can be interacted with.)
class Vechile {
    constructor(image, startingLocation) {
        this.sprite = 'images/' + image + '.png';
        this.currentLocation = startingLocation;
        this.x = (this.currentLocation[0] * 101);
        this.y = ((this.currentLocation[1] * 83) - 30);
        //Renders the sprite.
        this.render = function() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        };
    };
};

//Enemy subclass (All sprites that damage the player, WANT TO AVOID!!!)
class Enemy extends Vechile {
    constructor(image, startingLocation, speed) {
        super(image, startingLocation);
        this.speed = speed;
        //Updates the position of Enemy sprites.
        this.update = function(dt) {
            //Prevents moving Vechile from scrolling off into eternity.
            if (this.currentLocation[0] >= 5) {
                this.currentLocation[0] = -1;
            };
            //Updates currentLocation based on delta time and speed of Vechile.
            this.currentLocation[0] = this.currentLocation[0] + (dt * this.speed);
            //Updates the x coordinate based on currentLocation.
            this.x = (this.currentLocation[0] * 101);
        };
    };
};

//Player subclass (The sprite that the player is able to move, to interact with the game.)
class Player extends Vechile {
    constructor(image, startingLocation) {
        super(image, startingLocation);
        this.update = function(dt) {
            //Updates x and y coordinates based on currentLocation.
            this.x = (this.currentLocation[0] * 101);
            this.y = ((this.currentLocation[1] * 83) - 30);
        };
        this.handleInput = function(input) {
            if (input === 'left' && this.currentLocation[0] > 0) {
                this.currentLocation[0]--;
            };
            if (input === 'right' && this.currentLocation[0] < 4) {
                this.currentLocation[0]++;
            };
            if (input === 'up' && this.currentLocation[1] > 0) {
                this.currentLocation[1]--;
            };
            if (input === 'down' && this.currentLocation[1] < 5) {
                this.currentLocation[1]++;
            };
        };
    };
};

//Builds Enemy a number of sprites (Default: 3)
function build(difficulty = 3) {
    let row;
    while (difficulty > 0) {
        if (row < 3) {
            row++;
        } else {
            row = 1;
        };
        addEnemy(row);
        difficulty--;
    };
};

//Adds an Enemy to the allEnemies array.
function addEnemy(row = Math.floor((Math.random() * 3) + 1)) {
    let speed = ((Math.random() * 3) + 1);
    allEnemies.push(new Enemy('enemy-bug', [-1, row], speed));
};

//Checks for... yep, collisions. Also, allows for losing and winning conditions.
function checkCollisions() {
    //Checks if player is touching an Enemy (Lost)
    allEnemies.forEach(function(enemy) {
        if ((player.y) === (enemy.y)) {
            if((player.x) < (enemy.x + 58) && (player.x) > (enemy.x - 58)) {
                player.currentLocation = [2, 5];
            };
        };
    });
    //Checks if player is in the water (Win)
    if (player.currentLocation[1] === 0) {
        player.currentLocation = [2, 5];
        addEnemy();
    };
};

//Detects key presses to be sent to Player's handleInput function.
document.addEventListener('keyup', function(input) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[input.keyCode]);
});

let allEnemies = [];
build();
let player = new Player('char-boy', [2, 5]);
