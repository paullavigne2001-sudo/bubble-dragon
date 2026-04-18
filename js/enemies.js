window.enemies = [];

window.updateEnemies = function(){
  enemies.forEach(e=>{

    if(e.trapped) return;

    if(!e.vx) e.vx = 0.5;
    if(!e.jumpTimer) e.jumpTimer = Math.floor(Math.random() * 120) + 60;

    e.jumpTimer--;
    if(e.jumpTimer <= 0 && e.onGround){
      e.vy = -3.5;
      e.onGround = false;
      e.jumpTimer = Math.floor(Math.random() * 120) + 60;
    }

    e.x += e.vx;
    e.vy += 0.2;
    e.y += e.vy;

    e.onGround = false;

    platforms.forEach(p=>{
      if(!hit(e, p)) return;

      // atterrissage
      if(e.vy > 0){
        e.y = p.y - e.h;
        e.vy = 0;
        e.onGround = true;
      }

      // plafond solide uniquement
      if(e.vy < 0 && p.solid){
        e.y = p.y + p.h;
        e.vy = 0;
      }
    });

    // limites horizontales
    if(e.x <= 16){ e.x = 16; e.vx = 0.5; }
    if(e.x >= 144 - e.w){ e.x = 144 - e.w; e.vx = -0.5; }

    // limite basse
    if(e.y >= 192 - e.h){
      e.y = 192 - e.h;
      e.vy = 0;
      e.onGround = true;
    }

    if(hit(e, player)){
      resetLevel();
    }
  });
};
