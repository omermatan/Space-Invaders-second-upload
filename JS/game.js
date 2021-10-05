const BOARD_SIZE = 14; 
const ALIENS_ROW_LENGTH = 8 
const ALIENS_ROW_COUNT = 3 

var HERO_IMG = '<img src="img/hero.png" />';
var ALIEN_IMG = '<img src="img/alien.png" />';
var LASER_IMG = '<img src="img/Laser.png" />';
var BOOM_IMG = '<img src="img/boom.png" />';
var BIRD_IMG = '<img src="img/bird.png" />';
var BIRDDEAD_IMG = '<img src="img/birdDead.png" />'; 
var LAND_IMG = '<img src="img/land.png" />'; 
 
const HERO = '♆'; 
const ALIEN = '👽A'; 
const LASER = '⤊'; 
const BIRD = '#'
//types of cells:
const SKY = 'sky';
const EARTH = 'earth';
const PLAYER = 'player';
// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN} 
var gBoard; 
var gGame = { 
    isOn: false, 
} 
var gPaused = false;
var gGamerPos = {i:2,j:3};
 
// Called when game loads 
function init() {
	alienCount = 35;
	heroScore = 0;
    renderBoard(createBoard());
 	gIntervalAliensID = setInterval(aliensMoving, 1100);
	
} 
// Create and returns the board with aliens on top, ground at bottom 
// use the functions: createCell, createHero, createAliens  
function createBoard() {
    	// Create the Matrix
	var board = createMat(BOARD_SIZE, BOARD_SIZE);

	// Put SKY everywhere and EARTH on the bottom
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put SKY in a regular cell
			var cell = { type: SKY, gameElement: '' };
			board[i][j] = cell;
			// Place Walls at edges
			if (i === (board.length - 1)) {
				cell.type = EARTH;
				cell.gameElement = EARTH;
			}
			
		}
	}
    gBoard = board;
  //  console.log(board);
    addHeroToBoard(board);
    addAliensToBoard(board);
	addBirdsToBoard(board);
    gBoard = board;
    return board;
    
} 
 
// Render the board as a  to the page 
function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];
			
			var cellClass = getClassName({ i, j })

			cellClass += (currCell.type === SKY) ? ' sky' : ' earth';
			strHTML += `\t<td class="cell ${cellClass}">\n`;

		
			switch (currCell.gameElement) {
				case HERO:
					strHTML += HERO_IMG;
					break;
				case ALIEN:
					strHTML += ALIEN_IMG;
					break;	
				case BIRD:
					strHTML += BIRD_IMG;
					break;	
				case EARTH:
					strHTML += LAND_IMG;
					break;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}
 
// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
function createCell(gameObject = null) { 
    return { 
        type: SKY, 
        gameObject: gameObject} 
    } 
    /*position such as: {i: 2, j: 7} 
    function updateCell(pos, gameObject = null) { 
		console.log('ggggf', gameObject)
        gBoard[pos.i][pos.j].gameObject = gameObject; 
        var elCell = getElCell(pos); 
        elCell.innerHTML = gameObject; 
    }
    //gameObject || '' */

	function endGameVerifier(){
		if (gAlienCount === 0) {
			victory();
			clearInterval(gIntervalAliensID);
			return;
		}
		else {
		for (var j = 0 ; j < (gBoard.length - 1); j++){
			var i =	(gBoard.length - 2);
			if (gBoard[i][j].gameElement === ALIEN){
				earthIsLost();
				clearInterval(gIntervalAliensID);
				return;
			}
		}
		}
		return;
	}

	function victory() {
		alert('VICTORY! Thank you! you SAVED EARTH!')
	}
	function earthIsLost() {
		alert('You LOST! Aliens landed on earth! we are DOOMED!')
	}