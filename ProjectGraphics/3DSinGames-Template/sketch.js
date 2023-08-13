let confLocs = []; // Array to store confetti locations
let confTheta = []; // Array to store confetti angles

let boxHeightSlider;
let sineSpeedSlider;

function setup() {
  createCanvas(800, 800, WEBGL);

  // Generate confetti locations and angles
  for (let i = 0; i < 200; i++) {
    // Generate random location vector
    let x = random(-500, 500);
    let y = random(-800, 0);
    let z = random(-500, 500);
    let loc = createVector(x, y, z);
    confLocs.push(loc);

    // Generate random angle
    let theta = random(0, 160);
    confTheta.push(theta);
  }

  // Create sliders
  boxHeightSlider = createSlider(100, 200, 150); 
  boxHeightSlider.position(10, 10);

  sineSpeedSlider = createSlider(0.01, 0.05, 0.025, 0.01); 
  sineSpeedSlider.position(10, 30);
}

function draw() {
  background(220);
  normalMaterial();
  noStroke();
  strokeWeight(2);
  // Calculate camera position on a circular path
  let radius = 1000; // Radius of the circular path
  let camX = radius * cos(frameCount * 0.005);
  let camY = -600;
  let camZ = radius * sin(frameCount * 0.005);

  // Set camera position
  camera(camX, camY, camZ);
  // Point camera at the center of the scene
  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);

  // Set box size
  let boxSize = 50;

  // Get dynamic values from sliders
  let boxHeight = boxHeightSlider.value();
  let sineSpeed = sineSpeedSlider.value();

  // Draw boxes
  for (let x = -400; x <= 400; x += boxSize) {
    for (let z = -400; z <= 400; z += boxSize) {
      push(); // Save current transformation matrix

      // Calculate distance from center
      let distance = dist(x, z, 0, 0);
      let animatedDistance = distance + frameCount * 2;

      // Calculate length using sin function
      let length = map(sin(animatedDistance * sineSpeed), -1, 1, 100, boxHeight);

      // Translate to box position
      translate(x, 0, z);
      // Set box properties

      // Set box height based on length
      box(boxSize, length, boxSize);

      pop(); // Restore previous transformation matrix
    }
  }

  // Draw confetti
  confetti();
}

function confetti() {
  for (let i = 0; i < confLocs.length; i++) {
    push(); // Save current transformation matrix

    // Get confetti location and angle
    let loc = confLocs[i];
    let theta = confTheta[i];

    // Translate to confetti location
    translate(loc.x, loc.y, loc.z);
    // Rotate by confetti angle
    rotateX(radians(theta));

    // Draw confetti plane
    fill(random(255), random(255), random(255));
    plane(15, 15);

    // Update confetti position and rotation
    loc.y += 1; // Move confetti downwards
    theta += 10; // Rotate confetti

    // Check if confetti reached the middle of the coordinate system
    if (loc.y > 0) {
      loc.y = -800; // Reset confetti to the top
    }

    // Update confetti values in arrays
    confLocs[i] = loc;
    confTheta[i] = theta;

    pop(); // Restore previous transformation matrix
  }
}
