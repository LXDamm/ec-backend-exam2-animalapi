import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://animalapi-a3dee.firebaseio.com"
});

export default admin;