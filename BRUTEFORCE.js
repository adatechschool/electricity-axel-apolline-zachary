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

async function fetchDataRecursively(index = 0) {
  if (index < 26) {
    const localAbortController = new AbortController();

    const requestOptionsWithDelay = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 8ucrTc5zJ2oCc9lrXUa9FArZlnFfqDWG`,
      },
      signal: localAbortController.signal,
    };

    try {
      const response = await fetch(
        `https://api-access.electricitymaps.com/free-tier/power-breakdown/latest?zone=${
          paysUE[index % paysUE.length].iso2
        }`,
        requestOptionsWithDelay
      );

      if (localAbortController.signal.aborted) {
        console.log(
          `Requête annulée pour ${paysUE[index % paysUE.length].iso2}`
        );
      } else if (!response.ok) {
        console.error(`Erreur HTTP: ${response.status}`);
      } else {
        const data = await response.json();
        if (data.powerProductionBreakdown) {
          console.log(data.powerProductionBreakdown);
        } else {
          console.error(
            `Données manquantes pour ${paysUE[index % paysUE.length].iso2}`
          );
        }
      }
    } catch (error) {
      console.error(
        `Erreur pendant la requête pour ${paysUE[index % paysUE.length].iso2}:`,
        error
      );
    }

    // Appelle la fonction récursivement avec l'index suivant après le délai
    await new Promise((resolve) => setTimeout(resolve, 1000));
    fetchDataRecursively(index + 1);
  } else {
    console.log("Toutes les requêtes ont été effectuées");
  }
}

// Appelle la fonction récursive
fetchDataRecursively();
