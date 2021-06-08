var backgroundIMG, background1;
var alienIMG, alien;
var ufoIMG, ufoGroup;
var earthIMG, earth;
var planetIMG, planet;
var asteroid1IMG, asteroid1, asteroid2IMG, asteroid3IMG;
var gameState = "start"
var invisibleBlockGroup;
var score = 0 ;

function preload(){
backgroundIMG = loadImage("images/bg.png");
alienIMG = loadImage("images/alien.png");
ufoIMG = loadImage("images/ufo.png");
earthIMG = loadImage("images/earth.png")
planetIMG = loadImage("images/planet.png");
asteroid1IMG = loadImage("images/asteroid1.png")
asteroid2IMG = loadImage("images/asteroid2.png")
asteroid3IMG = loadImage("images/asteroid3.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  background1 = createSprite(640,360)
  background1.addImage(backgroundIMG)
  background1.scale = 5
  
  earth = createSprite(20,400,20,20)
  earth.addImage(earthIMG)
  earth.scale = 2

  alien = createSprite(390,400,10,10)
  alien.addImage(alienIMG)
  alien.scale = 0.1

  
ufoGroup = new Group()
invisibleBlockGroup = new Group()
asteroidsGroup = new Group()

planet = createSprite(windowWidth, windowHeight/2, 20, 20)
planet.addImage(planetIMG);

  edges = createEdgeSprites()

}

function draw() {
  background(255,255,255);

  if(gameState === "start"){
    if(keyDown("s")){
      gameState = "play"
    }

  }
  else if(gameState === "end"){
    alien.destroy();
    asteroidsGroup.destroyEach()
    ufoGroup.destroyEach()
    background1.velocityX = 0;
    planet.visible = false

  }
  else if(gameState === "play"){
    planet.visible = false
    if(alien.isTouching(invisibleBlockGroup)){
      alien.velocityY = 0
      alien.velocityX = -5
      score = score +1
    }
    if(asteroidsGroup.isTouching(alien)){
      gameState = "end"
    }
    
    background1.velocityX = -3
    if(background1.x < 0){
      background1.x = background1.width/2
    }
    earth.velocityX = -2
    
    if(keyIsDown(RIGHT_ARROW)){
      alien.velocityX = 5
  
    }
  
    if(keyIsDown(UP_ARROW)){
      alien.velocityY = -7
  
    }
    if(keyIsDown(DOWN_ARROW)){
      alien.velocityY = 7
    }
    alien.bounceOff(edges)
    alien.collide(ufoGroup)

   if(frameCount === 1000){
     gameState = "win"
     
   }

    spawnUfo();
    spawnAsteroids();

  }
  else if(gameState === "win"){
    planet. visible = true
    background1.velocityX = 0
    alien.velocityX = 0
    alien.velocityY = 0
  }
  
  drawSprites();
  fill("white")
    textSize(20)
  text("score : "+ score, 100, 50)
  if(gameState === "start"){
    fill("white")
    textSize(20)
    text("press → to move right", windowWidth/2.5,250)
    text("press ↑ to jump", windowWidth/2.5, 300)
    text("press 's' to start",windowWidth/2.5,450)
    text("press ↓ to land on the ufo", windowWidth/2.5, 350)

  }
  else if(gameState === "end"){
    fill("white")
    textSize(40)
    text("Game Over", windowWidth/2.5, windowHeight/4);
    button = createButton("Restart")
    button.position(windowWidth/2.5, windowHeight/3.5)
    button.style.width = "200px"
    button.mousePressed(function(){
      window.location.reload()
    })
  }
  else if(gameState === "win"){
    fill("white")
    textSize(40)
    text("You Win!",windowWidth/2.5, 300)
    button = createButton("Play Again")
    button.position(windowWidth/2.5, windowHeight/3.5)
    button.style.width = "200px"
    button.mousePressed(function(){
      window.location.reload()
    })
  }
}


function spawnUfo(){
  if(frameCount%160 === 0){
    ufo = createSprite(windowWidth, random(windowHeight*0.35, windowHeight*0.75,100,100))
    ufo.velocityX = -5
    ufo.addImage(ufoIMG);
    var invisibleBlock = createSprite(ufo.x, ufo.y-ufo.height/2, 70, 10)
    invisibleBlock.velocityX = -5;
    invisibleBlockGroup.add(invisibleBlock);
    ufoGroup.add(ufo);
    invisibleBlock.visible = false
  }
}
function spawnAsteroids(){
  if(frameCount%200 === 0){
    asteroid1 = createSprite(random(windowWidth*0.25,windowWidth*0.75), 0, 100, 100)
    asteroid1.velocityY = random(1,5);
    asteroid1.velocityX = random(-5,5);
    var rand = Math.round(random(1,3))
    switch(rand){
      case 1: asteroid1.addImage(asteroid1IMG)
      break;
      case 2: asteroid1.addImage(asteroid2IMG)
      break;
      case 3: asteroid1.addImage(asteroid3IMG)
      break;
      default: break;
    }
    asteroidsGroup.add(asteroid1);
    asteroid1.lifetime = windowHeight/5
    asteroid1.scale = 0.5

  }
}