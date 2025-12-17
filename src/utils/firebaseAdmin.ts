import admin from "firebase-admin";
var serviceAccount = require("../user/config/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const messaging = admin.messaging();
