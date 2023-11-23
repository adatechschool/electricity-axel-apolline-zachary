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

function fetchDataRecursively(index = 0) {
  if (index < paysUE.length) {
    const stat = document.querySelector("#conteneur");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer 8ucrTc5zJ2oCc9lrXUa9FArZlnFfqDWG",
      },
    };
    fetch(
      `https://api-access.electricitymaps.com/free-tier/power-breakdown/latest?zone=${paysUE[index].iso2}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        const country = document.createElement(`${paysUE[index].name}`);
        const countryName = document.createElement("countryName");
        const countryStat = document.createElement("stat")
        countryName.innerHTML = `<h2>${paysUE[index].name}</h2>`;
        stat.appendChild(country);
        country.appendChild(countryName);
        country.appendChild(countryStat);
        for (let key in data.powerProductionBreakdown) {
          const nuclear = document.createElement("p");
          nuclear.innerText = `${key}: ${data.powerProductionBreakdown[key]}`;
          countryStat.appendChild(nuclear);
        }
        setTimeout(() => fetchDataRecursively(index + 1), 1000);
      })
      .catch((error) => {
        console.error(`Erreur pour ${paysUE[index].name}:`, error);
        setTimeout(() => fetchDataRecursively(index + 1), 1000);
      });
  } else {
    console.log("Toutes les requêtes ont été effectuées");
  }
}
fetchDataRecursively();
