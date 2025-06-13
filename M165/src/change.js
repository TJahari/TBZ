db.getCollectionNames().forEach(c => {
  if (!c.startsWith('system.')) {
    db[c].drop();
    print(`Collection ${c} gelöscht`);
  }
});

const standortId1 = new ObjectId();
const standortId2 = new ObjectId();
const standortId3 = new ObjectId();

const mvID1 = new ObjectId();
const mvID2 = new ObjectId();
const mvID3 = new ObjectId();

const kundeId1 = new ObjectId();
const kundeId2 = new ObjectId();
const kundeId3 = new ObjectId();

db.standort.insertMany([
    {
        _id: standortId1,
        name: "Zürich Luxus-Autovermietung",
        adresse: "Bahnhofstrasse 1, 8001 Zürich"
    },
    {
        _id: standortId2,
        name: "Genf Seeufer Filiale",
        adresse: "Quai du Mont-Blanc 5, 1201 Genève"
    },
    {
        _id: standortId3,
        name: "St. Moritz Ski Resort",
        adresse: "Via Maistra 12, 7500 St. Moritz"
    }
]);

db.mietvertrag.insertMany([
    {
        _id: mvID1,
        von: ISODate("2021-06-01"),
        bis: ISODate("2021-06-05"),
        auto: {
            marke: "Lamborghini",
            modell: "Huracán EVO",
            kennzeichen: "ZH-420 420",
            standort: standortId1
        },
        mieter: {
			id_: kundeId1,
            name: "Hans-Ueli Schokoladeglocke",
            ausweisnr: "CH-123456789",
            adresse: "Alpenblickweg 42, 3006 Bern"
        },
        preis: 14000,
        standortname: "Zürich Luxus-Autovermietung"
    },
    {
        _id: mvID2,
        von: ISODate("2022-07-10"),
        bis: ISODate("2022-07-12"),
        auto: {
            marke: "Ferrari",
            modell: "SF90 Stradale",
            kennzeichen: "GE-789 000",
            standort: standortId2
        },
        mieter: {
			id_: kundeId2,
            name: "Gretchen Fondue-Zwilling",
            ausweisnr: "CH-987654321",
            adresse: "Käsestrasse 8, 6003 Luzern"
        },
        preis: 7000,
        standortname: "Genf Seeufer Filiale"
    },
    {
        _id: mvID3,
        von: ISODate("2023-08-15"),
        bis: ISODate("2023-08-20"),
        auto: {
            marke: "Porsche",
            modell: "911 Turbo S",
            kennzeichen: "GR-007 007",
            standort: standortId3
        },
        mieter: {
			id_: kundeId3,
            name: "Werner Matterhorn-Springer",
            ausweisnr: "CH-456123789",
            adresse: "Schoggitalweg 17, 3920 Zermatt"
        },
        preis: 9500,
        standortname: "St. Moritz Ski Resort"
    }
]);

print("Success! ");

const updateOneResult = db.mietvertrag.updateOne(
  { "mieter.id_": kundeId1 },
  { $set: { "mieter.adresse": "Milchschoggiweg 31, 3923 Törbel"} }
);
print(`1. updateOne(): ${updateOneResult.modifiedCount} Mieter aktualisiert`);

const updateManyResult = db.mietvertrag.updateMany(
  {
    $or: [
      { "auto.marke": "Porsche" },
      { preis: { $gte: 7000 } }
  ] },{ $set: { preis: 8000} }
);
print(`2. updateMany(): ${updateManyResult.modifiedCount} Mietverträge aktualisiert`);

const replaceResult = db.standort.replaceOne(
  {name: "St. Moritz Ski Resort" },
  {
        name: "Zug Supercar Rentals",
        adresse: "Baarerstraße 57, 6300 Zug"
  }
);
print(`3. replaceOne(): ${replaceResult.modifiedCount} Standort ersetzt`);