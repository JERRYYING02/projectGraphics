// var imgs = [];
// var avgImg;
// var numOfImages = 30;

// //////////////////////////////////////////////////////////
// function preload() { // preload() runs once

// }
// //////////////////////////////////////////////////////////
// function setup() {
//     createCanvas(100, 100);
//     pixelDensity(1);
// }
// //////////////////////////////////////////////////////////
// function draw() {
//     background(125);

// }




//my development
// var imgs = [];
// var avgImg;
// var numOfImages = 30;

// //////////////////////////////////////////////////////////
// function preload() { // preload() runs once
//     for (var i = 0; i < numOfImages; i++) {
//         var filename = 'assets/' + i + '.jpg';
//         imgs.push(loadImage(filename));
//         console.log('Loaded: ' + filename);
//     }
// }
// //////////////////////////////////////////////////////////
// function setup() {
//     var firstImg = imgs[0];
//     createCanvas(firstImg.width * 2, firstImg.height);
//     pixelDensity(1);

//     // Draw the first image on the left of the canvas
//     image(imgs[0], 0, 0);
    
//     // Draw a grey area on the right
//     fill(125);
//     rect(firstImg.width, 0, firstImg.width, firstImg.height);
    
//     // Initialize avgImg with createGraphics()
//     avgImg = createGraphics(firstImg.width, firstImg.height);

//     // Call calculateAverage() function to calculate the average image
//     calculateAverage();
// }
// //////////////////////////////////////////////////////////
// function draw() {
//     // Draw the avgImg to the right of the existing image
//     image(avgImg, imgs[0].width, 0);

//     // No need to loop further
//     noLoop();
// }

// function calculateAverage() {
//     // Call loadPixels() on all images in the imgs array
//     for (var i = 0; i < numOfImages; i++) {
//         imgs[i].loadPixels();
//     }

//     // Call loadPixels() on avgImg
//     avgImg.loadPixels();

//     // Nested for-loop to set avgImg pixels to red
//     for (var x = 0; x < avgImg.width; x++) {
//         for (var y = 0; y < avgImg.height; y++) {
//             // Calculate the pixel index for avgImg
//             var index = (x + y * avgImg.width) * 4;

//             // Initialize sum variables to 0 for each channel
//             var sumR = 0;
//             var sumG = 0;
//             var sumB = 0;

//             // Loop through all images and sum up each channel for the pixel
//             for (var i = 0; i < numOfImages; i++) {
//                 var currentImg = imgs[i];
//                 var currentIndex = (x + y * currentImg.width) * 4;

//                 sumR += currentImg.pixels[currentIndex];
//                 sumG += currentImg.pixels[currentIndex + 1];
//                 sumB += currentImg.pixels[currentIndex + 2];
//             }

//             // Calculate the average value for each channel
//             var avgR = sumR / numOfImages;
//             var avgG = sumG / numOfImages;
//             var avgB = sumB / numOfImages;

//             // Update the pixel in avgImg with the average values
//             avgImg.pixels[index] = avgR;
//             avgImg.pixels[index + 1] = avgG;
//             avgImg.pixels[index + 2] = avgB;
//             avgImg.pixels[index + 3] = 255; // Alpha (fully opaque)
//         }
//     }

//     // Update avgImg pixels
//     avgImg.updatePixels();
// }



//CHECK CODE


// var imgs = [];
// var avgImg;
// var numOfImages = 30;
// var currentImgIndex = 0; // initialize index of the current image
// var transitionAmount = 0.0; // initialize transition value between images

// //////////////////////////////////////////////////////////
// function preload() { 
//     // preload() runs once
//     for (var i = 0; i < numOfImages; i++) {
//         var filename = 'assets/' + i + '.jpg';
//         imgs.push(loadImage(filename));
//         console.log('Loaded: ' + filename);
//     }
// }
// //////////////////////////////////////////////////////////
// function setup() {
//     var firstImg = imgs[0];
//     createCanvas(firstImg.width * 2, firstImg.height);
//     pixelDensity(1);

//     // first image on the left side of canvas
//     image(imgs[currentImgIndex], 0, 0);
    
//     //grey area on the right side of canvas
//     fill(125);
//     rect(firstImg.width, 0, firstImg.width, firstImg.height);
    
