# Breakout on a Curve

[Breakout on a Curve](https://curved-breakout.herokuapp.com) is a twist to the old classic Breakout game with a semicircular paddle.

![Game Screenshot](game-screenshot.png)

## Gameplay
The goal of Breakout on a Curve is to clear all the bricks while keeping the ball from hitting the bottom of the game screen before running out of lives.

The player can control the movement of the paddle by moving the mouse left and right.  With the semicircular paddle, as opposed to a regular, rectangular paddle, the angle of the incoming ball and its point of contact with the paddle together determine the direction of the ball after collision with the paddle.  Thus, the player can utilize the circular surface of the paddle to gain a greater control of the ball's movement.

## Features
### Semicircular Paddle Reflection Logic
```javascript
    const distX = ball.x - paddle.x;
    const distY = ball.y - paddle.y;
    const dx = ball.dx;
    const dy = -1 * ball.dy;

    let dxNew = ((-1 / Math.pow(dist, 2)) * ((Math.pow(distX, 2) - Math.pow(distY, 2)) * dx - (2 * distX * distY * dy)));
    let dyNew = ((1 / Math.pow(dist, 2)) * ((Math.pow(distY, 2) - Math.pow(distX, 2)) * dy - (2 * distX * distY * dx)));
```

### Adjustment for Better Gameplay

### MVP
In Breakout, users will be able to:
* Start, pause, and reset the game
* Use cursor to move paddle horizontally
* Lose the round after a certain number of tries
* Level up after successful completion of each round

### Technologies, Libraries, APIs
This project will be implemented with the technologies listed below:
* JavaScript
* CanvasJS with HTML5

The scripts involved in this project in addition to the entry file will be:
* board.js:  This script will contain functions necessary for rendering and updating Canvas elements.
* paddle.js: This sctript will contain the constructor and functions related to the paddle.
* ball.js:  This script will contain the contructor and functions related to the ball.
* block.js:  This script will contain the constructor and functions related to each brick on in the level.

### Wireframes
The game will be a screen with the game board, along with game controls that allow the user to start, pause, and reset the game setup on the top of the screen.  There will also be nav links to my GitHub and LinkedIn next to the game controls.

### Implementation Timeline
* Day 1:  Get project set up, with a basic entry file and script files. Get practice with and learn basics of CanvasJS.
* Day 2:  Begin constructing the logic and the rendering of the game.
* Day 3:  Complete logic and rendering of the game.  Add user controls for start, pause, and reset.  
