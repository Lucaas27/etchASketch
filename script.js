const container = document.querySelector(".container");
const root = document.documentElement;

/* 
Replace the grid-row/grid-col properties from root
for the ones passed into the function.If no value is passed
it will default to 16x16
*/
function makeGrid(row = 16, col = 16) {
  root.style.setProperty("--grid-row", row);
  root.style.setProperty("--grid-col", col);
  // iterate over the area of the square and creates cells to append to it
  for (let cell = 0; cell < row * col; cell++) {
    const square = document.createElement("div");
    square.classList.add("grid-item");
    // square.textContent = cell + 1;
    container.append(square);
  }
}

window.onload = () => {
  makeGrid();
};
