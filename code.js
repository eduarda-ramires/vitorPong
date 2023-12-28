var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["0cb0d08e-6bd0-40ed-9ff4-c63ab9887130","a8b7735d-ad49-4369-99f4-3a40ed00959a","8f6cc95c-e36d-467b-bfae-4e63458fb647","9f4c291b-765b-4912-8ea2-e3de0724fc51"],"propsByKey":{"0cb0d08e-6bd0-40ed-9ff4-c63ab9887130":{"name":"naveram","sourceUrl":null,"frameSize":{"x":799,"y":457},"frameCount":6,"looping":true,"frameDelay":12,"version":"BFg1GK44t9i2j6B1wzUaafQgQq2X4Luw","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":1598,"y":1371},"rootRelativePath":"assets/0cb0d08e-6bd0-40ed-9ff4-c63ab9887130.png"},"a8b7735d-ad49-4369-99f4-3a40ed00959a":{"name":"navejogador","sourceUrl":null,"frameSize":{"x":242,"y":120},"frameCount":5,"looping":true,"frameDelay":12,"version":"AbmScA5X25H.f5T.ipNZijo9lKGvBGsI","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":484,"y":360},"rootRelativePath":"assets/a8b7735d-ad49-4369-99f4-3a40ed00959a.png"},"8f6cc95c-e36d-467b-bfae-4e63458fb647":{"name":"planeta","sourceUrl":null,"frameSize":{"x":169,"y":166},"frameCount":5,"looping":true,"frameDelay":12,"version":"sKEgLx2xeq9Pp1snDXg5tT2s72mYVg7W","categories":[""],"loadedFromSource":true,"saved":true,"sourceSize":{"x":338,"y":498},"rootRelativePath":"assets/8f6cc95c-e36d-467b-bfae-4e63458fb647.png"},"9f4c291b-765b-4912-8ea2-e3de0724fc51":{"name":"bg","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":8,"looping":true,"frameDelay":12,"version":"0Sb8z5gnEKo4ytXk7r.Jnp8jyIxOt7d3","categories":["backgrounds"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":1200,"y":1200},"rootRelativePath":"assets/9f4c291b-765b-4912-8ea2-e3de0724fc51.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// jogo de ping pong. mova o mouse para cima ou para baixo para poder se mover
//e marcar pontos

var bg = createSprite(200, 200);
bg.setAnimation("bg");

var ball = createSprite(200,200,20,20);
ball.setAnimation("planeta");
ball.scale = 0.3;

var paddle = createSprite(330,200,10,80);
paddle.setAnimation("navejogador");
paddle.scale = 0.4;

var paddlecom = createSprite(30,200,10,80);
paddlecom.setAnimation("naveram");
paddlecom.scale = 0.1;

createEdgeSprites();





var pontosjogador = 0;
var pontoscomputador = 0;
var gameState = "start";

function draw() {
  console.log(gameState);
 //console.log(ball.velocityY)
  drawSprites();
  
  if (gameState == "start") {
    text("clique Espaço para começar", 150, 200);
    if (keyDown("space")) {
      ball.velocityY = 9;
      ball.velocityX = 9;
      gameState = "play";
      paddlecom.velocityY = 4;
      
      

    }
  }
  
  if (gameState == "play") {
    if ((pontosjogador >= 3 ||pontoscomputador >= 3)&& gameState == "play") {
      gameState = "over";
      
    }
    if (ball.isTouching(leftEdge)) {
      pontosjogador++;
      ball.y = 200;
      ball.x = 200;
    }
    if (ball.isTouching(rightEdge)) {
      pontoscomputador++;
      ball.y = 200;
      ball.x = 200;
    }
    paddle.y = World.mouseY;
 
    if (ball.isTouching(paddle)) {
      playSound("assets/category_hits/retro_game_hit_block_3.mp3", false);
    }
    
    if (ball.isTouching(paddlecom)) {
      playSound("assets/category_hits/retro_game_hit_block_4.mp3", false);
    }
    
  }
  
  if (gameState == "over"){
    ball.velocityX = 0;
    ball.velocityY = 0;
    ball.x = 200;
    ball.y = 200;
    paddlecom.velocityY = 0;
    fill("pink");
    textSize(25);
    text("GAME OVER",150,150);
    if (keyDown("space")) {
    pontoscomputador = 0;
    pontosjogador = 0;
    gameState = "start";
    
  }
    
  }
  
  
  stroke("blue");

  
   
  textSize(40);
  text(pontoscomputador, 150, 45);
  text(pontosjogador, 250, 45);
  
  
  ball.bounceOff(bottomEdge);
  ball.bounceOff(topEdge);
  ball.bounceOff(paddle);
  ball.bounceOff(paddlecom);
  paddlecom.bounceOff(edges);
  

  
  
}
  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
