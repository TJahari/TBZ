const array1 = db.mietvertrag.find(
  {},
  { 
    "_id": 0,
    "auto.marke": 1,
    "auto.modell": 1,
    "mieter.name": 1
  }
)
print("Einfache Ausgabe")
print(array1)

const array2 = db.mietvertrag.find({
  "auto.marke": "Porsche",
  "preis": { $gt: 5000 }
}, {
		_id: 0,
      "auto.marke": 1,
      "preis": 1
	})
print("Mit Filter")
print(array2)

const array3 = db.mietvertrag.aggregate([
  {
    $lookup: {
      from: "standort",
      localField: "auto.standort",
      foreignField: "_id",
      as: "standort_info"
    }
  },
  {
    $project: {
		_id: 0,
      "kennzeichen": "$auto.kennzeichen",
      "standort_name": "$standort_info.name",
      "mieter": "$mieter.name"
    }
  }
])
print("lookup ohne $unwind")
print(array3)

const array4 = db.mietvertrag.aggregate([
  {
    $lookup: {
      from: "standort",
      localField: "auto.standort",
      foreignField: "_id",
      as: "standort_info"
    }
  },
  { $unwind: "$standort_info" },
  {
    $project: {
		_id: 0,
      "kennzeichen": "$auto.kennzeichen",
      "standort_name": "$standort_info.name",
      "mieter": "$mieter.name"
    }
  }
])
print("lookup mit $unwind")
print(array4)