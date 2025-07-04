const standortId1 = new ObjectId();

const mvID1 = new ObjectId();

const kundeId1 = new ObjectId();

db.mietvertrag.insertOne(
    {
        _id: mvID1,
        von: ISODate("2023-06-01T00:00:00Z"),
        bis: ISODate("2023-06-05T00:00:00Z"),
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
    })