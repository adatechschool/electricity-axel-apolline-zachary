const requestOptions = {
  method: "GET",
  headers: { Authorization: `Bearer 8ucrTc5zJ2oCc9lrXUa9FArZlnFfqDWG` },
};
fetch(
  "https://api-access.electricitymaps.com/free-tier/power-breakdown/latest?zone=FR",
  requestOptions
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    document.querySelector("#test").innerHTML = `
    <h1>${data.powerProductionBreakdown.nuclear}</h1>
    `
  });