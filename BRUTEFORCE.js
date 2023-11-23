const requestOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer 8ucrTc5zJ2oCc9lrXUa9FArZlnFfqDWG`,
  },
};
fetch(
  "https://api-access.electricitymaps.com/free-tier/carbon-intensity/latest?zone=FR",
  requestOptions
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
