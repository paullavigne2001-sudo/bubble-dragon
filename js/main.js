const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let keys = {};

addEventListener("keydown", e=>keys[e.key]=true);
addEventListener("keyup", e=>keys[e.key]=false);

setupEditor(canvas);

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

function draw(){
  clearScreen(ctx);

  platforms.forEach(p=>drawRect(ctx,p.x,p.y,p.w,p.h,6));
  drawRect(ctx,player.x,player.y,player.w,player.h,14);

  bubbles.forEach(b=>drawRect(ctx,b.x,b.y,b.w,b.h,9));

  enemies.forEach(e=>{
    drawRect(ctx,e.x,e.y,e.w,e.h,e.trapped?15:12);
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
