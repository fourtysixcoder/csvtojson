var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function renameIdField() {
  const snapshot = await db.collection("plantations").get();
  snapshot.forEach(async (doc) => {
    const data = doc.data();

    if (data.id && !data.treeid) {
      // Update the document: add `treeid` with the value from `id`, then delete `id`
      await db.collection("plantations").doc(doc.id).update({
        treeid: data.id, // Copy value from `id` to `treeid`
        id: admin.firestore.FieldValue.delete(), // Delete the `id` field
      });
    }
  });
}

renameIdField().catch(console.error);
