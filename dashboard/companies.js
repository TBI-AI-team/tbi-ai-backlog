// dashboard/companies.js
//
// Centrale TBI-bedrijf metadata — geïmporteerd door:
//   - dashboard/index.html       (kaart-pin coords, sector, project-grouping)
//   - dashboard/initiatief.html  (locatie auto-derive bij bedrijf-selectie)
//
// Conventie voor ontbrekende data: literal `null`. Nooit lege string of placeholder
// als 'Adres onbekend' — consumers moeten expliciet kunnen testen op `if (c.address)`.
//
// Adressen: alle 22 bedrijven hebben een adres uit de canonieke bron — de bedrijf's
// eigen `/contact` pagina (zie audit Step 3.5, 2026-05-07). Waar de eigen pagina
// 404'de of meerdere kantoren onbeslist liet, gebruikt deze file de TBI corporate
// hub of een KVK/D&B lookup; bron per bedrijf staat in de PR-beschrijving.
//
// Coords status (per audit Step 3.5 + Nominatim-geocoding 2026-05-07):
//   - 9 bedrijven met geverifieerde coords (5 reeds gehad uit oude PROJECTS,
//     4 nieuw via Nominatim geocoding o.b.v. canoniek adres):
//     Comfort Partners, Croonwolter&dros, ERA Contour, J.P. van Eesteren,
//     Koopmans Bouwgroep, MDB, Mobilis, TBI SSC ICT, Voorbij Funderingstechniek.
//   - 13 bedrijven met `lat: null, lng: null` — geocoden in follow-up data-PR.
//     Per-bedrijf gemarkeerd met `// TODO: geocode`. Allemaal "nieuw of hadden nooit
//     coords" (geen openstaande corrections meer).
//
// Audit trail — coord-corrections:
// Van de 4 zojuist-geocoded entries waren er 3 echte corrections (oude PROJECTS
// coords waren significant off van het canonieke adres):
//   - Mobilis:      was Capelle a/d IJssel area, is Apeldoorn        (~110 km off)
//   - MDB:          was near Gouda,             is Bergambacht       (~14 km off)
//   - TBI SSC ICT:  was near Weena/CS,          is Marten Meesweg    (~4–5 km off)
// Croonwolter&dros's bestaande coords waren al correct (audit-narrative had
// Marten Meesweg geografisch verkeerd geplaatst en telde 1 te veel als correction).
//
// Sector classificaties zijn de TBI-corporate authoritative klassen (per
// tbi.nl/techniekbedrijven, /bouwbedrijven, /infrabedrijven). Eén historische
// classificatie correctie: Voorbij Prefab is BOUW, niet INFRA (de oude PROJECTS-
// implied classificatie via lat/lng-cluster zat fout).
//
// Niet hier (drift met deze file blijft open totdat audit §6.6's taxonomy
// consolidation is afgerond):
//   - scripts/setup-labels.js's bedrijf-color list
//   - .github/ISSUE_TEMPLATE/ai-initiatief.yml's bedrijf dropdown (22 entries)
//   - dashboard/initiatief.html's bedrijf dropdown (3 entries minder dan issue
//     template — Rutges Vernieuwt, Soltegro, Struijk staan in companies.js maar
//     niet in de dashboard dropdown; gemarkeerd per-bedrijf met inline comment)
//   - Voton (4e INFRA bedrijf per TBI corporate, in geen van beide forms; geen
//     entry hier omdat geen consumer)

const TBI_COMPANIES = {
  'Comfort Partners': {
    sector: 'TECHNIEK',
    address: 'Paalbergweg 2-4, Amsterdam',
    lat: 52.2989,
    lng: 4.9553,
  },
  'Croonwolter&dros': {
    sector: 'TECHNIEK',
    address: 'Marten Meesweg 25, Rotterdam',
    lat: 51.9532,
    lng: 4.5563,
  },
  'Eekels Technology': {
    sector: 'TECHNIEK',
    address: 'A. Plesmanlaan 2, Kolham',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  'ERA Contour': {
    sector: 'BOUW',
    address: 'Zilverstraat 39, Zoetermeer',
    lat: 52.0419,
    lng: 4.5052,
  },
  'GeWOONhout': {
    sector: 'BOUW',
    address: 'Kryptonstraat 8, Wehl',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  'Giesbers InstallatieGroep': {
    sector: 'TECHNIEK',
    address: 'Sevillaweg 52, Rotterdam',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  'Hazenberg Bouw': {
    sector: 'BOUW',
    address: 'Molenstraat 2, Vught',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  'HEVO': {
    sector: 'BOUW',
    address: 'Statenlaan 8, \'s-Hertogenbosch',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  'J.P. van Eesteren': {
    sector: 'BOUW',
    address: 'Hanzeweg 16, Gouda',
    lat: 52.0268,
    lng: 4.6820,
  },
  'Koopmans Bouwgroep': {
    sector: 'BOUW',
    address: 'Marssteden 66, Enschede',
    lat: 52.2159,
    lng: 6.8181,
  },
  'MDB': {
    sector: 'BOUW',
    address: 'Lekdijk Oost 21, Bergambacht',
    lat: 51.9233,
    lng: 4.7947,
  },
  'Mobilis': {
    sector: 'INFRA',
    address: 'Fauststraat 3, Apeldoorn',
    lat: 52.2343,
    lng: 5.9773,
  },
  'Nico de Bont': {
    sector: 'BOUW',
    address: 'Molenstraat 2, Vught',              // gedeeld met Hazenberg Bouw
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  // Niet in dashboard form's dropdown — issue template only
  'Rutges Vernieuwt': {
    sector: 'BOUW',
    address: 'Damzigt 60, De Meern',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  // Niet in dashboard form's dropdown — issue template only
  'Soltegro': {
    sector: 'TECHNIEK',
    address: 'Rivium Quadrant 159, Capelle aan den IJssel',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  // Niet in dashboard form's dropdown — issue template only
  'Struijk': {
    sector: 'INFRA',
    address: 'Noord 77, Krimpen aan de Lek',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  'Synchroon': {
    sector: 'BOUW',
    address: 'Stadsplateau 14, Utrecht',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  'TBI Holdings': {
    sector: 'HOLDING',
    address: 'Wilhelminaplein 37, Rotterdam',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  'TBI SSC ICT': {
    sector: 'HOLDING',
    address: 'Marten Meesweg 25, Rotterdam',      // gedeeld met Croonwolter&dros
    lat: 51.9532,                                 // identiek aan Croonwolter (zelfde gebouw)
    lng: 4.5563,
  },
  'Voorbij Funderingstechniek': {
    sector: 'INFRA',
    address: 'Siciliëweg 61, Amsterdam',
    lat: 52.4251,
    lng: 4.7741,
  },
  'Voorbij Prefab': {
    sector: 'BOUW',                               // correctie: was INFRA in oude PROJECTS classificatie
    address: 'Siciliëweg 61, Amsterdam',          // gedeeld met Voorbij Funderingstechniek
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
  'WTH Vloerverwarming': {
    sector: 'TECHNIEK',
    address: 'Barckalaan 18, Capelle aan den IJssel',
    lat: null,                                    // TODO: geocode
    lng: null,                                    // TODO: geocode
  },
};
