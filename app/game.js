document.addEventListener('DOMContentLoaded', function() {
  
  // CONFIGURATION
  var width = 5;
  var height = 5;
  var cells = width*height;

  // LIBRARY CODE
  var addCells = function(board) {
    for (var i = 0; i < cells; i++) {
      var d = document.createElement("div");
      d.classList.add('cell');
      d.id = 'cell_' + i;
      d.onclick = function() { sel(this); };
      board.appendChild(d);
    }
  };

  var sel = function(c) {
    c.classList.toggle('on');
    var i = c.id.split('_')[1];
    var c = itoc(i);
    var x = c[0];
    var y = c[1];
    var n = [];
    var l = board.childNodes;
    if (x > 0) { n.push(l[ctoi(x-1, y)]) }
    if (x < width-1) { n.push(l[ctoi(x+1, y)]) }
    if (y > 0) { n.push(l[ctoi(x, y-1)]) }
    if (y < height-1) { n.push(l[ctoi(x, y+1)]) }

    for (var i = 0; i < n.length; i++) {
      n[i].classList.toggle('on');
    }

    checkForWin(board);
  };

  var shuffle = function() {
    var cs = board.childNodes;
    for (var i = 0; i < cs.length; i++) {
      if (Math.floor(Math.random() * (5 - 0)) + 0 == 0) {
        cs[i].classList.toggle('on');
      }
    }
  };

  var isWon = function(board) {
    var l = board.childNodes;
    for (var i = 0; i < l.length; i++) {
      if (l[i].classList.contains('on')) {
        return false;
      }
    }
    return true;
  };

  var checkForWin = function(board) {
    if (isWon(board)) {
      var r = confirm("Congratulations, you won! Play again?");
      if (r) {
        shuffle(board);
      } else {
        document.body.innerHTML = '<h1>Lights out!</><h2>Game Over</h2>';
      }
    }
  };

  var itoc = function(i) {
    return [Math.floor(i/width), i%width];
  };

  var ctoi = function(x, y) {
    return width * x + y;
  };

  // MAIN LOGIC
  var board = document.getElementById('board');
  addCells(board);
  shuffle(board);
  checkForWin(board);

}, false);
