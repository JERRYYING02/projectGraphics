let phaseSpeed = 1.2; // controls the speed of the wave movement


function setup()
{
    createCanvas(500, 500);
   
}

function draw()
{
    background(0);

    var noOfDots = 20;
    var size = width/noOfDots;

    for (var x = 0; x < noOfDots; x++)
    {
      for (var y = 0; y < noOfDots; y++)
      {
        // your code here
        var xPos = x * size + size / 2;
        var yPos = y * size + size / 2;
        //draw random color 
        var noiseValue = noise(xPos * 0.01, yPos * 0.01);
        var dotColor = color(0, noiseValue * 250, random(100,150));
        wave(xPos, yPos, size, dotColor);// replace params with the necessary parameters
        
      }
    }
}



function wave(x, y, size, dotColor, noiseValue) {
  // Calculate the phase with the horizontal mouse position
  var phase = map(mouseX, 0, width, 100, 300);

  phase += frameCount * phaseSpeed*0.3; // increase the phase with time for faster movement
  var amplitudeX = size*3; // increase the amplitude for a larger offset in x-axis
  var amplitudeY = size*3; // increase the amplitude for a larger offset in y-axis

  var angle = (x + y) * 0.2 + phase*5; // angle affects dot's position and phase
  // offset amplitude with noise
  var yOffset = map(noise(angle * 0.01), 0, 1, -amplitudeY, amplitudeY);
  var xOffset = map(noise(angle * 0.01), 0, 1, -amplitudeX, amplitudeX);

  var newX = x + xOffset ; //move away from original position
  var newY = y + yOffset ;

  push(); 
  translate(newX, newY); // move the origin to the new position
  rotate(angle); // rotate the ellipse based on the angle
  fill(dotColor);
  
  ellipse(0, 0, size / 2, size / 2); 

  pop(); 
}




