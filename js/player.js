window.player = {
  x:20, y:150,
  vx:0, vy:0,
  w:10, h:8,
  onGround:false,
  dir:1,
  shootingTimer:0
};

window.updatePlayer = function(keys){
  player.vx = 0;

  if(keys["ArrowLeft"]){  player.vx = -2; player.dir = -1; }
  if(keys["ArrowRight"]){ player.vx = 2;  player.dir =  1; }

  if(keys["ArrowUp"] && player.onGround){
    player.vy = -6;
  }

  player.vy += 0.3;
  player.x += player.vx;
  player.y += player.vy;

  player.onGround = false;

  platforms.forEach(p=>{
    if(!hit(player, p)) return;

    const wasAbove = (player.y + player.h - player.vy) <= p.y;
    const wasBelow = (player.y - player.vy) >= (p.y + p.h);

    // atterrissage : le joueur venait d'au-dessus
    if(player.vy > 0 && wasAbove){
      player.y = p.y - player.h;
      player.vy = 0;
      player.onGround = true;
    }

    // plafond solide : le joueur venait d'en dessous
    if(player.vy < 0 && p.solid && wasBelow){
      player.y = p.y + p.h;
      player.vy = 0;
    }
  });

  // limites murs lateraux
  player.x = Math.max(16, Math.min(144 - player.w, player.x));

  if(player.y > 192 - player.h){
    player.y = 192 - player.h;
    player.vy = 0;
    player.onGround = true;
  }

  if(keys[" "] && player.shootingTimer === 0){
    shootBubble();
    keys[" "] = false;
  }

  if(player.shootingTimer > 0){
    player.shootingTimer--;
  }
};
