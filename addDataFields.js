var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addRemarksField() {
  const plantationCollection = db.collection('plantations');

  try {
    // Get all documents in the 'plantation' collection
    const snapshot = await plantationCollection.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    // Iterate over each document in the collection
    snapshot.forEach(async (doc) => {
      // Add the 'remarks' field to the document
      await plantationCollection.doc(doc.id).update({
        remarks: '' // Default value, you can change it or make it dynamic
      });
      console.log(`Added remarks field to document ID: ${doc.id}`);
    });

    console.log('All documents updated successfully!');
  } catch (error) {
    console.error('Error updating documents: ', error);
  }
}

addRemarksField();