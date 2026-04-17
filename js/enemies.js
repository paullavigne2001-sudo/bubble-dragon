window.enemies = [];

window.updateEnemies = function(){
  enemies.forEach(e=>{

    if(e.trapped) return;

    if(!e.vx) e.vx = 1;

    e.x += e.vx;
    e.vy += 0.2;
    e.y += e.vy;

    platforms.forEach(p=>{
      if(hit(e,p) && e.vy > 0){
        e.y = p.y - e.h;
        e.vy = 0;
      }
    });

    if(e.x <= 0){ e.x = 0; e.vx = 1; }
    if(e.x >= 160 - e.w){ e.x = 160 - e.w; e.vx = -1; }

    if(hit(e,player)){
      resetLevel();
    }
  });
};
