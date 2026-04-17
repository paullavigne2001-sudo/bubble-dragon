// ⚠️ player défini UNE SEULE FOIS ici
window.player = {
  x:20,y:150,
  vx:0,vy:0,
  w:10,h:8,
  onGround:false,
  dir:1,
  shootingTimer:0
};

window.updatePlayer = function(keys){
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
  player.x = Math.max(0, Math.min(160 - player.w, player.x));

  if(player.y > 200 - player.h){
    player.y = 200 - player.h;
    player.vy = 0;
    player.onGround = true;
  }

  if(keys[" "]){
    shootBubble();
    keys[" "] = false;
  }

  if(player.shootingTimer > 0){
    player.shootingTimer--;
  }
};
