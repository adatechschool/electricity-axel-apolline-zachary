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
  { name: "Malte", iso2: "MT" },
  { name: "Pays-Bas", iso2: "NL" },
  { name: "Pologne", iso2: "PL" },
  { name: "Portugal", iso2: "PT" },
  { name: "République tchèque", iso2: "CZ" },
  { name: "Roumanie", iso2: "RO" },
  { name: "Slovaquie", iso2: "SK" },
  { name: "Slovénie", iso2: "SI" },
  { name: "Suède", iso2: "SE" },
];
// methode pour fetch

const requestOptions = {
  method: "GET",
  headers: { Authorization: `Bearer 8ucrTc5zJ2oCc9lrXUa9FArZlnFfqDWG` },
};

// affichage de chaque pays

async function AffichagePP() {
  const fetchdata = paysUE.map((pays) => {
    return fetch(
      `https://api-access.electricitymaps.com/free-tier/power-breakdown/latest?zone=${pays.iso2}`,
      requestOptions
    )
    .then(response => response.json())
    .then(data => {
      console.log(data.powerProductionBreakdown);
    });
  });
}

// calcul de l'UE

async function globalUE() {
  const nuclear = await fetch(
    `https://api-access.electricitymaps.com/free-tier/power-breakdown/latest?`,
    requestOptions
  )
    .then((nuclear) => {
      return nuclear.json();
    })
    .then((data) => {
      console.log(data.powerProductionBreakdown);
    });
}


for (let i = 15; i < paysUE.length; i++) {
  globalUE(paysUE[i].iso2)
}
