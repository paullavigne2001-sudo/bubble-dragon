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
    } else {
      // flottement sinusoïdal : chaque bulle a sa propre phase
      if(!b.floatOffset) b.floatOffset = Math.random() * Math.PI * 2;
      if(!b.floatOffsetX) b.floatOffsetX = Math.random() * Math.PI * 2;
      const t = b.life * 0.03;
      b.y += Math.sin(t + b.floatOffset) * 0.4 - 0.15;
      b.x += Math.sin(t * 0.7 + b.floatOffsetX) * 0.3;
      // rebondir sur les bords
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

  window.bubbles = bubbles.filter(b => b.life !== -999);
};
