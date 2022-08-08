const container = document.querySelector(".container");
const cells = document.querySelectorAll(".grid-item");
const root = document.documentElement;
const slider = document.getElementById("myRange");
const gridSize = document.getElementById("grid__value");
let pickedBgColor = 'rgb(0,0,0)'

/* 
Replace the grid-row/grid-col properties from root
for the ones passed into the function.If no value is passed
it will default to 16x16
*/
function makeGrid(row = 16, col = 16) {
  root.style.setProperty("--grid-row", row);
  root.style.setProperty("--grid-col", col);
  container.setAttribute('draggable', false);
  // iterate over the area of the container and creates cells to append to it
  for (let i = 0; i < row * col; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-item");
    container.append(cell);
  }
}

function paint() {
  //Listens for two events and calls appropriate function
  ['mousedown', 'mouseup'].forEach(evt => {
    //Assign a function to callback, depending on the event.
    let callback;
    switch (evt) {
      case 'mousedown':
        callback = mouseDownListener;
        break;
      case 'mouseup':
        callback = mouseUpListener;
        break;
    }
    container.addEventListener(evt, callback);
  })
}

// Change the background color
function changeColor(e) {
  e.target.style.backgroundColor = pickedBgColor;
}

/*Once the mouse down event listener is triggered, this function
will trigger another event listener - mousemove.*/
function mouseDownListener(e) {
  changeColor(e);
  // console.log(e.target);
  container.addEventListener('mousemove', changeColor);
}

// Remove mousemove listener 
function mouseUpListener() {
  container.removeEventListener('mousemove', changeColor);
}


function changeGrid() {
  gridSize.textContent = `${slider.value}x${slider.value}`;

  slider.oninput = function () {
    gridSize.textContent = `${this.value}x${this.value}`;
  }
}
window.onload = () => {
  makeGrid();
  paint();
  changeGrid();
};

