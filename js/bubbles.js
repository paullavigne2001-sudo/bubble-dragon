window.bubbles = [];

window.shootBubble = function(){
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

  player.shootingTimer = 10;
};

window.updateBubbles = function(){
  bubbles.forEach(b=>{
    b.life++;

    if(b.life < 30){
      b.x += b.vx;
    } else if(b.y > 2) {
      b.y -= 0.3;
    }

    if(!b.capturedEnemy){
      for(let e of enemies){
        if(!e.trapped && hit(b,e)){
          e.trapped = true;
          b.capturedEnemy = e;
          break;
        }
      }
    }

    if(b.capturedEnemy){
      b.capturedEnemy.x = b.x;
      b.capturedEnemy.y = b.y;

      // joueur éclate la bulle → ennemi éliminé
      if(hit(player, b)){
        enemies = enemies.filter(e => e !== b.capturedEnemy);
        b.life = -999; // marquer pour suppression
      }
    }
  });

  window.bubbles = bubbles.filter(b => b.y > 0 && b.life !== -999);
};
