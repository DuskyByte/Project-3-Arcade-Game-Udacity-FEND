'use strict';

let conditionScreen = true;
let players = 5;
let won = 1;
let score = 0;
const allPlayers = [];
const allEnemies = [];
let startTime;

//Vechile class (All sprites on screen that can be interacted with.)
class Vechile {
    constructor(image, startingLocation) {
        this.sprite = `images/${image}.png`;
        //This allows the coder to pass in a human readable array of the x and y of the game board.
        this.currentLocation = startingLocation;
        // Then convert it to a machine readable x and y location of the pixels.
        this.x = (this.currentLocation[0] * 101);
        this.y = ((this.currentLocation[1] * 83) - 40);
    }
    //Renders the sprite.
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Enemy subclass (All sprites that damage the player, WANT TO AVOID!!!)
class Enemy extends Vechile {
    constructor(image, startingLocation, speed) {
        super(image, startingLocation);
        this.speed = speed;
    }
    //Updates the position of Enemy sprites.
    update(dt) {
        //Prevents moving Vechile from scrolling off into eternity.
        if (this.currentLocation[0] >= 5) {
            this.currentLocation[0] = -2;
        }
        //Updates currentLocation based on delta time and speed of Vechile.
        this.currentLocation[0] = this.currentLocation[0] + (dt * this.speed);
        //Updates the x coordinate based on currentLocation.
        this.x = (this.currentLocation[0] * 101);
    }
}

/*Special subclass (All sprites that gives the players points or special abilities.)
 *TODO: Add functionality for Gems, Rock, and Key.
  *class Special extends Vechile {
  *    constuctor(image, startingLocation) {
  *        super(image, startingLocation);
  *    };
  *};
  */

//Player subclass (The sprite that the player is able to move, to interact with the game.)
class Player extends Vechile {
    constructor(image, startingLocation, fullControl) {
        super(image, startingLocation);
        this.fullControl = fullControl;
    }
    //Checks for... yep, collisions. Also, allows for losing and winning conditions.
    checkCollisions() {
        //Checks if player is touching an Enemy and reconfigures canvas to select next character. (Lost)
        let tempY = this.y;
        let tempX = this.x;
        let tempSprite = this.sprite;
        let tempCurrentLocation = this.currentLocation;
        let tempFullControl = this.fullControl;
        allEnemies.forEach(function(enemy) {
            let tolerance = 58;
            if ((tempY) === (enemy.y)) {
                if((tempX) < (enemy.x + tolerance) && (tempX) > (enemy.x - tolerance)) {
                    conditionScreen = true;
                    tempSprite = 'images/Selector.png';
                    tempCurrentLocation = [2, 5];
                    tempFullControl = false;
                    players--;
                    scoreHandler(100, false, false);
                }
            }
        });
        this.sprite = tempSprite;
        this.currentLocation = tempCurrentLocation;
        this.fullControl = tempFullControl;
        //Checks if player is in the water and reconfigures canvas to select next character. (Won)
        if (this.currentLocation[1] === 0) {
            conditionScreen = true;
            this.sprite = 'images/Selector.png';
            this.currentLocation = [2, 5];
            this.fullControl = false;
            addEnemy();
            players--;
            won++;
            scoreHandler(1000, true, false);
        }
    }
    update() {
        this.checkCollisions();
        //Updates x and y coordinates based on currentLocation.
        this.x = (this.currentLocation[0] * 101);
        this.y = ((this.currentLocation[1] * 83) - 40);
    }
    handleInput(input) {
        if (this.fullControl === false) {
            if (input === 'space') {
                //Forces the selector to change characters only if there is a character to select.
                if (allPlayers[this.currentLocation[0]].fullControl) {
                    //Using the currentLocation array also allows for easy interaction with the allPlayers array.
                    [this.sprite, allPlayers[this.currentLocation[0]].sprite] = [allPlayers[this.currentLocation[0]].sprite, this.sprite];
                    [this.fullControl, allPlayers[this.currentLocation[0]].fullControl] = [allPlayers[this.currentLocation[0]].fullControl, this.fullControl];
                    this.currentLocation = [this.currentLocation[0], 4];
                    conditionScreen = false;
                    gameStart.next();
                }
            }
            if (input === 'left' && this.currentLocation[0] > 0) {
                this.currentLocation[0]--;
            }
            if (input === 'right' && this.currentLocation[0] < 4) {
                this.currentLocation[0]++;
            }
        }
        if (this.fullControl === true) {
            if (input === 'left' && this.currentLocation[0] > 0 && this.currentLocation[1] < 5) {
                this.currentLocation[0]--;
            }
            if (input === 'right' && this.currentLocation[0] < 4 && this.currentLocation[1] < 5) {
                this.currentLocation[0]++;
            }
            if (input === 'up' && this.currentLocation[1] > 0) {
                this.currentLocation[1]--;
            }
            if (input === 'down' && this.currentLocation[1] < 4) {
                this.currentLocation[1]++;
            }
        }
    }
}

let player = new Player('Selector', [2, 5], false);

//Builds Game, allowing for character selection.
function* buildGame() {
    buildPlayers();
    yield;
    startTime = Date.now();
    buildEnemies();
}

//Builds a select number of Enemy sprites in an even spread across rows (Default: 3)
function buildEnemies(difficulty = 3) {
    let row;
    while (difficulty > 0) {
        if (row < 3) {
            row++;
        } else {
            row = 1;
        }
        addEnemy(row);
        difficulty--;
    }
}

//Adds an Enemy to the allEnemies array. (Default: randomly asigns Enemies to rows.)
function addEnemy(row = Math.floor((Math.random() * 3) + 1)) {
    const speed = ((Math.random() * 3) + 1);
    allEnemies.push(new Enemy('enemy-bug', [-2, row], speed));
}

//Builds the player sprites. This allows player to select their character for each life they have.
function buildPlayers() {
    let playerSprites = ['char-boy', 'char-cat-girl', 'char-horn-girl', 'char-pink-girl', 'char-princess-girl'];
    let placeHolder = 0;
    playerSprites.forEach(function(sprite) {
        allPlayers.push(new Player(sprite, [placeHolder, 5], true));
        placeHolder++;
    });
}

//Handles the math for the game score.
function scoreHandler (points, win, final) {
    if (win === true) {
        score += points * won;
    } else {
        score += points;
    }
    if (final === true) {
        score = Math.floor((score - (((Date.now() - startTime) / 1000) * (6 - won))));
        if (score < 0) {
            score = 0;
        }
    }
}

//Formats the time to make it human readable.
function formatTime(time) {
    time = Math.floor(time / 1000);
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
}

//Checks if an Enemy is touching another Enemy and swaps their speed. (Null)
function nicerEnemies() {
    allEnemies.forEach(function(enemy1) {
        allEnemies.forEach(function(enemy2) {
            if ((enemy1 !== enemy2)) {
                if ((enemy1.currentLocation[1]) === (enemy2.currentLocation[1])) {
                    if((enemy1.currentLocation[0]) >= (enemy2.currentLocation[0] - 1.1) && (enemy1.currentLocation[0]) <= (enemy2.currentLocation[0])) {
                        if (enemy1.speed > enemy2.speed) {
                            [enemy1.speed, enemy2.speed] = [enemy2.speed, enemy1.speed];
                        }
                    }
                }
            }
        });
    });
}

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

let gameStart = buildGame();
gameStart.next();
