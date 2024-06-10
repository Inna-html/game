var board;
var score = 0;
var rows = 4;
var colums = 4;

// const keyUp = document.getElementById("keyUp");
// const keyRight = document.getElementById("keyRight");
// const keyLeft = document.getElementById("keyLeft");
// const keyDown = document.getElementById("keyDown");


// keyUp.addEventListener('click', console.log('gge'))
// keyLeft.addEventListener('click', slideLeft, setTwo)
// keyRight.addEventListener('click', slideRight, setTwo)
// keyDown.addEventListener('click', slideDown, setTwo)


window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  //   board = [
  //     [2, 2, 2, 2],
  //     [2, 2, 2, 2],
  //     [4, 4, 8, 8],
  //     [4, 4, 8, 8],
  //   ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < colums; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
  setTwo();
  setTwo();
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < colums; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }

  alert('No empty blocks. Please check the button "Up/Left" and then reload the page.');

  return false;
}

function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * colums);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerHTML = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");

  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});


document.addEventListener("click", (e) => {
  if (e.target == document.getElementById("keyLeft")) {
    slideLeft();
    setTwo();
  } else if (e.target == document.getElementById("keyRight")) {
    slideRight();
    setTwo();
  } else if (e.target == document.getElementById("keyUp")) {
    slideUp();
    setTwo();
  } else if (e.target == document.getElementById("keyDown")) {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});

function filterZero(row) {
  return row.filter((num) => num != 0); // create a new array - 0
}

function slide(row) {
  // [0, 2, 2, 2]
  row = filterZero(row); // get rid of zeros -> [2, 2, 2]

  // slide
  for (let i = 0; i < row.length - 1; i++) {
    // check every 2
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    } // [2, 2, 2] -> [4, 0, 2]
  }
  row = filterZero(row); // [4, 2]

  // add zeros
  while (row.length < colums) {
    row.push(0);
  } // [4, 2, 0, 0]

  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < colums; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < colums; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < colums; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    // board[0][c] = row[0]
    // board[1][c] = row[1]
    // board[2][c] = row[2]
    // board[3][c] = row[3]

    for (let r = 0; r < colums; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < colums; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    // board[0][c] = row[0]
    // board[1][c] = row[1]
    // board[2][c] = row[2]
    // board[3][c] = row[3]

    for (let r = 0; r < colums; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// finish of code
console.log("2048, in 2024");
