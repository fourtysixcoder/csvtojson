var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const file = './newData.csv'
const csv = require("csvtojson")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore()

const addCsv = () => {
    csv()
    .fromFile(file)
    .then( (jsonObj) => {
        for(const item of jsonObj) {
           firestore.collection('plantation').add(item)
        }
    })
    .then(() => console.log("data added successfully!"))
    .catch((err) => console.error(err))
}

addCsv()


