// ./initAuth.js
import { init } from "next-firebase-auth";

const initAuth = () => {
  init({
    debug: true,
    authPageURL: "/",
    appPageURL: "/dashboard",
    loginAPIEndpoint: "/api/firebase/loginFirebase", // required
    logoutAPIEndpoint: "/api/firebase/logoutFirebase", // required
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: "sehatin-eab72",
        clientEmail:
          "firebase-adminsdk-nx50q@sehatin-eab72.iam.gserviceaccount.com",
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
          : undefined,
      },
      databaseURL:
        "https://sehatin-eab72-default-rtdb.asia-southeast1.firebasedatabase.app/",
    },
    firebaseClientInitConfig: {
      apiKey: "AIzaSyDpLCX1_lro9dkyu7vhvk-aajfVQ5hn-8U",
      authDomain: "sehatin-eab72.firebaseapp.com",
      databaseURL:
        "https://sehatin-eab72-default-rtdb.asia-southeast1.firebasedatabase.app/",
      projectId: "sehatin-eab72",
    },
    cookies: {
      name: "SehatIn-CMS", // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE, // set this to false in local (non-HTTPS) development
      signed: false,
    },
  });
};

export default initAuth;
