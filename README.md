frontend-nanodegree-arcade-game
===============================

This is my first attempt at making a game in javascript. The engine and assets were provided by [Udacity](https://www.udacity.com/) as part of the frontend-nanodegree-arcade-game project. I have only modified parts of the app.js file to provide the Actor, Enemy and, Player objects.

# How to play
1. Open index.html
2. Use arrow keys to move
3. Keep away from the giant bugs
4. Jump in the water
5. Repeat...

# About the code
I added this array to make it easier to set the starting y position of enemies in rows
```javascript
var enemyRows = [61, 144, 226];
```

The `detectCollision` method was added to the Actor superclass in case other subclass objects needed to initiate it at any point in the future. Offsets are used to try to make the collisions appear more natural without editing the image resources. The detection algorithm is based on this example from [MDN](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box)
```javascript
Actor.prototype.detectCollision = function(otherActor) {
  return (
    this.x + this.xOffset < otherActor.x + otherActor.xOffset + otherActor.width &&
    this.x + this.xOffset + this.width > otherActor.x + otherActor.xOffset &&
    this.y + this.yOffset < otherActor.y + otherActor.yOffset + otherActor.height &&
    this.height + this.y + this.yOffset > otherActor.y + otherActor.yOffset
  );
};
```

`Player.prototype.handleInput` sets movement deltas that are acted upon in `Player.prototype.move`. `move` is called during the `Player.prototype.update` which ties player movement to the game loop. Example of "Left" movement in the handler:
```javascript
case 'left':
  if (this.x > 1) this.dx -= 100;
  break;
```

# Things to do
1. Make the player avatar interchangeable
2. Add gems and score
3. Change number, direction, and speed range of enemies for subsequent levels
4. Sound would be neat

# License
This software is released under [The Unlicense](http://unlicense.org/).
