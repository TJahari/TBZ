const autovermietungDb = db.getSiblingDB("autovermietung");

autovermietungDb.createUser({
  user: "leser",
  pwd: "SicheresPasswort123!",
  roles: [
    { role: "read", db: "autovermietung" }
  ]
});

const adminDb = db.getSiblingDB("admin");

adminDb.createUser({
  user: "schreiber",
  pwd: "NochSichereresPasswort456!",
  roles: [
    { role: "readWrite", db: "autovermietung" }
  ]
});
