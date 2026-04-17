const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let keys = {};

addEventListener("keydown", e=>keys[e.key]=true);
addEventListener("keyup", e=>keys[e.key]=false);

// MOBILE
function bindTouch(id, key){
  const el = document.getElementById(id);

  el.addEventListener("touchstart", e=>{
    e.preventDefault();
    keys[key] = true;
  });

  el.addEventListener("touchend", e=>{
    e.preventDefault();
    keys[key] = false;
  });
}

bindTouch("left","ArrowLeft");
bindTouch("right","ArrowRight");
bindTouch("jump","ArrowUp");
bindTouch("shoot"," ");

setupEditor(canvas);

// LEVEL
let levelText = `
##########
#        #
#   ==   #
#        #
#  E  E  #
##########
`;

let data = parseLevel(levelText);
platforms = data.platforms;
enemies = data.enemies;

// ✅ FIX CRASH
function resetLevel(){
  player.x = 20;
  player.y = 150;
  player.vx = 0;
  player.vy = 0;
}

function draw(){
  clearScreen(ctx);

  ctx.fillStyle="#FFF";
  ctx.fillText("BUBBLE DRAGON", 20, 10);

  platforms.forEach(p=>drawRect(ctx,p.x,p.y,p.w,p.h,6));

  drawSprite(ctx, SPRITES.player, player.x, player.y, 14);

  bubbles.forEach(b=>{
    drawSprite(ctx, SPRITES.bubble, b.x, b.y, 9);
  });

  enemies.forEach(e=>{
    drawSprite(ctx, SPRITES.enemy, e.x, e.y, e.trapped?15:12);
  });

  drawScanlines(ctx);
}

function loop(){
  frame++;

  updatePlayer(keys);
  updateBubbles();
  updateEnemies();

  draw();

  requestAnimationFrame(loop);
}

loop();
