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
    floatOffset: Math.random() * Math.PI * 2,
    floatOffsetX: Math.random() * Math.PI * 2,
    capturedEnemy: null
  });

  player.shootingTimer = 10;
};

window.updateBubbles = function(){
  bubbles.forEach(b=>{
    b.life++;

    if(b.life < 30){
      b.x += b.vx;
    } else {
      const t = b.life * 0.03;
      b.y += Math.sin(t + b.floatOffset) * 0.4 - 0.15;
      b.x += Math.sin(t * 0.7 + b.floatOffsetX) * 0.3;
      if(b.x < 5)   b.x = 5;
      if(b.x > 152) b.x = 152;
      if(b.y < 12)  b.y = 12;
      if(b.y > 185) b.y = 185;
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

    // eclate apres 10 secondes (600 frames)
    if(b.life > 600){
      if(b.capturedEnemy){
        b.capturedEnemy.trapped = false;
        b.capturedEnemy.vx = 1;
      }
      b.life = -999;
    }

    if(b.capturedEnemy){
      b.capturedEnemy.x = b.x;
      b.capturedEnemy.y = b.y;

      if(hit(player, b)){
        enemies = enemies.filter(e => e !== b.capturedEnemy);
        b.life = -999;
      }
    }
  });

  window.bubbles = bubbles.filter(b => b.life !== -999);
};
