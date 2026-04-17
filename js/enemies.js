let enemies = [];

function updateEnemies(){
  enemies.forEach(e=>{

    if(e.trapped){
      e.y -= 0.5;
      if(hit(e,player)) e.dead = true;
      return;
    }

    // vitesse stable
    if(!e.vx) e.vx = 1;

    e.x += e.vx;

    // gravité douce
    e.vy += 0.2;
    e.y += e.vy;

    let onGround = false;

    platforms.forEach(p=>{
      if(hit(e,p) && e.vy > 0){
        e.y = p.y - e.h;
        e.vy = 0;
        onGround = true;
      }
    });

    // rebond bords
    if(e.x <= 0){
      e.x = 0;
      e.vx = 1;
    }

    if(e.x >= 160 - e.w){
      e.x = 160 - e.w;
      e.vx = -1;
    }

    // limite bas écran
    if(e.y > 200 - e.h){
      e.y = 200 - e.h;
      e.vy = 0;
    }

    // collision joueur
    if(hit(e,player)){
      resetLevel();
    }
  });

  enemies = enemies.filter(e=>!e.dead);
}
