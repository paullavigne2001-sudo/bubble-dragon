let editMode = false;

function setupEditor(canvas){
  canvas.addEventListener("mousedown", e=>{
    if(!editMode) return;

    let rect = canvas.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left)/4)*4;
    let y = Math.floor((e.clientY - rect.top)/2)*2;

    if(e.button === 0){
      platforms.push({x,y,w:32,h:5});
    }

    if(e.button === 2){
      platforms = platforms.filter(p=>!(x>p.x && x<p.x+p.w && y>p.y && y<p.y+p.h));
    }
  });

  canvas.addEventListener("contextmenu", e=>e.preventDefault());

  addEventListener("keydown", e=>{
    if(e.key==="e") editMode = !editMode;
    if(e.key==="d") downloadLevel();
  });
}
