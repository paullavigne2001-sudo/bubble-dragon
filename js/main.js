const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 160;
canvas.height = 200;

let keys = {};

addEventListener("keydown", e => keys[e.key] = true);
addEventListener("keyup", e => keys[e.key] = false);

// mobile
function bindTouch(id, key){
  const el = document.getElementById(id);
  if(!el) return;

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

// editeur
setupEditor(canvas);

// LEVEL
let levelText = `
##########
#        #
#  E     #
# ====   #
#        #
#     E  #
#  ====  #
#        #
#  E     #
# ====   #
#        #
##########
`;

let data = parseLevel(levelText);

let offsetY = 0;

platforms = data.platforms.map(p=>({...p}));
enemies = data.enemies.map(e=>({...e}));

// spawn joueur
spawnPlayer();

function spawnPlayer(){
  if(platforms.length === 0) return;

  let p = platforms.reduce((a,b)=> b.y > a.y ? b : a);

  player.x = p.x + p.w/2 - player.w/2;
  player.y = p.y - player.h;
}

// reset
function resetLevel(){
  enemies = data.enemies.map(e=>({...e}));
  window.bubbles = [];
  spawnPlayer();
}

// draw
function draw(){
  clearScreen(ctx);

  ctx.fillStyle="#FFF";
  ctx.font="6px monospace";
  ctx.fillText("BUBBLE DRAGON", 20, 10);

  platforms.forEach(p=>{
    drawRect(ctx,p.x,p.y,p.w,p.h,6);
  });

  if(typeof SPRITES !== "undefined"){
    let sprite = player.shootingTimer > 0
      ? SPRITES.player_shoot
      : SPRITES.player_idle;

    drawSprite(ctx, sprite, player.x, player.y, 10);
  }

  bubbles.forEach(b=>{
    drawSprite(ctx, SPRITES.bubble, b.x, b.y, 9);
  });

  enemies.forEach(e=>{
    drawSprite(ctx, SPRITES.enemy, e.x, e.y, e.trapped?15:12);
  });

  drawScanlines(ctx);
}

// loop
function loop(){
  frame++;

  updatePlayer(keys);
  updateBubbles();
  updateEnemies();

  draw();

  requestAnimationFrame(loop);
}

loop();
