import { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../firebase";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  GithubAuthProvider,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateCurrentUser,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [err, setError] = useState();
  //   const addAccount = async () => {
  //   try {
  //     await setDoc(doc(db, "users", res.user.uid), {
  //       ...data,
  //       timeStamp: serverTimestamp(),
  //     });
  //     setData("");
  //     document.getElementById("account_creation").reset();
  //     // navigate(-1);
  //     setError("");
  //   } catch (err) {
  //     console.log(err);
  //     setError("error");
  //   }
  // };
  const SignIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // addAccount;
        const user = userCredential.user;
        navigate("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const user = result.user;
        navigate("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  };

  const githubSignIn = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const user = result.user;
        navigate("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GithubAuthProvider.credentialFromError(error);
      });
  };

  const logout = () => {
    signOut(auth);
    console.log(user, "logged out");
    navigate("/login");
  };

  const profileUpdate = (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: data.displayName,
      title: data.title,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        // Profile updated!
        console.log("profile updated");
      })
      .catch((error) => {
        // An error occurred
        console.log("profile update error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        googleSignIn,
        facebookSignIn,
        githubSignIn,
        user,
        logout,
        profileUpdate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
