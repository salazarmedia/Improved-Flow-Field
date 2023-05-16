let fps = 60; // Framerate de la página

let increment = 0.5; // PIANO
let scale = 50; // PIANO
let cols, rows; 

let xOffset,
  yOffset,
  zOffset = 0,
  offsetMultiplier = 1; // PIANO
  xyIncrement = 0.1; // PIANO

let twoPiMultiplier = 4; // PIANO

let particles = [];
let particleCount = 1000; // PIANO
let particleSpeed = 4;

let flowField;
let magnitude = 0.1; // PIANO
//let flowFieldVisible = false;

let r = 255, // PIANO
  g = 255, // PIANO
  b = 255; // PIANO

function setup() {
  createCanvas(windowWidth, windowHeight - 40);
  cols = floor(width / scale);
  rows = floor(height / scale);

  // prepara contador de FPS
  fps = createP('FPS: ...');

  // Crea el Flow Field
  flowField = new Array(cols * rows);
  background(50);

  // Crea partículas presentes en el canvas
  for (let i = 0; i < particleCount; i++) {
    particles[i] = new Particle();
  }
}

// Limpia el canvas y reinicia partículas
document.querySelector('.clear-canvas').onclick = () => {
  restart();
};

function restart() {
  clear();
  background(0);
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(0, 0, 0, 7);

  // Dibuja el Flow Field
  for (let y = 0; y < rows; y++) {
    yOffset = y * offsetMultiplier;
    for (let x = 0; x < cols; x++) {
      xOffset = x * offsetMultiplier;
      let index = x + y * cols;
      let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * twoPiMultiplier;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(magnitude);
      flowField[index] = v;
      xOffset += xyIncrement;
      // Dibuja flow field si se ha presionado el botón
      //   if (flowFieldVisible) {
      //     stroke(0, 50);
      //     push();
      //     translate(x * scale, y * scale);
      //     rotate(v.heading());
      //     strokeWeight(1);
      //     line(0, 0, scale, 0);
      //     pop();
      //   }
    }
    yOffset += xyIncrement;
    zOffset += increment;
  }

  // Dibuja las partículas
  for (let particle of particles) {
    particle.follow(flowField);
    particle.update();
    particle.edges();
    particle.show();
  }

  // Muestra FPS
  fps.html('FPS: ' + floor(frameRate()));
}
