var LASER_SPEED = 80; 
var isLaserInSky = false;
var isLaserDone = false
var gHero = {pos: {i:12, j: 5}, isShoot: false}; 
var gIntervalID;
var heroScore = 0;
var isMegaShoot = false;
var megaShootCount = 3;
var isSuperShoot = false;
var superShootCounter = 3;
 
// creates the hero and place it on board 
function addHeroToBoard(board) {
    var hero = { type: SKY, gameElement: HERO };
    gGamerPos = {i: (board.length - 2),j: getRandomNumInc(0,board[0].length - 1)}
    board[gGamerPos.i][gGamerPos.j] = hero;
    return board;
} 
function addBirdsToBoard(board) {
    var bird = { type: SKY, gameElement: BIRD};
    for (var j = 1; j < (board.length/3); j++)
    board[board.length - 4][j*3] = bird;
    return board;
}
// Handle game keys 
function handleKey(event) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case ' ':
            shoot();
			break;
        case 'n':
            megaShoot();
            break;
        case 'x':
            superShoot();
            break;
    }
	//setTimeout(function(){verifyVictory(gBoard)},500);
}
// Move the hero right (1) or left (-1) 
function moveTo(i, j) {
	if (gPaused) {
		return;
	}
    if (j < 0 || j > (gBoard.length -1)) {
        return;
    }
	
//	var targetCell = gBoard[i][j];


/*things I might add:
	if (targetCell.gameElement === BOMB) {
		console.log('BOMB');
		playSound();
	} */

	/* if (targetCell.gameElement === EXTRALIFE) {
		console.log('LIFE');

	
	}*/
	
		

		// MOVING from current position
    updateCell(gGamerPos, '', '');

	// MOVING to selected position
	// Model:
	gGamerPos.i = i;
	gGamerPos.j = j;
    updateCell(gGamerPos, HERO, HERO_IMG);

}
// Sets an interval for shutting (blinking) the laser up towards aliens 
function shoot() {
    if (isLaserInSky) {
        return;
    }
    else {
        isLaserInSky = true
        blinkLaser({i: gGamerPos.i-1, j: gGamerPos.j});
        // gIntervalID = setInterval(() => {
        //     blinkLaser(laserOutPos)
        // }, LASER_SPEED);
    }
}  
function megaShoot() {
    isMegaShoot = true;
    megaShootCount--;
    shoot();
    return;
}
function superShoot() {
    if (superShootCounter === 0) {
        return;
    }
    else {
    LASER_SPEED = 30;
    isSuperShoot = true;
    superShootCounter--;
    shoot();
    LASER_SPEED = 80;
    return;
    }
}
// renders a LASER at specific cell for short time and removes it 
function blinkLaser(location) {
    if (location.i === 0) {
        updateCell(location, '', BOOM_IMG);
        setTimeout(() => {
            updateCell(location, '', '');
        }, 250);
        isLaserInSky = false;
        return;
    }
    if (gBoard[location.i][location.j].gameElement === BIRD) {
        updateCell(location, '', BOOM_IMG);
        setTimeout(() => {
            updateCell(location, BIRD, BIRD_IMG);
        }, 250);
        isLaserInSky = false;
        return
    }
    if (isMegaShoot === true){
        if (gBoard[location.i][location.j].gameElement === ALIEN) {
            heroScore++;
            gAlienCount--;
            endGameVerifier();
            setScore(heroScore);
            updateCell(location, '', BOOM_IMG);
            setTimeout(() => {
                updateCell(location, '', '');
            }, LASER_SPEED);
            isLaserInSky = false;
            isMegaShoot = false;
            killNeighbors(gBoard,location);
            return;
        }

    }
    if (gBoard[location.i][location.j].gameElement === ALIEN) {
        heroScore++;
        gAlienCount--;
        console.log(gAlienCount);
        endGameVerifier();
        setScore(heroScore);
        updateCell(location, '', BOOM_IMG);
        setTimeout(() => {
            updateCell(location, '', '');
        }, LASER_SPEED);
        isLaserInSky = false;
    }
    else {
        updateCell(location, LASER, LASER_IMG);

        // hide laser after a timeout
        setTimeout(() => {
            updateCell(location, '', '');
        }, LASER_SPEED);
        
        var laserNewPos = { i:location.i - 1, j:location.j };
        setTimeout(() => blinkLaser(laserNewPos), LASER_SPEED);
    }
    return;
}

function updateCell(location, gameElement, image) {
    console.log(location)
    if (location.i < 0 || location.i > BOARD_SIZE) {
        debugger;
    }

    if (location.j < 0 || location.j > BOARD_SIZE) {
        debugger;
    }
    
    gBoard[location.i][location.j].gameElement = gameElement;
    renderCell(location, image);
}
function setScore(score) {
	showScore = score;
	var counterElement = document.getElementById("counter");
	counterElement.innerText = showScore.toString();	
}
function killNeighbors (board, location){
    console.log('hhh')
    console.log(location.i, location.j);
    for (var i = location.i - 1; i <= location.i +1; i++) {
        console.log(location.i, location.j);
        if (i < 0 || i  >= board.length ) continue;
        for (var j = location.j - 1; j <= location.j + 1; j++){
            if (j < 0 || j >= board.length) continue;
            if (i === location.i && j === location.j) continue;
            if (board[i][j].gameElement === ALIEN) {
            console.log(board[i][j]);
               heroScore++;
               endGameVerifier();
               setScore(heroScore);
               updateCell({i:i, j:j}, '', BOOM_IMG);
               updateCell({i:i, j:j}, '', '');
               

            }
        }
    }
    return;
  }