
var trex ,trex_running;
var score = 0
var gameState = 1


function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
 trexCollided =loadAnimation("trex_collided.png")
  groundImage =loadImage("ground2.png")

  cloudImg=loadImage("cloud.png")

  obstacle1 =loadImage ("obstacle1.png")
  obstacle2 =loadImage ("obstacle2.png")
  obstacle3 =loadImage ("obstacle3.png")
  obstacle4=loadImage ("obstacle4.png")
  obstacle6 =loadImage ("obstacle6.png")
  obstacle5 =loadImage ("obstacle5.png")

  restartImg =loadImage ("restart.png")
  gameOverImg =loadImage ("gameOver.png")

  jumpsound = loadSound ("jump.mp3")
  diesound = loadSound ("die.mp3")
  checkpoint = loadSound ("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
 trex=createSprite(50,height-200,20,80)
 trex.addAnimation("lable",trex_running)
 trex.scale=0.7
 trex .debug=false     
 trex .setCollider ("rectangle",0,0,40,trex.height)

 trex.addAnimation("collided",trexCollided)

 ground=createSprite(width/2,height-150,600,10)
 ground.addImage(groundImage)
 
 invisibleGround=createSprite(300,height-140,width,10)
 invisibleGround.visible=false

 var rnd = Math .round (random(1,100))
 console.log(rnd)

 obstaclesGroup = new Group ()
 cloudsGroup = new Group ()

 gameOver= createSprite (width/2,height/2)
 gameOver.addImage (gameOverImg)
 gameOver .scale = 1

 restart = createSprite (width/2,height/2+80)
 restart .addImage (restartImg)
 restart . scale = 0.6
}

function draw(){  
  background("orange")  
  console .log (frameRate())
  fill("indigo")
  text("Score ="+score,width-100,50)

  trex.collide(invisibleGround)  

  
  if(gameState===1){
    score=score+Math.round(frameRate()/60)
     
    if(touches.length>0||keyDown("space")&&trex.y>148){
      trex.velocityY=-15 
      jumpsound.play()
      touches=[]
    }

    if(score%500===0&&score>0){
      checkpoint.play()
    }
    trex.velocityY+=0.8
    ground.velocityX=-(2+score/200)

    if(ground.x<0){
       ground.x=ground.width/2
    }

    spawnClouds()
    spawnObstacles()

    gameOver.visible =false
    restart.visible =false

    if(obstaclesGroup.isTouching(trex)){
       gameState=2
       diesound.play()
      // trex.velocityY=-14
    }
  }

  else if(gameState===2){
     cloudsGroup . setLifetimeEach (-1)
     obstaclesGroup.setLifetimeEach (-1)
     ground .velocityX=0
     obstaclesGroup.setVelocityXEach(0)
     cloudsGroup .setVelocityXEach(0)
     gameOver.visible = true
     restart.visible = true
     trex.changeAnimation("collided")
     trex.velocityY=0
     if(mousePressedOver(restart)||touches.lenth>0){
         reset()
     }
  }

  drawSprites()
}
function spawnClouds () {
  if(frameCount%60===0){
    cloud =createSprite (width,100,40,10)
    cloud.velocityX=-3
    cloud.addImage(cloudImg)
    cloud.scale=0.6    
    cloud.y=random(100,250)
    cloud.depth=trex.depth
    trex.depth+=1
    cloud.lifetime=width/3
    cloudsGroup.add (cloud)
  }

}
function spawnObstacles (){
  if(frameCount%80===0) {
    obstacle=createSprite(width,height-165,10,40)
    obstacle.velocityX=-(5+score/200)
    obstacle.lifetime=width/5
    var rnd = Math.round(random(1,6))
    obstacle .scale=0.5  
    switch (rnd){
      case 1:obstacle.addImage(obstacle1)
      break
      case 2: obstacle.addImage(obstacle2)
      break
      case 3 : obstacle .addImage (obstacle3)
      break
      case 4 : obstacle .addImage (obstacle4)
      break
      case 5 : obstacle .addImage (obstacle5)
      break
      case 6 : obstacle .addImage (obstacle6)
      break
      default:break
    }
    obstaclesGroup.add (obstacle)
  }
}

function reset(){
   gameState=1
   cloudsGroup.destroyEach()
   obstaclesGroup.destroyEach()
   trex.changeAnimation("lable")
   score=0
      }