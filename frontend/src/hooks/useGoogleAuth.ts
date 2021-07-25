import firebase from "firebase";

export const useGoogleAuth = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  firebase.auth().languageCode = "ja";

  const googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        res.user?.getIdToken(true).then((token) => {
          console.log(token);
        });
      });
  };
  return { googleLogin };
};
