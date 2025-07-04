db.mietvertrag.insertMany([
{
  "_id": "not-an-object",  // ❌ should be an object with $oid
  "von": { "$date": 123456 },  // ❌ $date should be a string
  "bis": {},  // ❌ missing $date
  "auto": {
    "marke": "Toyota",
    "modell": "Corolla"
    // ❌ missing 'kennzeichen' and 'standort'
  },
  "mieter": {
    "id_": { "$oid": 12345 },  // ❌ $oid should be a string
    "name": "Max Mustermann"
    // ❌ missing 'ausweisnr' and 'adresse'
  },
  "preis": "free",  // ❌ should be a number
  "standortname": 42  // ❌ should be a string
}
]);