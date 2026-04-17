function parseLevel(text){
  let lines = text.trim().split("\n");

  let platforms = [];
  let enemies = [];

  const TILE = 16;

  lines.forEach((line,y)=>{
    [...line].forEach((c,x)=>{

      if(c === "#"){
        platforms.push({x:x*TILE,y:y*TILE,w:TILE,h:TILE});
      }

      if(c === "="){
        platforms.push({x:x*TILE,y:y*TILE,w:TILE,h:5});
      }

      if(c === "E"){
        enemies.push({x:x*TILE,y:y*TILE,vx:1,vy:0,w:10,h:10,trapped:false});
      }

    });
  });

  return {platforms,enemies};
}
