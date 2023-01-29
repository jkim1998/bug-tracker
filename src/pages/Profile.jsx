import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { Popup } from "@syncfusion/ej2-react-popups";
import user_default from "../data/user_default.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./SignUp";

const Profile = () => {
  const toolbarOptions = ["Search"];
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [error, setError] = useState(false);
  const [values, setValues] = useState(false);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData((data) => {
      return { ...data, [id]: value };
    });
  };

  const newProfile = async (e) => {
    e.preventDefault();
    const queryProfile = doc(db, "users", user.uid);
    try {
      await updateDoc(queryProfile, {
        name: data.name,
        email: data.email,
        // phonenumber: data.phonenumber,
        // address: data.address,
      });
      console.log(user.displayName + " updated");
    } catch (err) {
      console.log("update error");
    }
  };

  return (
    <>
      <div className="top">
        <form id="profile">
          <h2>Basic Info</h2>
          <p>
            Some info may be visible to other people using Bug Tracker services.
          </p>
          <div className="section">
            <h1>Photo</h1>
            <img
              className="rounded-full h-24 w-24 border-2"
              src={user ? user.photoURL : user_default}
              alt={user_default}
            />
          </div>
          <div className="section">
            <h1>Name</h1>
            <p>{user.displayName}</p>
          </div>
          <div className="section">
            <h1>Title</h1>
            <p>{user.title}</p>
          </div>
          <div className="section">
            <h1>Email</h1>
            <p>{user.email}</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
