// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;

//setup countdown and gameRunning status variables
var countdown = 60; 
var countdownSpeed = 25;
var gameRunning = true; 

////////////////////////////////////////////////////////////
function setup() {

  totalBoxes = boxes.length;
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();

}


//Game over and victory function 
function gameOver() 
{ 
  fill(255, 0, 0);
  textSize(50);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
}

function victory() {
  fill(0, 255, 0);
  textSize(50);
  textAlign(CENTER);
  text("VICTORY!", width / 2, height / 2);
}

////////////////////////////////////////////////////////////
function draw() {

  //set framerate to prevent lagging
  frameRate(60);
  background(0);

  Engine.update(engine);

  drawGround();

  drawPropeller();

  drawTower();

  drawBirds();

  drawSlingshot();

  //remove box from array boxes when isOffScreen
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    if (isOffScreen(box)) {
      removeFromWorld(box);
      boxes.splice(i, 1);
      i--; 
    }
  }

  // Update the countdown timer
  if (gameRunning=true) 
  { 
    //only if countdown is larger than o then we decrement counter(prevent continuous operation)
    if(countdown>0)
    { 
      // Divide by countdownSpeed to control the speed
      countdown -= 1 / countdownSpeed; 
    }
    
    //when boxes length is 0 then victory function called
    if (countdown < 0) 
    {
      gameRunning = false;
      gameOver();
    }
    else if (boxes.length === 0 && countdown>0) 
    {
      gameRunning = false;
      victory();
    }
  }

  //draw the coundown timer
  if(gameRunning)
  {
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text("Time Left: " + Math.ceil(countdown), width / 2, 30);
  }

  //draw instruction
    fill(255);
    textSize(15);
    textAlign(CENTER);
    text("Press R to reset slingshot",width/2,50);
    text("Press B to release ball",width/2,70);
    text("Press right arrow to move propeller",width/2,90);

}

////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    angleSpeed += 0.01; // Increment angle speed
  } else if (keyCode === RIGHT_ARROW) {
    angleSpeed -= 0.01; // Decrement angle speed
  }
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);  

  
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
