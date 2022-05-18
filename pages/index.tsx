import styles from "../styles/Home.module.css";

import * as React from "react";

import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import firebase from "../utils/firebase/firebase";
import Loading from "../components/Loading";
import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import logoGoogle from "../public/icons/google.svg";
import logo from "../public/icons/sehatin-logo.png";
import axios from "axios";
const Loader = () => <Loading />;

function HomePage() {
  const toast = useToast();
  const AuthUser = useAuthUser();
  const provider = new firebase.auth.GoogleAuthProvider();
  return (
    <>
      <main>
        <section className="bg-white">
          <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 layout">
            <div className="flex items-center">
              <Image
                alt="SainsIn Education"
                className="h-8 w-auto"
                height={64}
                src={logo}
                width={64}
              />
              <h1 className="text-2xl md:text-4xl font-bold ml-3">
                SehatIn CMS
              </h1>
            </div>
            <p className="my-4 text-sm">
              Content Management System for SehatIn
            </p>

            <span className="w-80 inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border-2 border-blue-600 rounded-md bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:outline-none focus:border-blue-300 focus:ring-blue transition duration-150 ease-in-out"
                aria-label="Sign in with Google"
                onClick={(e) => {
                  let email = "";
                  firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then((result) => {
                      email = result.user.email;
                      return result.user.getIdTokenResult();
                    })
                    .then(async (result) => {
                      console.log({ AuthUser });
                      console.log({ result });
                      if (result.claims?.admin) {
                        // let login
                      } else {
                        // Show regular user UI.
                        toast({
                          title: "Bukan Admin.",
                          description:
                            "Kamu bukan admin, pastikan akun yang kamu pilih benar!",
                          status: "error",
                          duration: 5000,
                          isClosable: true,
                        });
                        firebase.auth().signOut();
                      }
                    })
                    .catch((error) => console.log(error));
                }}
              >
                <Image
                  alt="Google"
                  src={logoGoogle}
                  className="rounded align-top mr-2"
                />
                Login dengan Akun Google
              </button>
            </span>
            <p className="mt-2 text-center text-sm leading-5 font-semibold text-white max-w">
              Only privileged account can login
            </p>

            <footer className="absolute text-gray-500 bottom-2">
              © {new Date().getFullYear()} By SehatIn
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  LoaderComponent: Loader,
})(HomePage);
