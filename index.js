//global variables go under here:

let interval;
let started = false;
let clickedCell = [];
let time = 0;
let ready = true;
let numCompleted = 0;

//run functions under here:
setUpGrid();

// returns an array that contains a scrambled list of values
function randomAnswers() {
  let answers = [1, 1, 2, 2, 3, 3, 4, 4, 5];
  // sort the array in a pseudo random way
  answers.sort(function(item) {
    return 0.5 - Math.random();
  });

  return answers;
}

function hideCells(cell) {
  cell.style.backgroundColor = "#8095d6";
  cell.innerHTML = "";
  cell.clicked = false;
}

function completeCells(cell) {
  numCompleted++;
  cell.completed = true;
  cell.style.backgroundColor = "#80d6ab";
}

function reveal(cell) {
  cell.style.backgroundColor = "red";
  cell.innerHTML = cell.value;
  cell.clicked = true;
}

function startTimer() {
  if (started == false) {
    interval = setInterval(function() {
      time++;
      document.getElementById("timer").innerHTML = "Time Elapsed: " + time;
    }, 1000);
    started = true;
  }
}

// set up the cells
// has a for loop that iterates through all of the grid cells.
// We can use this for loop to add event listeners to all of the cells in the grid.
function setUpGrid() {
  let grid = document.getElementsByTagName("td");
  let answers = randomAnswers();

  for (let i = 0; i < grid.length; i++) {
    let cell = grid[i];

    cell.completed = false; // becomes true when a cell becomes "completed"
    cell.clicked = false; // tells whether or not a cell is currently clicked
    cell.value = answers[i]; // set to a random value using the randomAnswers()

    // add event listeners to each of the cells
    cell.addEventListener("mouseenter", function() {
      if (this.completed == false && this.clicked == false)
        this.style.background = "lightblue";
    });

    cell.addEventListener("mouseleave", function() {
      if (this.completed == false && this.clicked == false)
        this.style.background = "aquablue";
    });

    cell.addEventListener("click", function() {
      if (ready == false) return;
      startTimer();
      if (this.clicked == false && this.completed == false) {
        clickedCell.push(this);
        reveal(this);
      }

      if (clickedCell.length == 2) {
        if (clickedCell[0].value == clickedCell[1].value) {
          //if a matching pair is found
          completeCells(clickedCell[0]);
          completeCells(clickedCell[1]);

          clickedCell = [];

          if (numCompleted == 8) {
            alert("You won in " + time + " seconds!");
            clearInterval(interval);
          }
        } else {
          //if a matching pair is not found
          ready = false;

          setTimeout(function() {
            //after a 500ms delay
            hideCells(clickedCell[0]);
            hideCells(clickedCell[1]);

            clickedCell = [];

            ready = true;
          }, 500);
        }
      }
    });
    document.addEventListener("keydown", function(event) {
      if (event.key > 0 && event.key < 10) {
        grid[event.key - 1].click();
      }
    });

    document.getElementById("restart").addEventListener("click", function() {
      location.reload();
    });
  }
}
