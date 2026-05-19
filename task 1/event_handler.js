initializeBoard();
createBoardUI();
updateBoardUI();
document.querySelectorAll(".cell").forEach(cell=>{
  cell.addEventListener("click", ()=>{
    if(gamePaused) return;
    const r = parseInt(cell.dataset.row);
    const c = parseInt(cell.dataset.col);
    placeOrb(r,c);
  });
});
document.getElementById("pauseBtn")
.addEventListener("click", ()=>{
  gamePaused = true;
});
document.getElementById("resumeBtn")
.addEventListener("click", ()=>{
  gamePaused = false;
});
document.getElementById("restartBtn")
.addEventListener("click", ()=>{
  location.reload();
});
const gameInterval = setInterval(()=>{
  if(gamePaused) return;
  gameTime--;
  document.getElementById("gameTimer")
    .innerText = gameTime;
  if(gameTime<=0){
    clearInterval(gameInterval);
    clearInterval(turnInterval);
    let p1 = parseInt(
      document.getElementById("p1Score").innerText
    );
    let p2 = parseInt(
      document.getElementById("p2Score").innerText
    );
    let winner;
    if(p1>p2) winner="Player 1 Wins!";
    else if(p2>p1) winner="Player 2 Wins!";
    else winner="Draw!";
    document.getElementById("winnerPopup")
      .classList.remove("hidden");
    document.getElementById("winnerText")
      .innerText = winner;
  }
},1000);
const turnInterval = setInterval(()=>{
  if(gamePaused) return;
  turnTime--;
  document.getElementById("turnTimer")
    .innerText = turnTime;
  if(turnTime<=0){
    currentPlayer = currentPlayer===1 ? 2 : 1;
    document.getElementById("turnText")
      .innerText = `Player ${currentPlayer}`;
    turnTime = 15;
  }
},1000);