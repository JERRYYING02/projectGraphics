class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(125);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);




    // Add jets thrusters
  if (this.acceleration.x < 0) {
    // Left thruster
    fill("#FF6600");
    triangle(
      this.location.x + this.size / 4,
      this.location.y + this.size / 2 + 10,
      this.location.x + this.size / 4 - 10,
      this.location.y + this.size / 2 + 20,
      this.location.x + this.size / 4 - 10,
      this.location.y + this.size / 2
    );
  } else if (this.acceleration.x > 0) {
    // Right thruster
    fill("#FF6600");
    triangle(
      this.location.x - this.size / 4,
      this.location.y + this.size / 2 + 10,
      this.location.x - this.size / 4 + 10,
      this.location.y + this.size / 2 + 20,
      this.location.x - this.size / 4 + 10,
      this.location.y + this.size / 2
    );
  }

  if (this.acceleration.y < 0) {
    // Up thruster
    fill("#FF6600");
    triangle(
      this.location.x ,
      this.location.y + this.size / 2,
      this.location.x - 10,
      this.location.y + this.size / 2 + 10,
      this.location.x + 10,
      this.location.y + this.size / 2 + 10
    );
  }

  }

  move(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
    if (keyIsDown(LEFT_ARROW)){
      this.applyForce(createVector(-0.1, 0));
    }
    if (keyIsDown(RIGHT_ARROW)){
      this.applyForce(createVector(0.1, 0));
    }
    if (keyIsDown(UP_ARROW)){
      this.applyForce(createVector(0, -0.1));
    }
    if (keyIsDown(DOWN_ARROW)){
      this.applyForce(createVector(0, 0.1));
    }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    // Create a downwards vector of strength 0.05 that pulls the spaceship down the earth.
    let gravity = createVector(0, 0.05);

    // Calculate the distance between the spaceship and center of earth.
    let distance = dist(this.location.x, this.location.y, width/2, height/2);

    // When spaceship is close to the earth, apply the gravitational force
    if (distance < 150) {
      this.applyForce(gravity);
    }

    // Create a friction force that is smaller than the velocity of the spaceship,
    // points the opposite direction to velocity
    let friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-0.03);

    // Apply the friction force to the spaceship.
    this.applyForce(friction);
    }
}
