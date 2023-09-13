const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {
  await db.collection("posts").doc("2").set({
      title: "post2"
  })
})();