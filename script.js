const container = document.querySelector(".container");
const root = document.documentElement;
const slider = document.getElementById("myRange");
const gridSize = document.getElementById("slider__value");
const resetBtn = document.querySelector(".reset-btn");
const btns = document.querySelectorAll("button");
let cells;
let pickedBgColor = "rgb(0,0,0)";

/* 
Replace the grid-row/grid-col properties from root
for the ones passed into the function.If no value is passed
it will default to 16x16
*/
function makeGrid(size = 16) {
  root.style.setProperty("--grid-row", size);
  root.style.setProperty("--grid-col", size);
  container.setAttribute("draggable", false);
  // iterate over the area of the container and creates cells to append to it
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-item");
    container.append(cell);
  }
  cells = document.querySelectorAll(".grid-item");
  listenForPaint();
}

function listenForPaint() {
  //Listens for two events and calls appropriate function
  ["mousedown", "mouseup"].forEach((evt) => {
    //Assign a function to callback, depending on the event.
    let callback;
    switch (evt) {
      case "mousedown":
        callback = mouseDownListener;
        break;
      case "mouseup":
        callback = mouseUpListener;
        break;
      default:
        console.log(
          `Error.The callback function for event listeners is not working.`
        );
    }
    cells.forEach((cell) => cell.addEventListener(evt, callback));
  });
}

/*Once the mouse down event listener is triggered, this function
will trigger another event listener - mousemove.*/
function mouseDownListener(e) {
  changeColor(e);
  cells.forEach((cell) => cell.addEventListener("mousemove", changeColor));
}

// Change the background color
function changeColor(e) {
  e.target.style.backgroundColor = pickedBgColor;
}

// Remove mousemove listener
function mouseUpListener() {
  cells.forEach((cell) => cell.removeEventListener("mousemove", changeColor));
}

function changeGrid() {
  gridSize.textContent = `${slider.value}x${slider.value}`;
  slider.oninput = (e) => {
    gridSize.textContent = `${e.target.value}x${e.target.value}`;
    clearGrid();
    makeGrid(e.target.value);
  };
}

function reloadGrid() {
  slider.value = 16;
  clearGrid();
  changeGrid();
  makeGrid();
}

function clearGrid() {
  container.innerHTML = "";
}

function randomColor() {
  const rbgValues = [];
  for (let index = 0; index < 3; index++) {
    const value = Math.floor(Math.random() * 256) + 1;
    rbgValues.push(value);
  }
  return `rgb(${rbgValues[0]},${rbgValues[1]},${rbgValues[2]}`;
}

// Event listeners
resetBtn.onclick = reloadGrid;
btns.forEach((change, _, btn) => {
  change.onclick = () => {
    btn.forEach((bt) => {
      console.log(bt.classList.contains("rainbow-btn") && randomColor());
      bt.classList.contains("reset-btn") && reloadGrid();
      bt.classList.toggle("active", bt === change); //if bt === change > True add the class, else remove it
    });
  };
});

window.onload = () => {
  makeGrid(16);
  listenForPaint();
  changeGrid();
};
