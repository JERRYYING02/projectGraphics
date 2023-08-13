var speed;

function setup() {
    createCanvas(1000, 1000);
}

function draw() {
    background(255);
    speed = frameCount;

    push();
    translate(width/2, height/2);

    // SUN spins on its own axis 
    rotate(radians(speed/3));
    celestialObj(color(255,150,0), 200); 

    // EARTH
    push();
    rotate(radians(speed));
    translate(300, 0);
    celestialObj(color(0, 0, 255), 80);

    // MOON
    push();
    rotate(radians(-speed*2));
    translate(100, 0);
    celestialObj(color(255), 30);

    // ASTEROID orbiting the moon
    rotate(radians(speed*3));
    translate(25, 0);
    celestialObj(color(196, 164, 132), 10);
    pop();

   
    // SECOND MOON OF EARTH
    push();
    rotate(radians(speed/2));
    translate(160, 0);
    celestialObj(color(100), 50);
    pop();

    pop();

}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
