let bubbles = [];

function shootBubble(){
  bubbles.push({
    x:player.x,
    y:player.y,
    vx:player.dir*2,
    vy:-0.5,
    w:6,h:6
  });
}

function updateBubbles(){
  bubbles.forEach(b=>{
    b.x += b.vx;
    b.y += b.vy;
    b.vy -= 0.02;

    enemies.forEach(e=>{
      if(!e.trapped && hit(b,e)){
        e.trapped = true;
      }
    });
  });

  bubbles = bubbles.filter(b=>b.x>0 && b.x<160 && b.y>0);
}