//     //initialize avgImg together with createGraphics()
//     avgImg = createGraphics(firstImg.width, firstImg.height);

//     //calculate the average image
//     calculateAverage();

//     // Attach mouseMoved() event to the canvas
//     canvas = select('#defaultCanvas0'); // Get the reference to the canvas
//     canvas.mouseMoved(handleMouseMoved);

//     // No need to loop further
//     noLoop();
// }
// //////////////////////////////////////////////////////////
// function draw() {
//     // Calculate the current image using lerp()
//     var currentImg = lerpImage(imgs[currentImgIndex], avgImg, transitionAmount);

//     // Draw the current image on the left of the canvas
//     image(currentImg, imgs[0].width, 0); // Draw on the right side

//     // Draw a grey area on the left
//     fill(125);
//     rect(0, 0, imgs[0].width, imgs[0].height); // Draw on the left side

//     // Draw the avgImg to the left of the selected image
//     image(avgImg, 0, 0);
// }

// //////////////////////////////////////////////////////////
// function calculateAverage() {
//     // Call loadPixels() on all images in the imgs array
//     for (var i = 0; i < numOfImages; i++) {
//         imgs[i].loadPixels();
//     }

//     // Call loadPixels() on avgImg
//     avgImg.loadPixels();

//     // Nested for-loop to calculate the average image
//     for (var x = 0; x < avgImg.width; x++) {
//         for (var y = 0; y < avgImg.height; y++) {
//             // Calculate the pixel index for avgImg
//             var index = (x + y * avgImg.width) * 4;

//             // Initialize sum variables to 0 for each channel
//             var sumR = 0;
//             var sumG = 0;
//             var sumB = 0;

//             // Loop through all images and sum up each channel for the pixel
//             for (var i = 0; i < numOfImages; i++) {
//                 var currentImg = imgs[i];
//                 var currentIndex = (x + y * currentImg.width) * 4;

//                 sumR += currentImg.pixels[currentIndex];
//                 sumG += currentImg.pixels[currentIndex + 1];
//                 sumB += currentImg.pixels[currentIndex + 2];
//             }

//             // Calculate the average value for each channel
//             var avgR = sumR / numOfImages;
//             var avgG = sumG / numOfImages;
//             var avgB = sumB / numOfImages;

//             // Update the pixel in avgImg with the average values
//             avgImg.pixels[index] = avgR;
//             avgImg.pixels[index + 1] = avgG;
//             avgImg.pixels[index + 2] = avgB;
//             avgImg.pixels[index + 3] = 255; // Alpha (fully opaque)
//         }
//     }

//     // Update avgImg pixels
//     avgImg.updatePixels();
// }
// //////////////////////////////////////////////////////////
// function keyPressed() {
//     //select random new image from imgs array
//     currentImgIndex = floor(random(numOfImages));

//     // draw the canvas again with the new selected image
//     drawSelectedImage(currentImgIndex);

//     // restart loop
//     loop();
// }
// //////////////////////////////////////////////////////////
// function handleMouseMoved() {
//     // calculate transition value based on mouseX value
//     transitionAmount = constrain(mouseX / width, 0, 1);

//     // redraw the canvas
//     redraw();
// }

// function lerpImage(imgA, imgB, amt) {
//     // image buffer to hold the resulted image
//     var resultImg = createImage(imgA.width, imgA.height);

//     // load pixels of the input images
//     imgA.loadPixels();
//     imgB.loadPixels();
//     resultImg.loadPixels();

//     // insert the pixels using lerp()
//     for (var i = 0; i < imgA.pixels.length; i++) {
//         resultImg.pixels[i] = lerp(imgA.pixels[i], imgB.pixels[i], amt);
//     }

//     // update resultImg pixels
//     resultImg.updatePixels();

//     return resultImg;
// }

// function drawSelectedImage(index) {
//     // clear canvas
//     clear();

//     // draw selected image on the left side of the canvas
//     image(imgs[index], 0, 0);
    
//     // grey area on the right side
//     fill(125);
//     rect(imgs[0].width, 0, imgs[0].width, imgs[0].height);

//     // draw the avgImg to right side of the selected image
//     image(avgImg, imgs[0].width, 0);
// }




