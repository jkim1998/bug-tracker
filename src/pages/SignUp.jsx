import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "./test.css";

const SignUp = () => {
  const { user } = useAuth();

  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  // don't need this
  // const [data, setData] = useState({
  //   name: "",
  //   email: "",
  // });
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const uploadFile = () => {
  //     const name = new Date().getTime() + file.name;

  //     console.log(name);
  //     const storageRef = ref(storage, file.name);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         setPerc(progress);
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setData((prev) => ({ ...prev, img: downloadURL }));
  //         });
  //       }
  //     );
  //   };
  //   file && uploadFile();
  // }, [file]);

  console.log(data);

  const handleInput = (e) => {
    // const id = e.target.id;
    // const value = e.target.value;
    const { id, value } = e.target;
    setData((data) => {
      return { ...data, [id]: value };
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      setData("");
      document.getElementById("account_creation").reset();
      // navigate(-1);
      setError("");
    } catch (err) {
      console.log(err);
      setError("error");
    }
  };

  return (
    <div className="test1">
      {error !== "" && <h2>{error}</h2>}
      <form onSubmit={handleAdd} id="account_creation" className="test2">
        <input
          id="title"
          value={data.title}
          placeholder="title"
          onChange={handleInput}
        />
        <input
          id="name"
          value={data.name}
          placeholder="name"
          onChange={handleInput}
        />
        <input
          id="email"
          value={data.email}
          placeholder="email"
          onChange={handleInput}
        />
        <input
          id="password"
          value={data.password}
          placeholder="password"
          onChange={handleInput}
        />
        <button
          disabled={per !== null && per < 100}
          type="submit"
          className="test3"
        >
          Sign up
        </button>
        <a href="login">log in</a>
      </form>
    </div>
  );
};

export default SignUp;
