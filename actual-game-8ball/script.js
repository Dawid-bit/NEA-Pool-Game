let table;
let holeTL, holeTC, holeTR, holeBL, holeBC, holeBR;
let left_collide, right_collide, top_collide_one, top_collide_two, bottom_collide_one, bottom_collide_two;
let white_ball
let black_ball
let randomPOS
let cue_stick
let solid_balls = []
let striped_balls = []
let random_coordinates = [
  "1275, 473",
  "1308, 492",
  "1308, 454",
  "1407, 549",
  "1341, 511",
  "1341, 435",
  "1374, 454",
  "1374, 492",
  "1374, 416",
  "1374, 530",
  "1407, 473",
  "1407, 435",
  "1407, 511",
  "1407, 397",

] // random coordinates that balls will be assigned
let solid_colors = [
  'yellow',
  'red',
  'purple',
  'blue',
  'orange',
  'brown',
  'green',
] // colours of the balls 
let striped_colors = [
  'yellow',
  'red',
  'purple',
  'blue',
  'orange',
  'brown',
  'green',
]
let cueStickPosition
let movementAmount = 100
let isMousePressed = false
let anglePressed = 0
let cueStickDistance = 0



function setup() {

  createCanvas(1920, 945);
  
  

  //-------------the pockets and the table-------------//
  table = new Sprite(960, 473, 1260, 720, 'n')
  holeTL = new Sprite(367, 150, 72, 'n')
  holeTC = new Sprite(960, 150, 72, 'n')
  holeTR = new Sprite(1554, 150, 72, 'n')
  holeBL = new Sprite(367, 798, 72, 'n')
  holeBC = new Sprite(960, 798, 72, 'n')
  holeBR = new Sprite(1554, 798, 72, 'n')

  //-------------the walls of the table-------------//
  left_collide = new Sprite(348, 473, 36, 576, 's')
  right_collide = new Sprite(1572, 473, 36, 576, 's')
  bottom_collide_one = new Sprite(664, 815, 522, 36, 's')
  bottom_collide_two = new Sprite(1256, 815, 522, 36, 's')
  top_collide_one = new Sprite(664, 131, 522, 36, 's')
  top_collide_two = new Sprite(1256, 131, 522, 36, 's')

  //-------------cue balls-------------//
  // Create a set to store used coordinates ------> compare if generated coordinates are in this set
  let usedCoordinates = new Set() 
  
  for (let i = 0; i < 7; i++) {
    let randomPOS_b
    do {
      // splitting the the coordinates into 2 array elements 'x' and 'y' from 'x,y'
      randomPOS_b = generate_coordinate().split(',') 
    }
    // Keep generating until the coordinates dont match the ones from set 'usedCoordinates'
    while (usedCoordinates.has(randomPOS_b.join(',')))  
    
    // unique coordinate gets joined back to 'x,y' format and added to set
    usedCoordinates.add(randomPOS_b.join(',')) 

    // creating new sprite 
    let b = new Sprite()
    b.diameter = 36 
    
    // first element of array which is 'x' pos
    b.x = randomPOS_b[0] 
    
    // second element of array which is 'y' pos
    b.y = randomPOS_b[1] 
    
    // gets random color and set it = to variable 'color'
    let color = pick_solid_color() 
    b.color = color
    
    // Add the ball to the 'solid_balls' array
    solid_balls.push(b) 

  }

  for (let i = 0; i < 7; i++) {
    let randomPOS_d
    do {
      randomPOS_d = generate_coordinate().split(',')
    }
    while (usedCoordinates.has(randomPOS_d.join(',')))

    usedCoordinates.add(randomPOS_d.join(','))


    let d = new Sprite()
    d.diameter = 36
    d.x = randomPOS_d[0]
    d.y = randomPOS_d[1]
    let color = pick_striped_color()
    d.color = color
    
    // Add the ball to the 'striped_balls' array
    striped_balls.push(d) 
  }


  
  //-------------cue ball and black ball-------------//
  let xPOS = createVector(645, 473)
  white_ball = new Sprite(xPOS.x, xPOS.y, 36, 'd')
  white_ball.color = color(255, 255, 255)
  
  black_ball = new Sprite(windowWidth / 2 + 381, windowHeight / 2, 36, 'd')
  black_ball.color = color(0, 0, 0)

  //-------------cue stick-------------//
  let CUE_ORIGIN = createVector(445, 473)
  cue_stick = new Sprite(CUE_ORIGIN.x, CUE_ORIGIN.y, 300, 10, 'n')


}


