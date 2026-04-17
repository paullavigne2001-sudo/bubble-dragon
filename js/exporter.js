function downloadLevel(){
  const data = JSON.stringify({platforms, enemies}, null, 2);

  const blob = new Blob([data], {type:"application/json"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "level.json";
  a.click();

  URL.revokeObjectURL(url);
}
