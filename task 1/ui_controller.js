const boardElement = document.getElementById("board");

function createBoardUI(){
  boardElement.innerHTML="";
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      boardElement.appendChild(cell);
    }}}
function updateBoardUI(){
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell=>{
    cell.innerHTML="";
    let r = cell.dataset.row;
    let c = cell.dataset.col;
    let data = board[r][c];
    for(let i=0;i<data.count;i++){
      const orb = document.createElement("div");
      orb.classList.add("orb");
      orb.classList.add(
        data.player===1 ? "player1" : "player2"
      );
      orb.style.left = `${10 + (i*15)}px`;
      orb.style.top = `15px`;
      cell.appendChild(orb);
    }
  });
}
function updateScores(){
  let p1=0;
  let p2=0;
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      if(board[r][c].player===1){
        p1 += board[r][c].count;
      }
      if(board[r][c].player===2){
        p2 += board[r][c].count;
      }}}
  document.getElementById("p1Score").innerText = p1;
  document.getElementById("p2Score").innerText = p2;
}