function mousePressed() {
  // Angle of the cue stick ----> originally set to 0
  anglePressed = atan2(mouseY - white_ball.y, mouseX - white_ball.x); 

  // Decrement cueStickDistance and limit its value
  cueStickDistance -= movementAmount;
  cueStickDistance = Math.max(cueStickDistance, -100); // Ensure it doesn't go below -100
  
  // Calculate movement along normal X-axis
  let dx = cos(anglePressed) * movementAmount;
  let dy = sin(anglePressed) * movementAmount;

  // Move the cue stick
  cue_stick.x += dx;
  cue_stick.y += dy;
  isMousePressed = true; 
}

function mouseReleased() {
  isMousePressed = false; 
}

// function to calculate the rotation of the cue around the white ball 
function cue_rotation() {
  // Calculate the angle between the white ball and the mouse
  let angle = atan2(mouseY - white_ball.y, mouseX - white_ball.x);

  // rotates the cue stick around the white ball
  cue_stick.rotation = angle;
  cue_stick.x = white_ball.x + cos(angle) * 200;
  cue_stick.y = white_ball.y + sin(angle) * 200;
  cueStickPosition = createVector(cos(angle) * 200, sin(angle) * 200);

  // Update the cue stick's position using the vector
  cue_stick.x = white_ball.x + cueStickPosition.x;
  cue_stick.y = white_ball.y + cueStickPosition.y;
}

// function to randomly select an element from the random_coordinates array
function generate_coordinate() {
  return random_coordinates[(Math.floor(Math.random() * random_coordinates.length))]
}

// function to randomly select a color for solid balls
function pick_solid_color() { 
  let randomColor = Math.floor(Math.random() * solid_colors.length)
  return solid_colors.splice(randomColor, 1)[0]; // Remove the color from array and return it
}

// function to randomly select a color for striped balls
function pick_striped_color() { 
  let randomColor = Math.floor(Math.random() * striped_colors.length)
  // Remove the color from array and return it
  return striped_colors.splice(randomColor, 1)[0]; 
}

function draw() {
  clear()
  background(255);
  
  // Only update rotation if the mouse button is NOT pressed
  if (!isMousePressed) { 
    cue_rotation();
  }
}































































/*all of the coloured solid and striped balls and their positions
//---- solid balls
let yellow_One = new Sprite(windowWidth / 2 + 315, windowHeight / 2, 36, 'd')
yellow_One.color = 'yellow'
solid_balls.push(yellow_One)

let blue_One = new Sprite(windowWidth / 2 + 348, windowHeight / 2 + 19, 36, 'd')
blue_One.color = 'blue'
solid_balls.push(blue_One)

let red_One = new Sprite(windowWidth / 2 + 348, windowHeight / 2 - 19, 36, 'd')
red_One.color = 'red'
solid_balls.push(red_One)

let purple_One = new Sprite(windowWidth / 2 + 447, windowHeight / 2 + 76, 36, 'd')
purple_One.color = 'purple'
solid_balls.push(purple_One)

let orange_One = new Sprite(windowWidth / 2 + 381, windowHeight / 2 + 38, 36, 'd')
orange_One.color = 'orange'
solid_balls.push(orange_One)

let green_One = new Sprite(windowWidth / 2 + 381, windowHeight / 2 - 38, 36, 'd')
green_One.color = 'green'
solid_balls.push(green_One)

let maroon_One = new Sprite(windowWidth / 2 + 414, windowHeight / 2 - 19, 36, 'd')
maroon_One.color = color(50, 0, 0)
solid_balls.push(maroon_One)


//---- striped balls
let yellow_Two = new Sprite(windowWidth / 2 + 414, windowHeight / 2 + 19, 36, 'd')
yellow_Two.color = 'yellow'
striped_balls.push(yellow_Two)

let blue_Two = new Sprite(windowWidth / 2 + 414, windowHeight / 2 - 57, 36, 'd')
blue_Two.color = 'blue'
striped_balls.push(blue_Two)

let red_Two = new Sprite(windowWidth / 2 + 414, windowHeight / 2 + 57, 36, 'd')
red_Two.color = 'red'
striped_balls.push(red_Two)

let purple_Two = new Sprite(windowWidth / 2 + 447, windowHeight / 2, 36, 'd')
purple_Two.color = 'purple'
striped_balls.push(purple_Two)

let orange_Two = new Sprite(windowWidth / 2 + 447, windowHeight / 2 - 38, 36, 'd')
orange_Two.color = 'orange'
striped_balls.push(orange_Two)

let green_Two = new Sprite(windowWidth / 2 + 447, windowHeight / 2 + 38, 36, 'd')
green_Two.color = 'green'
striped_balls.push(green_Two)

let maroon_Two = new Sprite(windowWidth / 2 + 447, windowHeight / 2 - 76, 36, 'd')
maroon_Two.color = color(50, 0, 0)
striped_balls.push(maroon_Two)
*/