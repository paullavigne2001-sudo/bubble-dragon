let enemies = [];

function updateEnemies(){
  enemies.forEach(e=>{
    if(e.trapped){
      e.y -= 0.5;
      if(hit(e,player)) e.dead=true;
      return;
    }

    e.x += e.vx;
    e.vy += 0.3;
    e.y += e.vy;

    platforms.forEach(p=>{
      if(hit(e,p) && e.vy>0){
        e.y = p.y-e.h;
        e.vy = 0;
      }
    });

    if(e.x<0 || e.x>150) e.vx *= -1;

    if(hit(e,player)) resetLevel();
  });

  enemies = enemies.filter(e=>!e.dead);
}
