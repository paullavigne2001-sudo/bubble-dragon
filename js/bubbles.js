let bubbles = [];

function shootBubble(){
  bubbles.push({
    x: player.x + player.w/2,
    y: player.y + player.h/2,
    vx: player.dir * 2,
    vy: 0, // 🔥 plus de diagonale
    w: 6,
    h: 6,
    life: 0
  });
}

function updateBubbles(){
  bubbles.forEach(b=>{
    b.life++;

    // déplacement horizontal au début
    if(b.life < 20){
      b.x += b.vx;
    } else {
      // puis montée verticale
      b.y -= 1;
    }

    // capture ennemi
    enemies.forEach(e=>{
      if(!e.trapped && hit(b,e)){
        e.trapped = true;
      }
    });
  });

  bubbles = bubbles.filter(b=>b.x>0 && b.x<160 && b.y>0);
}
