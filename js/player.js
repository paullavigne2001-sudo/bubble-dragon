// ⚠️ NE DOIT EXISTER QU’UNE SEULE FOIS
let player = {
  x:20,y:150,
  vx:0,vy:0,
  w:10,h:8,
  onGround:false,
  dir:1,
  shootingTimer:0
};

function updatePlayer(keys){
  player.vx = 0;

  if(keys["ArrowLeft"]){ player.vx = -2; player.dir = -1; }
  if(keys["ArrowRight"]){ player.vx = 2; player.dir = 1; }

  if(keys["ArrowUp"] && player.onGround){
    player.vy = -5;
  }

  player.vy += 0.3;
  player.x += player.vx;
  player.y += player.vy;

  player.onGround = false;

  platforms.forEach(p=>{
    if(hit(player,p) && player.vy > 0){
      player.y = p.y - player.h;
      player.vy = 0;
      player.onGround = true;
    }
  });

  // limites écran
  if(player.x < 0) player.x = 0;
  if(player.x > 160 - player.w) player.x = 160 - player.w;

  if(player.y > 200 - player.h){
    player.y = 200 - player.h;
    player.vy = 0;
    player.onGround = true;
  }

  // tir
  if(keys[" "]){
    shootBubble();
    keys[" "] = false;
  }

  if(player.shootingTimer > 0){
    player.shootingTimer--;
  }
}
