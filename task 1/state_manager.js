const ROWS = 6;
const COLS = 12;
let currentPlayer = 1;
let board = [];
let gamePaused = false;
let gameTime = 300;
let turnTime = 15;
let moveCount = 0;
function initializeBoard() {
  board = [];
  for(let r=0;r<ROWS;r++){
    let row=[];
    for(let c=0;c<COLS;c++){
      row.push({
        player:0,
        count:0
      });
    }
    board.push(row);
  }
}