const collections = db.getCollectionNames();

collections.forEach(function(collection) {
    if (!collection.startsWith('system.')) {
        print(`Lösche Collection: ${collection}`);
        db[collection].drop();
    }
});