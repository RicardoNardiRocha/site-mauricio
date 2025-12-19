// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDYXIisMVxpQA8v9uI8BPMtV5Tcdm7iPZ4",
  authDomain: "contabilx-77490593-12929.firebaseapp.com",
  projectId: "contabilx-77490593-12929",
  storageBucket: "contabilx-77490593-12929.firebasestorage.app",
  messagingSenderId: "738023734424",
  appId: "1:738023734424:web:04c5654d32f50b6663a4ed"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "../index.html";
  }
});
