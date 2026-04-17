let player = {x:20,y:150,vx:0,vy:0,w:8,h:8,onGround:false,dir:1};

function updatePlayer(keys){
  player.vx = 0;

  if(keys["ArrowLeft"]){ player.vx=-2; player.dir=-1;}
  if(keys["ArrowRight"]){ player.vx=2; player.dir=1;}

  if(keys["ArrowUp"] && player.onGround){
    player.vy = -5;
  }

  player.vy += 0.3;
  player.x += player.vx;
  player.y += player.vy;

  player.onGround=false;

  platforms.forEach(p=>{
    if(hit(player,p) && player.vy>0){
      player.y = p.y-player.h;
      player.vy = 0;
      player.onGround=true;
    }
  });

  if(keys[" "]){
    shootBubble();
    keys[" "] = false;
  }
}
