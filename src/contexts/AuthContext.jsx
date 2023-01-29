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
  getDoc,
  where,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [err, setError] = useState();
  const [userID, setUID] = useState();

  const addAccount = async (userID) => {
    try {
      await setDoc(doc(db, "users", userID), {
        ...data,
      });
      console.log("pog");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const SignIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
    // const signInWithGoogle = async () => {
    //   try {
    //     const res = await signInWithPopup(auth, provider);
    //     const user = res.user;
    //     const q = query(collection(db, "users"), where("uid", "==", user.uid));
    //     const docs = await getDoc(q);
    //     if (docs.docs.length === 0) {
    //       await addDoc(collection(db, "users"), {
    //         uid: user.uid,
    //         name: user.displayName,
    //         authProvider: "google",
    //         email: user.email,
    //       });
    //     }
    //   } catch (err) {
    //     console.error(err);
    //     alert(err.message);
    //   }
    // };
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/main");
        console.log("qq:" + user.uid);
        console.log("name: " + user.displayName);
        console.log("email: " + user.email);
        console.log("password: " + user.password);
        setUID(user.uid);
        console.log("uid: " + userID);
        // addAccount(userID);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
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
      console.log("User", currentUser.displayName);
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
