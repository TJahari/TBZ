const lookup1 = db.mietvertrag.aggregate([
  {
    $lookup: {
      from: "standort",
      localField: "auto.standort", 
      foreignField: "_id",
      as: "standort_info"
    }
  },
  {
    $unwind: "$standort_info"
  },
  {
    $project: {
      _id: 0,
      marke: "$auto.marke",
      modell: "$auto.modell",
      standort_name: "$standort_info.name",
      standort_adresse: "$standort_info.adresse"
    }
  },
  {
    $sort: {"marke": 1 } 
  }
]);
print("Adresse jedes Autos:")
print(lookup1)


const lookup2 = db.mietvertrag.aggregate([
  {
    $lookup: {
      from: "standort",
      localField: "auto.standort", 
      foreignField: "_id",
      as: "standort_info"
    }
  },
  {
    $unwind: "$standort_info"
  },
  {
    $match: {
      "auto.marke": { $in: ["Porsche", "Ferrari"] }
    }
  },
  
  {
    $group: {
      _id: "$auto.marke",
      durchschnittspreis: { $avg: "$preis" },
      anzahl: { $sum: 1 },
      modelle: { $addToSet: "$auto.modell" } 
    }
  },
  
  {
    $project: {
      _id: 0,
      marke: "$_id",
      durchschnittspreis: { $round: ["$durchschnittspreis", 2] }, 
      anzahl: 1,
      modelle: 1
    }
  }
]);
print("Ferraris und Porsches:")
print(lookup2)