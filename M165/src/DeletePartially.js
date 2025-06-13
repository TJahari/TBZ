const deleteSingleResult = db.mietvertrag.deleteOne(
    { _id: ObjectId("684c120fd729e47146c59f38") } 
);
print(`Gelöschte Dokumente (single): ${deleteSingleResult.deletedCount}`);

const deleteMultipleResult = db.standort.deleteMany({
    $or: [
        { _id: ObjectId("6842f9de90d92ad430b47c33") },
        { _id: ObjectId("6842f9de90d92ad430b47c34") }
    ]
});
print(`Gelöschte Dokumente (multiple): ${deleteMultipleResult.deletedCount}`);

const deleteByBrandResult = db.mietvertrag.deleteMany({
    marke: { $in: ["Lamborghini", "Ferrari"] }
});
print(`Gelöschte Dokumente nach Marke: ${deleteByBrandResult.deletedCount}`);

print("Selektive Löschoperationen abgeschlossen!");