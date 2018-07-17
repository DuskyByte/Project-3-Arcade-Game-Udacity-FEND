//TODO: Add other functionalities like gems, scores, levels, etc...

//Vechile class (All sprites on screen that can be interacted with.)
class Vechile {
    constructor(image, startingLocation) {
        this.sprite = 'images/' + image + '.png';
        this.currentLocation = startingLocation;
        this.x = (this.currentLocation[0] * 101);
        this.y = ((this.currentLocation[1] * 83) - 40);
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
                this.currentLocation[0] = -2;
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
    constructor(image, startingLocation, fullControl) {
        super(image, startingLocation);
        this.fullControl = fullControl;
        this.update = function(dt) {
            //Updates x and y coordinates based on currentLocation.
            this.x = (this.currentLocation[0] * 101);
            this.y = ((this.currentLocation[1] * 83) - 40);
        };
        this.handleInput = function(input) {
            if (this.fullControl === false) {
                if (input === 'space') {
                    player = allPlayers[this.currentLocation[0]];
                    player.currentLocation = [2, 5];
                    allPlayers = [];
                    conditionScreen = false;
                    gameStart.next();
                };
            };
            if (input === 'left' && this.currentLocation[0] > 0) {
                this.currentLocation[0]--;
            };
            if (input === 'right' && this.currentLocation[0] < 4) {
                this.currentLocation[0]++;
            };
            if (this.fullControl === true) {
                if (input === 'up' && this.currentLocation[1] > 0) {
                    this.currentLocation[1]--;
                };
                if (input === 'down' && this.currentLocation[1] < 5) {
                    this.currentLocation[1]++;
                };
            };
        };
    };
};

//Builds Game, allowing for character selection.
function* buildGame() {
    buildPlayers();
    yield 
    buildEnemies();
};

//Builds a select number of Enemy sprites in an even spread across rows (Default: 3)
function buildEnemies(difficulty = 3) {
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

//Adds an Enemy to the allEnemies array. (Default: randomly asigns Enemies to rows.)
function addEnemy(row = Math.floor((Math.random() * 3) + 1)) {
    let speed = ((Math.random() * 3) + 1);
    allEnemies.push(new Enemy('enemy-bug', [-2, row], speed));
};

function buildPlayers() {
    let playerSprites = ['char-boy', 'char-cat-girl', 'char-horn-girl', 'char-pink-girl', 'char-princess-girl'];
    let location = 0;
    playerSprites.forEach(function(sprite) {
        allPlayers.push(new Player(sprite, [location, 3], true));
        location++;
    });
};

//Checks for... yep, collisions. Also, allows for losing and winning conditions.
function checkCollisions() {
    //Checks if player is touching an Enemy (Lost)
    allEnemies.forEach(function(enemy) {
        let tolerance = 58;
        if ((player.y) === (enemy.y)) {
            if((player.x) < (enemy.x + tolerance) && (player.x) > (enemy.x - tolerance)) {
                player.currentLocation = [2, 5];
            };
        };
    });
    //Checks if an Enemy is touching another Enemy and swaps their speed. (Null)
    allEnemies.forEach(function(enemy1) {
        allEnemies.forEach(function(enemy2) {
            if (!(enemy1 === enemy2)) {
                if ((enemy1.currentLocation[1]) === (enemy2.currentLocation[1])) {
                    if((enemy1.currentLocation[0]) >= (enemy2.currentLocation[0] - 1.1) && (enemy1.currentLocation[0]) <= (enemy2.currentLocation[0])) {
                        if (enemy1.speed > enemy2.speed) {
                            [enemy1.speed, enemy2.speed] = [enemy2.speed, enemy1.speed];
                        };
                    };
                };
            };
        });
    });
    //Checks if player is in the water (Won)
    if (player.currentLocation[1] === 0) {
        player.currentLocation = [2, 5];
        addEnemy();
    };
};

//Detects key presses to be sent to Player's handleInput function.
document.addEventListener('keyup', function(input) {
    const allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[input.keyCode]);
});

let conditionScreen = true;
let player = new Player('Selector', [2, 3], false);
let allPlayers = [];
let allEnemies = [];
let gameStart = buildGame();
gameStart.next();