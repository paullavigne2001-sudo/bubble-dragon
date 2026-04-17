let editMode = false;

function setupEditor(canvas){

  canvas.addEventListener("mousedown", e=>{
    if(!editMode) return;

    const rect = canvas.getBoundingClientRect();

    // conversion coordonnées écran → canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;

    // snap grille
    const TILE = 16;
    x = Math.floor(x / TILE) * TILE;
    y = Math.floor(y / TILE) * TILE;

    if(e.button === 0){
      platforms.push({x,y,w:TILE,h:5});
    }

    if(e.button === 2){
      platforms = platforms.filter(p =>
        !(x >= p.x && x <= p.x+p.w && y >= p.y && y <= p.y+p.h)
      );
    }
  });

  canvas.addEventListener("contextmenu", e=>e.preventDefault());

  window.addEventListener("keydown", e=>{
    if(e.key === "e"){
      editMode = !editMode;
      console.log("EDIT MODE:", editMode);
    }

    if(e.key === "d"){
      downloadLevel();
    }
  });
}
