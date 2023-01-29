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

import { employeesGrid } from "../data/dummy";
import { Header, AddEmployee } from "../components";
import { Popup } from "@syncfusion/ej2-react-popups";
import { db } from "../firebase";
import { userColumns } from "../data/importData";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./SignUp";

import { DataGrid } from "@mui/x-data-grid";

const Members = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const [toggleAccount, setToggleAccount] = useState(false);

  const q = query(collection(db, "users"));
  useEffect(() => {
    const getEmployee = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    getEmployee();
  }, [data]);

  const createAccount = () => {
    setToggleAccount(!toggleAccount);
  };
  
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!toggleAccount ? (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <button onClick={() => createAccount()}>account create</button>
          <GridComponent
            dataSource={data}
            width="auto"
            allowPaging
            allowSorting
            pageSettings={{ pageCount: 5 }}
            editSettings={editing}
            toolbar={toolbarOptions}
          >
            <ColumnsDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {userColumns.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject services={[Search, Page]} />
          </GridComponent>
        </div>
      ) : (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <button onClick={() => createAccount()}>back to list</button>
        </div>
      )}
    </>
  );
};

export default Members;
