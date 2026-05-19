function getCapacity(r,c){
  let capacity = 4;
  if(
    (r===0 && c===0) ||
    (r===0 && c===COLS-1) ||
    (r===ROWS-1 && c===0) ||
    (r===ROWS-1 && c===COLS-1)
  ){
    capacity = 2;
  }
  else if(
    r===0 || c===0 || r===ROWS-1 || c===COLS-1
  ){
    capacity = 3;
  }
  return capacity;
}
function getNeighbors(r,c){
  let neighbors=[];
  if(r>0) neighbors.push([r-1,c]);
  if(r<ROWS-1) neighbors.push([r+1,c]);
  if(c>0) neighbors.push([r,c-1]);
  if(c<COLS-1) neighbors.push([r,c+1]);
  return neighbors;
}
function placeOrb(r,c){
  let cell = board[r][c];
  if(
    cell.player !==0 &&
    cell.player !== currentPlayer
  ){
    return;
  }
  cell.player = currentPlayer;
  cell.count++;
  explode(r,c);
  moveCount++;
  updateBoardUI();
  updateScores();
  checkWinner();
  currentPlayer = currentPlayer===1 ? 2 : 1;
  document.getElementById("turnText").innerText =
    `Player ${currentPlayer}`;
  turnTime = 15;
}
function explode(r,c){
  let cell = board[r][c];
  let capacity = getCapacity(r,c);
  if(cell.count < capacity){
    return;
  }
  cell.count = 0;
  cell.player = 0;
  let neighbors = getNeighbors(r,c);
  neighbors.forEach(([nr,nc])=>{
    board[nr][nc].count++;
    board[nr][nc].player = currentPlayer;
    explode(nr,nc);
  });
}
function checkWinner(){
  if(moveCount < 2) return;
  let p1Exists=false;
  let p2Exists=false;
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      if(board[r][c].player===1){
        p1Exists=true;
      }
      if(board[r][c].player===2){
        p2Exists=true;
      }}}
  if(!p1Exists || !p2Exists){
    let winner = p1Exists ? 1 : 2;
    document.getElementById("winnerPopup")
      .classList.remove("hidden");
    document.getElementById("winnerText")
      .innerText = `Player ${winner} Wins!`;
    clearInterval(gameInterval);
    clearInterval(turnInterval);
  }
}