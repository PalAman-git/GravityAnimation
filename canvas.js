const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
const gravity = 0.6;
const friction = 0.95;

//array of colors
const ArrayColor=[
    "#732D3F",
    "#5A6473",
    "#2F3840",
    "#AEB7BF",
    "#D2D6D9"
    
]





//class for the bouncing balls
function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color=ArrayColor[Math.floor(Math.random()*ArrayColor.length)]
  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle='white';
    // c.stroke();
  };

  this.update = () => {
    this.x += this.dx;
    this.y += this.dy;
    if (this.y + this.dy + this.radius >= canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    if(this.x+this.radius+this.dx>canvas.width||this.x-this.radius<0){
        this.dx=-this.dx;
    }

    this.draw();
  };
}

//generating random radius for the circles
let minRadius =20,
  maxRadius = 100;
 


//array for storing the circles
let ArrayCircle=[];
for(let i=0;i<650;i++){
    let radius = Math.random() * (maxRadius - minRadius) + minRadius,
  x = Math.random() * (canvas.width - 2 * radius) + radius,
  y = Math.random() * (canvas.height - 2 * radius) + radius,
  dx = (Math.random()*(2+2))-2,
  dy = Math.random()*(4);
    ArrayCircle.push(new Circle(x, y, radius, dx, dy));
}
console.log(ArrayCircle);
// for(let i=0;i<100;i++){
//     let circle=new Circle(x,y,radius);
//     ArrayCircle.push()=circle;
// }

//animate
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  for(let i=0;i<100;i++){
    let circle=ArrayCircle[i];
    circle.update();
  }
  window.requestAnimationFrame(animate);
}
animate();
