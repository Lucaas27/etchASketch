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
  // iterate over the area of the container and creates cells to append to it
  for (let i = 0; i < row * col; i++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-item");
    // cell.textContent = cell + 1;
    container.append(cell);
  }
}

window.onload = () => {
  makeGrid();
};
