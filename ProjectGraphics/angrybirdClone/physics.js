////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here 
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true, angle: angle
  });
  World.add(engine.world, [propeller]);
  
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // Update angle based on angleSpeed
  angle = angle + angleSpeed;
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  fill(128);
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  // your code here
  push();
  for (var i = 0; i < birds.length; i++) {
    var bird = birds[i];

    // Check if the bird is offScreen, remove bird from array
    if (isOffScreen(bird)) {
      removeFromWorld(bird);
      birds.splice(i, 1);
      i--;
    } else {
      fill(255, 0, 0);
      drawVertices(bird.vertices);
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here

  //set correct box size 
  var boxSize = 80;
  var towerHeight = 6;
  var towerWidth = 3;
  var startX = 650;
  var startY = height -(boxSize * towerHeight);

  //draw boxes of random color with their specific x,y coordinates
  for (var i = 0; i < towerHeight; i++) {
    for (var j = 0; j < towerWidth; j++) {
      var x = startX + j * boxSize;
      var y = startY + i * boxSize;
      var box = Bodies.rectangle(x, y, boxSize, boxSize);
      boxes.push(box);
      colors.push(color(random(10, 15), random(100,250), random(150, 200)));
    }
  }
  World.add(engine.world, boxes);

}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here (fill the colors)
  for (var i = 0; i < boxes.length; i++) {
    fill(colors[i]);
    drawVertices(boxes[i].vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
//set correct attributes from marking scheme
  slingshotBird = Bodies.circle(200,300, 20, {
    friction: 0,
    restitution: 0.95
  });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);

  var constraintOptions = {
    pointA: { x: 200, y: 300 },
    bodyB: slingshotBird,
    stiffness: 0.01,
    damping: 0.0001,
  };
  slingshotConstraint = Constraint.create(constraintOptions);

  World.add(engine.world, [slingshotBird, slingshotConstraint]);

}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(255);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
