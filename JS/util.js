// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN} 
function createCell(gameObject = null) { 
    return { 
      type: SKY, 
      gameObject: gameObject 
    } 
  } 
   
   
  function getElCell(pos) { 
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`); 
  } 
  function getClassName(location) {
    var cellClassName = 'cell-' + location.i + '-' + location.j;
    return cellClassName;
  }
   
    
  function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getRandomNumInc(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location);
	var elCell = document.querySelector(cellSelector);

	elCell.innerHTML = value;
}