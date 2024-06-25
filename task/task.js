function calculateMinimumPlanes() {
  let fuelInput = document.getElementById("fuelInput").value.trim();

  // Split the input by commas and convert to integers
  let fuelArray = fuelInput.split(",").map((str) => parseInt(str.trim(), 10));

  // Validate the input
  if (fuelArray.some(isNaN)) {
    alert("Please enter valid numbers separated by commas.");
    return;
  }

  // Call the function to compute minimum planes required
  let result = findMinimumPlanes(fuelArray);

  // Update the result on the UI
  let resultElement = document.getElementById("result");
  if (result === -1) {
    resultElement.textContent = "It is not possible to reach the last airport.";
  } else {
    resultElement.textContent = `Minimum planes required: ${result}`;
  }
}

function findMinimumPlanes(fuel) {
  const N = fuel.length;
  if (N === 0) return -1;

  // BFS setup
  let queue = [];
  let visited = Array(N)
    .fill()
    .map(() => Array(N).fill(false));

  // Start BFS from airport 0 (index 1) with 0 planes used
  queue.push({ airport: 0, planes: 0 });
  visited[0][0] = true;

  while (queue.length > 0) {
    let { airport, planes } = queue.shift();

    // Get fuel available at current airport
    let fuelAvailable = fuel[airport];

    // Try to fly to reachable airports
    for (let i = 1; i <= fuelAvailable; i++) {
      let nextAirport = airport + i;

      // If we can reach the last airport (N)
      if (nextAirport >= N - 1) {
        return planes + 1;
      }

      // If not visited yet, mark as visited and add to queue
      if (!visited[nextAirport][planes + 1]) {
        visited[nextAirport][planes + 1] = true;
        queue.push({ airport: nextAirport, planes: planes + 1 });
      }
    }
  }

  // If BFS completes and we haven't returned yet, it means it's not possible to reach last airport
  return -1;
}
