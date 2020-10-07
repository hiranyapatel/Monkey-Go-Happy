var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score ;
var chances  ;
var survivaltime =0 ;
var textdisplay =4;
var START =1;
//the new state of playing
var AI=3;
var PLAY =2;
var END =0;
var gameState = START;

    function preload(){
      monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
      bananaImage = loadImage("banana.png");
      obstacleImage = loadImage("obstacle.png");
   }
      function setup() {
      //creating canvas with extensions
      createCanvas(600,400);
      bananaGroup = new Group();
      obstacleGroup = new Group();
      monkey = createSprite(40,360,10,10);
      monkey.addAnimation("running",monkey_running);
      monkey.scale = 0.1;
      ground = createSprite(300,385,600,10);
      ground.shapeColor = "black";
      score =0;
      chances =3;
      survivaltime=0;
    }
    function draw() {
      background("lightgreen");
      if(gameState === START){
        //the background color
        background("white");
        score.visible =false;
        chances.visible =false;
        monkey.visible = false;
        //destroying both
        obstacleGroup.destroyEach();
        bananaGroup.destroyEach();
        ground.visible =false;
        textSize(25);
        text("MONKEY GO HAPPY",100,60);
        textSize(20);
        text("INSTRUCTIONS:-",100,90);
        textSize(18);
        text("1.Press L for LONG JUMP",100,120);
        text("2.Press S for SMALL JUMP",100,160);
        text("3.Press T to INCREASE SPEED",100,200);
        text("4.Press SPACE if YOU WON'T CONTROL",100,240);
        text("5.SURVIVAL TIME indicates the seconds you have existed till now in the game",100,275);
        text("6.SCORE indicates the banana you Caughtup",100,325);
         text("in the whole game",100,300);
        text("7.Chances tells how many chances are left",100,355);
        textSize(30);
        text("PRESS SPACE TO CONTINUE",100,390);
        
        if(keyDown("space")){
          gameState = PLAY;
        }
      }

    
      if(gameState === END){
        monkey.collide(ground);
        bananaGroup.destroyEach();
        obstacleGroup.destroyEach();
        fill("black");
        textSize(29);
        text("You lose ",200,200)
        textSize(19);
        text("Press R to restart game",170,250)
         //reseting the game
       if(keyDown("r")){
         reset();

        }
     
      }
     fill("black");
      textSize(18);
      text("score: "+score,20,35);
      text("Survival time: "+survivaltime,450,35);
      text("Chances: "+chances,250,35);
  
      if(gameState === PLAY){
       //making them visible
        monkey.visible =true;
        ground.visible =true;
        monkey.visible = true;
        score.visible =true;
        chances.visible =true;
      monkey.collide(ground);
      if(keyDown("l")&&monkey.y===349.3)
      {
         monkey.velocityY = -12;
      }
        if(keyDown("s")&&monkey.y===349.3)
      {
         monkey.velocityY = -7;
      }
      monkey.velocityY = monkey.velocityY+0.3;

      survivaltime = Math.round(frameCount/30);
  
       //calling the functions for execution 
      bananas();
      obstacles();
         if(score%10===0)
        {
          background("yellow");
        }else if(score%27===0)
        {
          background("lightgreen");
        }else if(score%19===0)
        {
          background("pink");
        }else if(score%15===0)
        {
          background("lightorange");
        }else if(score%7===0)
        {
          background("lightgrey");
        }else if(score%100===0)
        {
          background("lightred");
        }else if(score%99===0)
        {
          background("lightyellow");
        }
      if(obstacleGroup.isTouching(monkey))
      {


        obstacleGroup.velocityXEach = 0;
        bananaGroup.velocityXEach = -7;
        bananaGroup.lifetimeEach = -1;
        obstacleGroup.lifetimeEach = -1;
        chances =chances -1;
        obstacleGroup.destroyEach();
      }
        if(bananaGroup.isTouching(monkey)){

          score = score +1;
          bananaGroup.destroyEach();

        }
      if(chances === 0 ){
        gameState = END;
      }
      }
      if(gameState === END){
        monkey.collide(ground);
        bananaGroup.destroyEach();
        obstacleGroup.destroyEach();
        fill("black");
        textSize(29);
        text("You lose ",200,200)
        textSize(19);
        text("Press R to restart game",170,250)
         //reseting the game
       if(keyDown("r")){
         reset();

        }
      }
     
      
drawSprites();
     fill("black");
      textSize(18);
      text("score: "+score,20,35);
      text("Survival time: "+survivaltime,450,35);
      text("Chances: "+chances,250,35);
      }
    function bananas()
    {
      if(frameCount%80==0)
      {
        banana = createSprite(650,Math.round(random(180,260)),10,10);
        banana.velocityX = -7;
        banana.addImage(bananaImage);
        banana.scale = 0.1;
        banana.lifetime = 100;
        banana.depth = monkey.depth;
        monkey.depth = banana.depth+2;
        bananaGroup.add(banana);
      }
    }
    function obstacles()
    {
      if(frameCount%100==0)
      {
        obstacle = createSprite(650,365,10,10);
        //velocity of the obstacles
        obstacle.velocityX = -10;
        //adding images for the obstacles
        obstacle.addImage(obstacleImage);
        //preventing memory leak
        obstacle.lifetime = 100;
        obstacle.scale = 0.1;

        obstacleGroup.add(obstacle);
      }

    }
    function reset()
    {

      gameState=PLAY;
      score=0;
      chances=3;
      survivaltime= 0;
        text("Survival time: "+survivaltime,450,35);
         survivaltime = Math.round(frameCount/30);

    }