db.mietvertrag.insertMany([
{
  "_id": "not-an-object",
  "von": { "$date": 123456 },
  "bis": {},
  "auto": {
    "marke": "Toyota",
    "modell": "Corolla"
  },
  "mieter": {
    "id_": { "$oid": 12345 },
    "name": "Max Mustermann"
  },
  "preis": "free",
  "standortname": 42
}
]);
