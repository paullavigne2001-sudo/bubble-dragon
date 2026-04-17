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

    if(b.life < 20){
      b.x += b.vx;
    } else {
      b.y -= 1;
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
    }
  });

  bubbles = bubbles.filter(b=>b.y > -20);
};
