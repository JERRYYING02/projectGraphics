var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score = 0;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);

 
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements

  //add score
  fill(255);
  textSize(24);
  textAlign(RIGHT);
  text("Score: " + score, width-20, 40);
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
  //spaceship-2-asteroid collisions
  for (var i=0; i<asteroids.locations.length; i++) {
    if (isInside(asteroids.locations[i], asteroids.diams[i], spaceship.location, spaceship.size)) {
      gameOver();
      return;
    }
  }

  //asteroid-2-earth collisions
  for (var i=0; i<asteroids.locations.length; i++) {
    if (isInside(earthLoc, earthSize.x, asteroids.locations[i], asteroids.diams[i])) {
      asteroids.locations.splice(i, 1);
      asteroids.velocities.splice(i, 1);
      asteroids.accelerations.splice(i, 1);
      asteroids.diams.splice(i, 1);
      i--;
    }
  }

  //spaceship-2-earth
  if (isInside(earthLoc, earthSize.x, spaceship.location, spaceship.size)) {
    gameOver();
    return;
  }

  //spaceship-2-atmosphere
  if (isInside(atmosphereLoc, atmosphereSize.x, spaceship.location, spaceship.size)) {
    spaceship.setNearEarth();
  }

  //bullet collisions
  //spaceship bullets-to-asteroid collisions
  for (var i=0; i<spaceship.bulletSys.bullets.length; i++) {
    for (var j=0; j<asteroids.locations.length; j++) {
      if (isInside(asteroids.locations[j], asteroids.diams[j], spaceship.bulletSys.bullets[i], spaceship.bulletSys.diam)) {
        asteroids.destroy(j);
        spaceship.bulletSys.bullets.splice(i, 1);
        score++;
        break;
      }
    }
  }


}


//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B

function isInside(locA, sizeA, locB, sizeB){
  var distance = dist(locA.x, locA.y, locB.x, locB.y);
  var radiiSum = sizeA/2 + sizeB/2;
  if (distance < radiiSum) {
    return true;
  }
  else {
    return false;
  }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
