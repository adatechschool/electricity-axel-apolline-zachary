// liste des pays de l'EU
const paysUE = [
  { name: "Autriche", iso2: "AT" },
  { name: "Belgique", iso2: "BE" },
  { name: "Bulgarie", iso2: "BG" },
  { name: "Chypre", iso2: "CY" },
  { name: "Croatie", iso2: "HR" },
  { name: "Danemark", iso2: "DK" },
  { name: "Espagne", iso2: "ES" },
  { name: "Estonie", iso2: "EE" },
  { name: "Finlande", iso2: "FI" },
  { name: "France", iso2: "FR" },
  { name: "Grèce", iso2: "GR" },
  { name: "Hongrie", iso2: "HU" },
  { name: "Irlande", iso2: "IE" },
  { name: "Italie", iso2: "IT" },
  { name: "Lettonie", iso2: "LV" },
  { name: "Lituanie", iso2: "LT" },
  { name: "Luxembourg", iso2: "LU" },
  { name: "Pays-Bas", iso2: "NL" },
  { name: "Pologne", iso2: "PL" },
  { name: "Portugal", iso2: "PT" },
  { name: "République tchèque", iso2: "CZ" },
  { name: "Roumanie", iso2: "RO" },
  { name: "Slovaquie", iso2: "SK" },
  { name: "Slovénie", iso2: "SI" },
  { name: "Suède", iso2: "SE" },
];

//constant du scopre global
const iso2Array = paysUE.map((country) => country.iso2);
const DataArray = [];

//fonction pour retourner tableau de data pour tout pays d'europe
const fetchData = async () => {
  console.log("Attente de la fin de fetchData");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: "Bearer 8ucrTc5zJ2oCc9lrXUa9FArZlnFfqDWG",
    },
  };

  for (const pays of iso2Array) {
    const response = await fetch(
      `https://api-access.electricitymaps.com/free-tier/power-breakdown/latest?zone=${pays}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    DataArray.push(data);

    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const loader = document.querySelector(".loader");

  loader.classList.add("fondu-out");

  return DataArray;
};

//fonction pour retrouver le nom d'un pays
function findCountryName(iso2) {
  const foundIso2 = paysUE.find((pays) => iso2 === pays.iso2);
  return foundIso2.name;
}

//fonction pour retrouver l'iso2 d'un pays
function findcountryIso2(countryName) {
  const foundcountry = paysUE.find((pays) => countryName === pays.name);
  return foundcountry.name;
}

//fonction pour generer data de pays
function generateCharts(dataArray) {
  const conteneur = document.querySelector("#conteneur");
  console.log("fetchData est maintenant terminé, exécutez votre logique ici.");

  dataArray.forEach((pays) => {
    const country = document.createElement("country");
    country.className = "country-container";

    const flagImg = document.createElement("countryFlag");
    flagImg.innerHTML = `<h2>${findCountryName(pays.zone)}</h2>`;
    flagImg.innerHTML += `<img src="https://flagsapi.com/${pays.zone}/flat/64.png"></img>`;
    flagImg.className = "country-name";

    const countryData = pays.powerProductionBreakdown;
    const keys = Object.keys(pays.powerProductionBreakdown);
    const keysToIterate = keys.slice(0, keys.length - 3);

    const chartContainer = document.createElement("div");
    chartContainer.className = "chart"; // Appliquer le style de la classe .chart définie dans le CSS

    const chartCanvas = document.createElement("canvas");
    chartCanvas.width = 400; // Définir la largeur du diagramme (ajuster selon les besoins)
    chartCanvas.height = 800; // Définir la hauteur du diagramme (ajuster selon les besoins)

    chartContainer.appendChild(flagImg);
    chartContainer.appendChild(chartCanvas);
    conteneur.appendChild(chartContainer);

    const energySources = [
      "Nucléaire",
      "Géothermal",
      "Biomasse",
      "Charbon",
      "Éolien",
      "Solaire",
      "Hydrolique",
      "Gaz",
      "Pétrole",
    ];

    const ctx = chartCanvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [
          "Nucléaire",
          "Géothermal",
          "Biomasse",
          "Charbon",
          "Éolien",
          "Solaire",
          "Hydrolique",
          "Gaz",
          "Pétrole",
        ],
        datasets: [
          {
            // label: findCountryName(pays.zone),
            data: Object.values(countryData),
            backgroundColor: [
              "rgba(0, 255, 0, 0.4)",
              "rgba(255, 165, 0, 0.4)",
              "rgba(139, 69, 19, 0.4)",
              "rgba(0, 0, 0, 0.4)",
              "rgba(255, 255, 255, 0.4)",
              "rgba(255, 255, 0, 0.4)",
              "rgba(0, 0, 255, 0.4)",
              "rgba(128, 128, 128, 0.4)",
              "rgba(139, 69, 19, 0.4)",

            ],
            borderColor: [
              "rgba(0, 255, 0, 1)",
              "rgba(255, 165, 0, 1)",
              "rgba(139, 69, 19, 1)",
              "rgba(0, 0, 0, 1)",
              "rgba(255, 255, 255, 1)",
              "rgba(255, 255, 0, 1)",
              "rgba(0, 0, 255, 1)",
              "rgba(128, 128, 128, 1)",
              "rgba(139, 69, 19, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {  // 'legend' now within object 'plugins {}'
          legend: {
            labels: {
              color: "white",
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "white",  // not 'fontColor:' anymore
              //fontSize: 14,

            }
          },
        },
      },
    });
  });
}

//bouton trier
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
  let ordre = 1;
  if (boutonTrier.getAttribute("type") === "true") {
    boutonTrier.setAttribute("type", "false");
  } else {
    ordre = -1;
    boutonTrier.setAttribute("type", "true");
  }
  const CountryByNuclear = Array.from(DataArray);
  CountryByNuclear.sort(function (a, b) {
    return (
      ordre *
      (b.powerProductionBreakdown.nuclear - a.powerProductionBreakdown.nuclear)
    );
  });
  document.querySelector("#conteneur").innerHTML = "";
  generateCharts(CountryByNuclear);
});

//input pour chercher par nom de pays
const inputForCountryName = document.querySelector("#lookByCountryName");

inputForCountryName.addEventListener("input", function () {
  const countryWhithInput = DataArray.filter((country) =>
    findCountryName(country.zone)
      .toLowerCase()
      .includes(inputForCountryName.value.toLowerCase())
  );
  document.querySelector("#conteneur").innerHTML = "";
  generateCharts(countryWhithInput);
});

fetchData().then((dataArray) => generateCharts(dataArray));
