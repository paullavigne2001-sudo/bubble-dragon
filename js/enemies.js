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

    // limites horizontales (interieur des murs : 16px a gauche, 144px a droite)
    if(e.x <= 16){ e.x = 16; e.vx = 1; }
    if(e.x >= 144 - e.w){ e.x = 144 - e.w; e.vx = -1; }

    // limite basse : ne pas sortir de l'ecran
    if(e.y >= 192 - e.h){
      e.y = 192 - e.h;
      e.vy = 0;
    }

    if(hit(e,player)){
      resetLevel();
    }
  });
};
