// y values for placing enemies
var enemyRows = [61, 144, 226];

// superclass for Enemy and Player
var Actor = function(h, w, xa, ya, img) {
  // for placement/movement of actors
  this.x = 0;
  this.y = 0;

  // define visible actor size for collision detection
  this.height = h;
  this.width = w;

  // store position offset within actor png, also for collision detection
  this.xOffset = xa;
  this.yOffset = ya;

  // store image path
  this.sprite = img;
};

// Draw the actor on the screen, required method for game
Actor.prototype.render  = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// detect collision with another actor
Actor.prototype.detectCollision = function(otherActor) {
  return (
    this.x + this.xOffset < otherActor.x + otherActor.xOffset + otherActor.width &&
    this.x + this.xOffset + this.width > otherActor.x + otherActor.xOffset &&
    this.y + this.yOffset < otherActor.y + otherActor.yOffset + otherActor.height &&
    this.height + this.y + this.yOffset > otherActor.y + otherActor.yOffset
  );
};

// helper function for generating random ints within a given range
var randomRange = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    Actor.call(this, 73, 101, 0, 73, 'images/enemy-bug.png');

    // initialize position and speed
    this.reset();

};
Enemy.prototype = Object.create(Actor.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.move(dt);
    this.handleCollision();
    if (this.x > 505) this.reset();
};
// adjsut enemy's position according to speed and dt
Enemy.prototype.move = function(dt) {
  this.x += (this.speed  * dt);
};
// reset player if collision detected
Enemy.prototype.handleCollision = function() {
  if (this.detectCollision(player)) {
    //console.log({enemyX: this.x, playerX: player.x, enemyY: this.y, playerY: player.y});
    player.reset();
  }
};
// set random starting position and speed
Enemy.prototype.reset = function() {
  this.x = -100;
  this.y = enemyRows[randomRange(0,2)];
  this.speed = randomRange(100,400);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  Actor.call(this, 84, 74, 14, 60, 'images/char-boy.png');

  // delta x and y values
  this.dx = 0;
  this.dy = 0;

  // set player starting position
  this.reset();
};
Player.prototype = Object.create(Actor.prototype);
Player.prototype.constructor = Player;
// update player's attributes
Player.prototype.update = function() {
  this.move();
  // y == -15 corresponds to the player reaching the water
  if (this.y == -15) this.reset();
};
// adjust player's position based on stored input
Player.prototype.move = function() {
  //console.log({x: this.x, y: this.y, dx: this.dx, dy: this.dy});
  this.x += (this.dx);
  this.y += (this.dy);

  // reset deltas
  this.dx = 0;
  this.dy = 0;
};
// set player to starting position
Player.prototype.reset = function() {
  this.x = 201;
  this.y = 400;
};
// update deltas so movement can be executed by game loop
Player.prototype.handleInput = function(keyCode) {
  switch (keyCode) {
    case 'left':
      if (this.x > 1) this.dx -= 100;
      break;
    case 'right':
      if (this.x < 401) this.dx += 100;
      break;
    case 'up':
      if (this.y > -15) this.dy -= 83;
      break;
    case 'down':
      if (this.y < 400) this.dy += 83;
      break;
    default:

  }
  //console.log({x: this.x + this.dx, y: this.y + this.dy});
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var countEnemies = 3;
for (var i = 0; i < countEnemies; i++) {
  allEnemies.push(new Enemy());
}
var player = new Player();

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
