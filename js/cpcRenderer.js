const CPC_COLORS = [
  "#000","#00A","#0A0","#0AA",
  "#A00","#A0A","#A50","#AAA",
  "#555","#55F","#5F5","#5FF",
  "#F55","#F5F","#FF5","#FFF"
];

let frame = 0;

function clearScreen(ctx){
  ctx.fillStyle = CPC_COLORS[0];
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawRect(ctx,x,y,w,h,color){
  ctx.fillStyle = CPC_COLORS[color];
  ctx.fillRect(x,y,w,h);
}

function drawSprite(ctx, sprite, x, y, color){
  for(let j=0;j<sprite.length;j++){
    for(let i=0;i<sprite[j].length;i++){
      let c = sprite[j][i];

      if(c === "X"){
        drawRect(ctx, x+i, y+j, 1, 1, color);
      }

      if(c === "O"){
        drawRect(ctx, x+i, y+j, 1, 1, 15); // blanc
      }
    }
  }
}

function drawScanlines(ctx){
  for(let y=0; y < ctx.canvas.height; y += 2){
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, y, ctx.canvas.width, 1);
  }
}
