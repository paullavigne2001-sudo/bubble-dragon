let bubbles = [];

function shootBubble(){
  bubbles.push({
    x: player.x + player.w/2,
    y: player.y + player.h/2,
    vx: player.dir * 2,
    vy: 0,
    w: 8,
    h: 8,
    life: 0,
    capturedEnemy: null
  });

  player.shootingTimer = 10; // animation bouche
}

function updateBubbles(){
  bubbles.forEach(b=>{
    b.life++;

    // phase 1 : déplacement horizontal
    if(b.life < 20){
      b.x += b.vx;
    } else {
      // phase 2 : montée
      b.y -= 1;
    }

    // capture
    if(!b.capturedEnemy){
      enemies.forEach(e=>{
        if(!e.trapped && hit(b,e)){
          e.trapped = true;
          b.capturedEnemy = e;
        }
      });
    }

    // si ennemi capturé → il suit la bulle
    if(b.capturedEnemy){
      b.capturedEnemy.x = b.x;
      b.capturedEnemy.y = b.y;
    }
  });

  bubbles = bubbles.filter(b=>b.y > -20);
}
