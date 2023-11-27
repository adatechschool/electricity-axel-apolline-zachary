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
  return DataArray
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
function generate (dataArray) {
  const conteneur = document.querySelector("#conteneur");
  console.log("fetchData est maintenant terminé, exécutez votre logique ici.");
  for (const pays of dataArray) {
    const country = document.createElement("country");

    const countryStat = document.createElement("countryStat");
    countryStat.className = "country-container"

    const countryName = document.createElement("countryName");
    countryName.innerHTML = `<h2>${findCountryName(pays.zone)}</h2>`;
    
    conteneur.appendChild(country);
    country.appendChild(countryName);
    country.appendChild(countryStat)

    const keys = Object.keys(pays.powerProductionBreakdown);
    const keysToIterate = keys.slice(0, keys.length - 3);
    for (const key of keysToIterate) {
      const value = pays.powerProductionBreakdown[key];
      const energieValue = document.createElement(`${key}`)
      energieValue.innerHTML = `<p>${key}: ${value}</p>`
      countryStat.appendChild(energieValue)
    }
  }
};


//bouton trier
const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function () {
  let ordre = 1
  if (boutonTrier.getAttribute("type") === "true") {
    boutonTrier.setAttribute("type", "false")
  } else {
    ordre = -1 
    boutonTrier.setAttribute("type", "true")
  }
    const CountryByNuclear = Array.from(DataArray);
    CountryByNuclear.sort(function (a, b) {
        return ordre*(b.powerProductionBreakdown.nuclear - a.powerProductionBreakdown.nuclear);
     });
     document.querySelector("#conteneur").innerHTML = "";
     generate(CountryByNuclear);
});




fetchData().then((dataArray) => generate(dataArray));