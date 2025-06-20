// $match
const aggregate1 = db.mietvertrag.aggregate([
  { $match: { preis: { $gt: 6000 } }},
  { $match: { "auto.kennzeichen": "GR-007 007" } },
   { $project: {
    _id: 0,
    marke: "$auto.marke",
    modell: "$auto.modell",
    preis: 1,
   kennzeichen: "auto.kennzeichen"}}
]);
print("Aggregate $match: ")
print(aggregate1)

//$match, $project, $sort
const aggregate2 = db.mietvertrag.aggregate([
  { $match: { 
    "auto.marke": { $in: ["Porsche", "Lamborghini"] } 
  }},
  {
    $addFields: {
      tage: {
        $divide: [
          { $subtract: ["$bis", "$von"] }, // Differenz in Millisekunden
          1000 * 60 * 60 * 24 // Umrechnung in Tage (Millisekunden → Tage)
        ]
      }
    }
  },
  
  { $project: {
    _id: 0,
    marke: "$auto.marke",
    modell: "$auto.modell",
    preis: 1,
    tage: 1
  }},
  
  { $sort: { preis: -1 } }
]);
print("Aggregate $match, $project, $sort: ")
print(aggregate2)

//$sum
const aggregate3 = db.mietvertrag.aggregate([
  { $group: {
    _id: "$auto.marke",
    anzahl: { $sum: 1 },
    gesamtumsatz: { $sum: "$preis" }, 
    durchschnittspreis: { $avg: "$preis" }
  }},
  { $sort: { gesamtumsatz: -1 } }
]);
print("Aggregate $sum: ")
print(aggregate3)

