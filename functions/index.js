const functions = require("firebase-functions");

const admin = require("firebase-admin");

//const { firebaseConfig } = require("../src/firebase/config");
// const { LINKS_PER_PAGE } = require("../src/utils");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // from https://console.firebase.google.com/project/hooks-news-rasor/settings/general
  databaseURL: "https://hooks-news-rasor.firebaseio.com"
});

const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.linksPagination = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    let linksRef = db.collection("links");
    const offset = Number(request.query.offset);
    const snapshot = await linksRef
      .orderBy("created", "desc")
      .limit(5)
      .offset(offset)
      .get();

    const links = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    response.json(links);
  }
);
