var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c stands for context
var c = canvas.getContext('2d');

// c.fillStyle = "rgba(255, 0, 0, 0.5)";
// c.fillRect(100, 100, 100, 50);
// c.fillStyle = "green"
// c.fillRect(500, 100, 100, 50);
// c.fillStyle = "rgba(255, 0, 0, 0.2)";
// c.fillRect(700, 100, 100, 50);

//Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3"
// c.stroke();

//Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue"
// c.stroke();

// circles in random locations with a loop
// for (var i = 0; i < 30; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;

//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = "blue"
//   c.stroke();
// }

//Arc / Circle animation
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue"
// c.stroke();

// RANDOMIZATION x, y, dx, dy
// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let dx = (Math.random() -0.5) * 8;
// let dy = (Math.random() -0.5) *10;
// let radius = 30;

// mouse location
var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 80;
var minRadius = 8;

var colorArray = [
  '#FFEEF2',
  '#595758',
  '#FFEEF2',
  '#FFC8FB',
  '#FF92C2'
];

window.addEventListener('mousemove', 
    function(event) {
      mouse.x = event.x;
      mouse.y = event.y;
});

//accounting for window resizing
window.addEventListener('resize', function() 
{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

// Circle constructor
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy; 
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // Interactivity

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y > -50 && mouse.y - this.y < 50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
      
    } else if (this.radius > minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

var circleArray = [];

function init() {
  circleArray = [];

  for (var i = 0; i <=800; i++) {
    var radius = Math.random() * 5 + 2;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() -0.5) * 5;
    var dy = (Math.random() -0.5) * 6;
    
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

init();
var animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  
}

animate();