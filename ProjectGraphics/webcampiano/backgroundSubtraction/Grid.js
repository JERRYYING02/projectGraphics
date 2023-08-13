class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.noteSize = 40;
    this.notePos = [];
    this.noteState = [];

    this.notes=['C','D','E','F','G'];
    this.monoSynth=monoSynth;


    // initalise grid structure and state
    for (var x=0;x<_w;x+=this.noteSize){
      var posColumn = [];
      var stateColumn = [];
      for (var y=0;y<_h;y+=this.noteSize){
        posColumn.push(createVector(x+this.noteSize/2,y+this.noteSize/2));
        stateColumn.push(0);
      }
      this.notePos.push(posColumn);
      this.noteState.push(stateColumn);
    }
  }
  /////////////////////////////////
  run(img) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes(img);
  }
  /////////////////////////////////

  drawActiveNotes(img) {
    // draw active notes
    noStroke();
    for (var i = 0; i < this.notePos.length; i++) {
      for (var j = 0; j < this.notePos[i].length; j++) {
        var x = this.notePos[i][j].x;
        var y = this.notePos[i][j].y;
        if (this.noteState[i][j] > 0) {
          var alpha = this.noteState[i][j] * 200;
          var c1 = color(255, 0, 0, alpha);
          var c2 = color(0, 255, 0, alpha);
          var mix = lerpColor(c1, c2, map(i, 0, this.notePos.length, 0, 1));
          fill(mix);
  
          // make the shape based on noteState
          var s = this.noteState[i][j];
          var shapeSize = this.noteSize * s;
          var shapeType = int(map(s, 0, 1, 0, 3)); // 0 for ellipse, 1 for rectangle, 2 for triangle, 3 for pentagon
  
          // effect of strength rotation
          var effectStrength = map(s, 0, 1, 1, 4); 
          var rotation = frameCount * 0.01 * effectStrength;
          


        
          var note = this.notes[(i+1)/this.notes.length]+3
          let velocity = map(effectStrength, 1, 4, 0, 0.5); 
          let time = map(effectStrength, 1, 4, 0, 0.5); 
          let dur = map(effectStrength, 1, 4, 0, 0.5); 
          this.monoSynth.play(note, velocity, time, dur);






          push();
          translate(x, y);
          rotate(rotation);
  
          if (shapeType === 0) {
            ellipse(0, 0, shapeSize, shapeSize);
          } else if (shapeType === 1) 
          {
            rectMode(CENTER);
            rect(0, 0, shapeSize,shapeSize);
          } else if (shapeType === 2) 
          {
            triangle(-shapeSize / 2, shapeSize / 2,shapeSize / 2,shapeSize / 2, 0, -shapeSize / 2);
          } else if (shapeType === 3) 
          {
            //draw pentagon
            beginShape();
            for (var k = 0; k <5; k++) {
              var angle = TWO_PI * k/5;
              var px = cos(angle) *shapeSize/2;
              var py = sin(angle) *shapeSize/2;
              vertex(px, py);
            }
            endShape(CLOSE);
          }

        // Trigger secondary effects randomly
        if (random(1) < 0.2) { // 20 percent chance to trigger active note
          //size of effect affected by noise 
          var effectSize = map(noise(frameCount * 0.1), 0, 1, 10, 50);
          var secondaryColor = color(random(255), random(255), random(255), 100);
          fill(secondaryColor);
          ellipse(0, 0, effectSize, effectSize);
        }

  
          pop();


          
   
        }
        this.noteState[i][j] -= 0.05;
        this.noteState[i][j] = constrain(this.noteState[i][j], 0, 1);
      }
    }
  }
  

  
  /////////////////////////////////
  findActiveNotes(img){
    for (var x = 0; x < img.width; x += 1) {
        for (var y = 0; y < img.height; y += 1) {
            var index = (x + (y * img.width)) * 4;
            var state = img.pixels[index + 0];
            if (state==0){ // if pixel is black (ie there is movement)
              // find which note to activate
              var screenX = map(x, 0, img.width, 0, this.gridWidth);
              var screenY = map(y, 0, img.height, 0, this.gridHeight);
              var i = int(screenX/this.noteSize);
              var j = int(screenY/this.noteSize);
              this.noteState[i][j] = 1;
            }
        }
    }
  }




  
}
