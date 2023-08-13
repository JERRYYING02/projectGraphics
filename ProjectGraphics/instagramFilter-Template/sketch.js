// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;

var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];

// Define filter modes
const FILTER_SEPIA = 0;
const FILTER_GRAYSCALE = 1;
const FILTER_NEGATIVE = 2;
let filterMode = FILTER_SEPIA;

/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
    // Draw text to guide changing filterMode
    textSize(25);
    fill(255);
    text("Press s(sepia),g(grayscale),n(negative) to change filter mode", width / 1.9, height - 20);
}
/////////////////////////////////////////////////////////////////

function mousePressed() {
    // remove the loop ,only filteredImage is show on the right side 
    // this can adjust the radial blur position
    var filteredImage = earlyBirdFilter(imgIn);
    image(filteredImage, imgIn.width, 0);
}

function earlyBirdFilter(img) {
    var resultImg = createImage(img.width, img.height);
    //copy a new resultImg and add earlybirdfilter to it
    
    resultImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    resultImg = sepiaFilter(resultImg);
    resultImg = darkCorners(resultImg);
    resultImg = radialBlurFilter(resultImg);
    resultImg = applyFilterEffect(resultImg);
    resultImg = borderFilter(resultImg);
    return resultImg;
}

function sepiaFilter(img) {
  img.loadPixels(); //Load pixel data for image
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var index = (x + y * img.width) * 4;
      // get original rgb value of pixel
      var oldRed = img.pixels[index];
      var oldGreen = img.pixels[index + 1];
      var oldBlue = img.pixels[index + 2];

      //insert sepia values
      var newRed = (oldRed * 0.393) + (oldGreen * 0.769) + (oldBlue * 0.189);
      var newGreen = (oldRed * 0.349) + (oldGreen * 0.686) + (oldBlue * 0.168);
      var newBlue = (oldRed * 0.272) + (oldGreen * 0.534) + (oldBlue * 0.131);

      // update the new pixel values constrain in range 0, 255
      img.pixels[index] = constrain(newRed, 0, 255);
      img.pixels[index + 1] = constrain(newGreen, 0, 255);
      img.pixels[index + 2] = constrain(newBlue, 0, 255);
    }
  }
  img.updatePixels();
  return img;
}


function darkCorners(img) {
  var center_x = img.width / 2;
  var center_y = img.height / 2;
  img.loadPixels();
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x< img.width; x++) {
      var index = (x + y * img.width) * 4;
      var distance = dist(center_x, center_y, x, y);
      var dynLum = 1.0; // the default luminosity scale factor

      if (distance >= 300 && distance < 450) {
        dynLum = map(distance, 300, 450, 1.0, 0.4);
      } else if (distance >= 450) {
        dynLum = map(distance, 450, img.width, 0.4, 0);
      }

      dynLum = constrain(dynLum, 0, 1); // dynLum stays between 0 and 1
      //set the rgb value
      img.pixels[index] *= dynLum; 
      img.pixels[index + 1] *= dynLum; 
      img.pixels[index + 2] *= dynLum; 
    }
  }
  img.updatePixels();
  return img;
}





function radialBlurFilter(img) {
  var center_x = mouseX; // mouseX as center of radial blur
  var center_y = mouseY; // mouseY as center of radial blur
  img.loadPixels();

  for (var y = 0; y < img.height; y++) {
      for (var x = 0; x < img.width; x++) {
          var index = (x + y * img.width) * 4;
          var distance = dist(center_x, center_y, x, y);
          var dynBlur = 1.0; // default blur scale factor

          if (distance >= 100 && distance < 300) {
              dynBlur = map(distance, 100, 300, 0, 1);
          } else if (distance >= 300) {
              dynBlur = 0;
          }

          dynBlur = constrain(dynBlur, 0, 1); // ensure dynBlur between 0 and 1

          var r = img.pixels[index];
          var g = img.pixels[index + 1];
          var b = img.pixels[index + 2];

          var c = convolution(x, y, matrix, matrix.length, img);

          img.pixels[index] = c[0] * dynBlur + r * (1 - dynBlur);
          img.pixels[index + 1] = c[1] * dynBlur + g * (1 - dynBlur);
          img.pixels[index + 2] = c[2] * dynBlur + b * (1 - dynBlur);
      }
  }
  img.updatePixels();
  return img;
}



/////////////////////////////////////////////////////////////////////////
function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0.0;
  var totalGreen = 0.0;
  var totalBlue = 0.0;
  var offset = floor(matrixSize / 2);

  // convolution matrix loop
  for (var i = 0; i < matrixSize; i++) {
      for (var j = 0; j < matrixSize; j++) {
          // Get pixel loc within convolution matrix
          var xloc = x + i - offset;
          var yloc = y + j - offset;
          var index = (xloc + img.width * yloc) * 4;
          // ensure we don't address a pixel that doesn't exist
          index = constrain(index, 0, img.pixels.length - 1);

          // multiply all values with the mask and sum up
          totalRed += img.pixels[index + 0] * matrix[i][j];
          totalGreen += img.pixels[index + 1] * matrix[i][j];
          totalBlue += img.pixels[index + 2] * matrix[i][j];
      }
  }
  // return the new color
  return [totalRed, totalGreen, totalBlue];
}



function borderFilter(img) {
  var buffer = createGraphics(img.width, img.height);
  buffer.image(img, 0, 0);

  // draw a rectangle with round corners 
  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(20);
  var cornerRadius = 40;
  buffer.rect(0, 0, img.width, img.height, cornerRadius, cornerRadius);

  // draw another rectangle without round corners and larger strokeWeight to remove little triangles
  buffer.strokeWeight(10);
  buffer.rect(0, 0, img.width, img.height);

  return buffer;
}


function applyFilterEffect(img) {
  // different filter effects based on filterMode
  switch (filterMode) {
      case FILTER_SEPIA:
          img = sepiaFilter(img);
          break;
      case FILTER_GRAYSCALE:
          img = grayscaleFilter(img);
          break;
      case FILTER_NEGATIVE:
          img = negativeFilter(img);
          break;
  }
  return img;
}

function grayscaleFilter(img) {
  img.loadPixels();
  for (var y = 0; y < img.height; y++) {
      for (var x = 0; x < img.width; x++) {
          var index = (x + y * img.width) * 4;
          var r = img.pixels[index];
          var g = img.pixels[index + 1];
          var b = img.pixels[index + 2];
          var gray = (r + g + b) / 3;
          img.pixels[index] = gray;
          img.pixels[index + 1] = gray;
          img.pixels[index + 2] = gray;
      }
  }
  img.updatePixels();
  return img;
}

function negativeFilter(img) {
  img.loadPixels();
  for (var y = 0; y < img.height; y++) {
      for (var x = 0; x < img.width; x++) {
          var index = (x + y * img.width) * 4;
          img.pixels[index] = 255 - img.pixels[index];
          img.pixels[index + 1] = 255 - img.pixels[index + 1];
          img.pixels[index + 2] = 255 - img.pixels[index + 2];
      }
  }
  img.updatePixels();
  return img;
}

function keyPressed() {
  // Change filter mode based on key press
  if (key === 's') {
      filterMode = FILTER_SEPIA;
  } else if (key === 'g') {
      filterMode = FILTER_GRAYSCALE;
  } else if (key === 'n') {
      filterMode = FILTER_NEGATIVE;
  }
  redraw(); // Redraw canvas 
}