let game = true;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.height = 65;
    this.width = 95;
    this.collision = false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > ctx.canvas.width + this.width) {
        this.x = -200 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += 150 * dt;
    }

    if (collision(player.x, player.y, player.width,player.height, this.x, this.y, this.width, this.height)){
        this.collision = true;
        // resetting our player's position to the starting box if there's collision
        if (player) {
            player.x = 202;
            player.y = 400;

        } else {
            this.collision = false
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y, sprite) {
    this.x = x; 
    this.y = y;
    this.sprite = sprite;
    this.height = 75;
    this.width = 65;
}
Player.prototype.update = function(dt) {
    if (game && player.y < 40){
        game = false;
        won();
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// handling movements of the player , and at the same time making sure the player can't go off the screen.
Player.prototype.handleInput = function(direction) {
    const horizontal = 101;
    vertical = 83;
    if ( direction === 'left' && this.x - horizontal >= 0){
        this.x -= horizontal;

    } else if (direction === 'right' && this.x + horizontal < ctx.canvas.width){
        this.x += horizontal;

    } else if(direction === 'down' && this.y + vertical < ctx.canvas.height - 200){
        this.y += vertical;

    } else if(direction === 'up' && this.y - vertical > 0 - player.height){
        this.y -= vertical;

    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
const enemyPosition = [55, 140,230]
const player = new Player(202,400, 'images/char-princess-girl.png');

let allEnemies = enemyPosition.map((y, index) => {
return new Enemy( (-200 * (index +1)), y);
});

// checking for collision by checking for the enemies x and y in relevance to the player sprite
function collision(px,py,pw,ph,ex,ey,ew,eh) {

    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh)
}

// The Modal that will appear when the game is won
function modal() {
    let myModal = document.querySelector('.modal__background');
    myModal.classList.remove('hide');
    function replay(){
        let replayBtn = document.querySelector('.modal__replay');
        replayBtn.addEventListener('click', function() {
            myModal.classList.add('hide');
            allEnemies = enemyPosition.map((y, index) => {
                return new Enemy( (-200 * (index +1)), y);
                });
                game = true;                
            player.x = 202;
            player.y = 400;
        })
    }
    replay();

    function cancel() {
        let cancelBtn = document.querySelector('.modal__cancel');
        cancelBtn.addEventListener('click', function(){
            myModal.classList.add('hide');
        });
    }
    cancel();


}
// the function for winning the game
function won() {
    reset();
    modal()
}
function reset() {
allEnemies = [];
}