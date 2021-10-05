const ALIEN_SPEED = 500; 
var gIntervalAliens; 
var gAlienCount = 0;
var gIsAlienFreeze = false;
 
// The following two variables represent the part of the matrix (some rows) 
// that we should shift (left, right, and bottom) 
// We need to update those when: 
// (1) shifting down and (2) last alien was cleared from row 
var gAliensTopRowIdx;  
var gAliensBottomRowIdx; 
 
var gIsAlienFreeze = true; 
//move direction: 1=right, 2=left, 3=down.
var gMoveDirection = 1;
var gMoveDownCounter = 1;
 
function addAliensToBoard(board) {
    for (var i = 0; i < (board.length/3); i++){
        for (var j = 0; j < (board[0].length/2); j++){
            var alien = { type: SKY, gameElement: ALIEN };
            board[i][j] = alien;
        }
    }
    return board;
} 
function aliensMoving(){
    console.log(gMoveDirection);
    switch (gMoveDirection) {
        case 1:
            renderBoard(shiftBoardRight(gBoard));
            break;
        case 2:
            renderBoard(shiftBoardLeft(gBoard));
            break;
        case 3:
            renderBoard(shiftBoardDown(gBoard));
            break;
    }

}
function aliensGotToRightEdge(){
    for (i = 0; i < gBoard.length; i ++) {
        if (gBoard[i][gBoard.length -1].gameElement === ALIEN) {
            console.log('checking')
            gMoveDirection = 3;
            return true
        }
    }
    return false;
}
function aliensGotToLeftEdge(){
    for (i = 0; i < gBoard.length; i ++) {
        if (gBoard[i][0].gameElement === ALIEN) {
            gMoveDirection = 3;
            return true;
        }
    }
    return false;
}

function shiftBoardRight(board) {
aliensGotToRightEdge();
if (gMoveDirection !== 1) {
    return board;
}
    var nextBoard = board;
    for (var i = (board.length - 2); i >= 0; i--){
        for (var j = (board[0].length -1); j >= 0; j--){
            if (board[i][j].gameElement === ALIEN){
                nextBoard[i][j + 1].gameElement = ALIEN;
                nextBoard[i][j].gameElement = '';
            }
        }
    }
    
    return nextBoard;
} 
function shiftBoardLeft(board) {
    aliensGotToLeftEdge();
    if (gMoveDirection !== 2) {
        return board;
    }
    var nextBoard = board;
    for (var i = 0; i < (board.length - 2); i++){
        for (var j = 0; j < (board[0].length); j++){
            if (board[i][j].gameElement === ALIEN){
                nextBoard[i][j-1].gameElement = ALIEN;
                nextBoard[i][j].gameElement = '';
            }
        }
    }
    
    return nextBoard;
} 
function shiftBoardDown(board, fromI, toI) {
    var nextBoard = board;
    for (var i = (board.length - 2); i >= 0; i--){
        for (var j = (board[0].length -1); j >= 0; j--){
            if (board[i][j].gameElement === ALIEN){
                nextBoard[i+1][j].gameElement = ALIEN;
                nextBoard[i][j].gameElement = '';
            }
        }
    }
    gMoveDownCounter++;
    if (gMoveDownCounter%2 === 0) {
        gMoveDirection = 2;
    } else { gMoveDirection = 1};
    return nextBoard;
} 
 
// runs the interval for moving aliens side to side and down 
// it re-renders the board every time 
// when the aliens are reaching the hero row - interval stops 
function moveAliens() {}