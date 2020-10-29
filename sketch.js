var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var sound1,sound2,sound3;
 localStorage.HighestScore = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png") 
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage ("restart.png")
  
  sound1 = loadSound("jump.mp3")
  sound2 = loadSound("checkPoint.mp3")
  sound3 = loadSound("die.mp3")
  
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("stop",trex_collided )
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
   gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage(gameOverImage);
gameOver.scale = 0.5;
restart.addImage(restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
   PLAY = 1;
   END = 0;
   gameState = PLAY;
  
cloudsGroup = new Group()
  obstaclesGroup = new Group()
  count = 0;
  textSize(18);
  textFont("Georgia");
  
}

function draw() {
  background(180);
  text("Score: "+ count, 450, 50);
  if(localStorage.HighestScore>0){
    text("highest "+localStorage.HighestScore,350,50)
  }
  if(gameState=== PLAY){
       ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count+ Math.round(getFrameRate()/30); 
    if(count%100===0&&count>0){
      sound2.play();
    }
    if(keyDown("space")) {
      trex.velocityY = -10;
      sound1.play();
    }
     trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds();
    spawnObstacles();    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      sound3.play();
    }

    
  }
  else if(gameState=== END){
        gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
  trex.changeAnimation("stop",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
if(mousePressedOver(restart)) {
    reset();
  }
  }


  trex.collide(invisibleGround);

  drawSprites();
} 

function reset(){
 gameState = PLAY;
 obstaclesGroup.destroyEach();
 cloudsGroup.destroyEach();
 gameOver.visible = false;
 restart.visible = false;
 trex.changeAnimation("running",trex_running);
  if(localStorage.HighestScore <count){ localStorage.HighestScore = count; }

  
 count = 0;
}

function spawnClouds(){
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.addImage(cloudImage);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add (cloud)
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch (rand) {
  case 1:
    obstacle.addImage(obstacle1)
    break;
  case 2:
       obstacle.addImage(obstacle2)
    break;
  case 3:
    obstacle.addImage(obstacle3)
    break;
  case 4:
   obstacle.addImage(obstacle4)
    break;
  case 5: 
   obstacle.addImage(obstacle5)
   
    break;
  case 6:
   obstacle.addImage(obstacle6)
}

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclesGroup.add (obstacle)
  }
}





