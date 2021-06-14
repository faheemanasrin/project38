var monkey,monkey_running, monkey_collided;
var banana,bananamoving;
var obstacle,obstaclemoving;
var ground,groundmoving;
var invisibleGround;
var gamestate;
var PLAY,END;
var score;
var ObstaclesGroup;
var BananaGroup;
var winImage

function preload(){

    monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
    monkey_collided = loadAnimation("Monkey_01.png");
   groundmoving = loadImage("jungle.jpg");
   obstaclemoving=loadImage("stone.png");
  bananamoving=loadImage("banana.png");
winImage=loadImage("download.png");
}

function setup() {
  createCanvas(400, 400);
  
  
  text("Score: "+ score, 250, 50);
  
  
  ground = createSprite(200,200,10,20);
  ground.addImage("ground",groundmoving);
  
 
  
 monkey= createSprite(30,350,20,50);
 
 monkey.addAnimation("running", monkey_running);
 monkey.addAnimation("collided",monkey_collided);
 monkey.scale = 0.1;
 monkey.velocityY = -12 ;
  score=0;
    
  
   
invisibleGround = createSprite(200,385,400,5);
  invisibleGround.visible = true;      
  
    ObstaclesGroup= new Group();
    BananaGroup= new Group();
 
  
PLAY = 1;
END = 0;
gameState = PLAY;
  
}
  

function draw() {
  background(25);
 
  
  if(gameState === PLAY){
    
    ground.velocityX=-2;
    ground.y=camera.position.y;

    
  if(BananaGroup.isTouching(monkey)){
     BananaGroup.destroyEach();
     score=score+1;
  }
    
      switch(score){
          case 5:monkey.scale=0.10;
            break;
          case 10:monkey.scale=0.12;
            break; 
          case 15:monkey.scale=0.14;
            break;      
          case 20:monkey.scale=0.16;
            break;
          case 25:monkey.scale=0.18;
            break;
          default:break;
        }
    
    
   if (ground.x < 0){
    ground.x = ground.width/2;
    }

if(score===5){
  ground.scale=2;
  ground.x=200;
  ground.y=200;
  ground.addImage("ground",winImage)
  monkey.changeAnimation("collided");
     
  ground.velocityX = 0;
  monkey.velocityY = 0;
  ObstaclesGroup.setVelocityXEach(0);
  BananaGroup.setVelocityXEach(0);
  
 BananaGroup.destroyEach();
 ObstaclesGroup.destroyEach();
  
  ObstaclesGroup.setLifetimeEach(-1);
  BananaGroup.setLifetimeEach(-1);   
 }



    if(keyDown("space")&& monkey.y >= 200){
    monkey.velocityY = -12 ;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
      
   
      
      
      
      
    spawnObstacles();
    spawnBanana();
    

    if(ObstaclesGroup.isTouching(monkey)){
      monkey.scale=0.100
       gameState = END;
      }
    
  }
   else if(gameState === END){
     monkey.changeAnimation("collided");
     
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    
   
    
    ObstaclesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);   
   }
    
    
   
  
  
  

 

  
   monkey.collide(invisibleGround);
    
  
  
  
  
  
  
  
  
  
  
  text(mouseX+","+mouseY,mouseX,mouseY);

  
  
  drawSprites();
  
  stroke( "white");
  textSize(20);
  fill("white");
  text("Score:"+score,10,50);

}

  
  
  function spawnObstacles() {
if(World.frameCount % 300 === 0) {
   var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - 6;
    obstacle.addImage("obstacle",obstaclemoving);
    obstacle.scale=0.1;
    obstacle.lifetime = 67;
    ObstaclesGroup.add(obstacle);
  }
}

function spawnBanana() {
 
if (World.frameCount % 80 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.x=camera.position.x;
    banana.y=camera.position.y;
    banana.y = random(120,200);
    banana.addImage("Banana",bananamoving);
    banana.scale = 0.07;
    banana.velocityX = -3;
    banana.lifetime = 134;
    BananaGroup.add(banana);
  }
  
}


  
  
  
  
  
  
  
