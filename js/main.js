const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ✅ FIX rendu canvas (important)
canvas.width = 160;
canvas.height = 200;

// ==========================
// INPUT CLAVIER
// ==========================
let keys = {};

addEventListener("keydown", e => keys[e.key] = true);
addEventListener("keyup", e => keys[e.key] = false);

// ==========================
// INPUT MOBILE
// ==========================
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

// ==========================
// ÉDITEUR
// ==========================
setupEditor(canvas);

// ==========================
// LEVEL (ASCII)
// ==========================
let levelText = `
##########
#        #
#   ==   #
#        #
#  E  E  #
##########
`;

let data = parseLevel(levelText);

// 🔥 calcul hauteur niveau
let maxY = 0;
data.platforms.forEach(p=>{
  if(p.y > maxY) maxY = p.y;
});

// décalage pour centrer
let offsetY = (200 - maxY) / 2;

// appliquer offset
platforms = data.platforms.map(p=>({
  ...p,
  y: p.y + offsetY
}));

enemies = data.enemies.map(e=>({
  ...e,
  y: e.y + offsetY
}));

// ==========================
// RESET
// ==========================
function resetLevel(){
  player.x = 20;
  player.y = 150;
  player.vx = 0;
  player.vy = 0;
}

// ==========================
// DRAW
// ==========================
function draw(){
  clearScreen(ctx);

  // titre
  ctx.fillStyle = "#FFF";
  ctx.font = "6px monospace";
  ctx.fillText("BUBBLE DRAGON", 20, 10);

  // plateformes
  platforms.forEach(p=>{
    drawRect(ctx, p.x, p.y, p.w, p.h, 6);
  });

  // joueur avec animation
  let sprite = player.shootingTimer > 0 
    ? SPRITES.player_shoot 
    : SPRITES.player_idle;

drawSprite(ctx, sprite, player.x, player.y, 10);

  // bulles
  bubbles.forEach(b=>{
    drawSprite(ctx, SPRITES.bubble, b.x, b.y, 9);
  });

  // ennemis
  enemies.forEach(e=>{
    drawSprite(ctx, SPRITES.enemy, e.x, e.y, e.trapped ? 15 : 12);
  });

  // effet CRT
  drawScanlines(ctx);
}

// ==========================
// LOOP
// ==========================
function loop(){
  frame++;

  updatePlayer(keys);
  updateBubbles();
  updateEnemies();

  draw();

  requestAnimationFrame(loop);
}

// ==========================
// START
// ==========================
loop();