var imgs = [];
var avgImg;
var numOfImages = 30;
var currentImgIndex = 0; // index of currently displayed image
var transitionAmount = 0; // The transition amount for the second image

//////////////////////////////////////////////////////////
function preload() {
    for (var i = 0; i < numOfImages; i++) {
        var filename = 'assets/' + i + '.jpg';
        imgs.push(loadImage(filename));
        console.log('Loaded: ' + filename);
    }
}
//////////////////////////////////////////////////////////
function setup() {
    var firstImg = imgs[currentImgIndex];
    createCanvas(firstImg.width * 2, firstImg.height);
    pixelDensity(1);

    // draw the current image on the left of the canvas
    image(imgs[currentImgIndex], 0, 0);

    // grey area on the right
    fill(125);
    rect(firstImg.width, 0, firstImg.width, firstImg.height);

    // Initialize avgImg with createGraphics()
    avgImg = createGraphics(firstImg.width, firstImg.height);
}
//////////////////////////////////////////////////////////
function draw() {
    // Call loadPixels() on every images in the imgs array
    for (var i = 0; i < numOfImages; i++) {
        imgs[i].loadPixels();
    }

    // Call loadPixels() on avgImg
    avgImg.loadPixels();

    // set avgImg pixels to red and calculate the sum of channels
    for (var x = 0; x < avgImg.width; x++) {
        for (var y = 0; y < avgImg.height; y++) {
            // calculate the pixel index for avgImg
            var index = (x + y * avgImg.width) * 4;

            // initialize sum value to 0 for each pixel
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;

            // Loop through every images and add the channel values to the sum variables
            for (var i = 0; i < numOfImages; i++) {
                var img = imgs[i];
                var pixelIndex = (x + y * img.width) * 4;
                sumR += img.pixels[pixelIndex];
                sumG += img.pixels[pixelIndex + 1];
                sumB += img.pixels[pixelIndex + 2];
            }

            // average for each channel
            var avgR = sumR / numOfImages;
            var avgG = sumG / numOfImages;
            var avgB = sumB / numOfImages;

            // Update the avgImg pixels with the average color
            avgImg.pixels[index] = avgR; 
            avgImg.pixels[index + 1] = avgG; 
            avgImg.pixels[index + 2] = avgB; 
            avgImg.pixels[index + 3] = 255; 
        }
    }

    // Update avgImg pixels
    avgImg.updatePixels();

    // Calculate the transition amount based on mouseX position (0 to 1)
    transitionAmount = constrain(map(mouseX, 0, width, 0, 1), 0, 1);

    // Interpolate between the random image and the average image
    var interpolatedImg = lerpImage(imgs[currentImgIndex], avgImg, transitionAmount);

    // Draw the interpolated image on the right image
    image(interpolatedImg, imgs[currentImgIndex].width, 0);
}


function keyPressed() {
    // Select a random image from the imgs array
    currentImgIndex = floor(random(numOfImages));

    // Redraw the canvas with selected random image
    var firstImg = imgs[currentImgIndex];
    createCanvas(firstImg.width * 2, firstImg.height);
    pixelDensity(1);

    // Draw current image on the left of the canvas
    image(imgs[currentImgIndex], 0, 0);

    // Draw a grey area on the right
    fill(125);
    rect(firstImg.width, 0, firstImg.width, firstImg.height);

    // Reset transitionAmount to 0
    transitionAmount = 0;

    // Restart the draw loop
    loop();
}

function mouseMoved() {
    // Restart the draw loop
    loop();
}

function lerpImage(img1, img2, amount) {
    var lerpImg = createImage(img1.width, img1.height);
    lerpImg.loadPixels();
    for (var x = 0; x < img1.width; x++) {
        for (var y = 0; y < img1.height; y++) {
            var index = (x + y * img1.width) * 4;
            lerpImg.pixels[index] = lerp(img1.pixels[index], img2.pixels[index], amount); 
            lerpImg.pixels[index + 1] = lerp(img1.pixels[index + 1], img2.pixels[index + 1], amount); 
            lerpImg.pixels[index + 2] = lerp(img1.pixels[index + 2], img2.pixels[index + 2], amount); 
            lerpImg.pixels[index + 3] = 255; 
        }
    }
    lerpImg.updatePixels();
    return lerpImg;
}
