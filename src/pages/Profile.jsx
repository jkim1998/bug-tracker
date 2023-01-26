import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { employeesGrid } from "../data/dummy";
import { Header, AddEmployee } from "../components";
import { Popup } from "@syncfusion/ej2-react-popups";
import { userColumns } from "../data/importData";
import user_default from "../data/user_default.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./SignUp";

const Profile = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const [error, setError] = useState(false);
  const [values, setValues] = useState(false);
  const [edit, setEdit] = useState(false);

  const togglePasswordHide = () => {
    setValues(!values);
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData((data) => {
      return { ...data, [id]: value };
    });
  };

  return (
    <>
      <form className="profile" id="profile">
        <div className="top">
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
            <input
              placeholder={user ? user.displayName : <p>Name</p>}
              className="w-full"
              value={data.displayName}
              onChange={handleInput}
            />
          </div>
          <div className="section">
            <h1>Title</h1>
            <input
              placeholder={user.title ? user.title : <p>Title</p>}
              className="w-full"
              value={data.title}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="mid">
          <h2>Account Info</h2>
          <div className="section">
            <h1>Email</h1>
            <input
              placeholder={user ? user.email : <p>Email</p>}
              className="w-full"
              value={data.email}
              onChange={handleInput}
            />
          </div>

          <div className="section">
            <h1>Password</h1>
            {values ? (
              <>
                <button onClick={() => togglePasswordHide()} className="mr-1">
                  <AiFillEye />
                </button>
                <p className="password">##########</p>
              </>
            ) : (
              <>
                <button onClick={() => togglePasswordHide()} className="mr-1">
                  <AiFillEyeInvisible />
                </button>
                <p className="password">{data.password}</p>
                {/* <input /> */}
              </>
            )}
          </div>

          <div className="section">
            <h1>Phone Number</h1>
            <input
              placeholder={
                user.phonenumber === null ? (
                  user.phoneumber
                ) : (
                  <p>Phone Number</p>
                )
              }
              className="w-full"
              value={data.phonenumber}
              onChange={handleInput}
            />
          </div>

          <div className="section">
            <h1>Address</h1>
            <input
              placeholder={user.address ? user.address : <p>Address</p>}
              className="w-full"
              value={data.address}
              onChange={handleInput}
            />
          </div>
        </div>
        {/* <button onClick={() => updateProfile()}>Save</button> */}
      </form>
    </>
  );
};

export default Profile;
