import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { projectData, dataColumn } from "../data/importData";
import { Header } from "../components";

const Orders = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const [popUp, setPopup] = useState(false);
  const [err, setError] = useState();
  const [per, setPerc] = useState(null);
  // const q = query(collection(db, "users"), where("Country", "==", "US"));
  const q = query(collection(db, "projects"));
  useEffect(() => {
    const getEmployee = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          console.log(doc.data());
          list.push({ ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    getEmployee();
  }, []);

  const handleInput = (e) => {
    // const id = e.target.id;
    // const value = e.target.value;
    const { id, value } = e.target;
    setData((data) => {
      return { ...data, [id]: value };
    });
  };

  const togglePopUp = () => {
    setPopup(!popUp);
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        data,
        timeStamp: serverTimestamp(),
      });
      console.log(data)
      setData("");
      document.getElementById("project_add").reset();
      // navigate(-1);
      setError("");
    } catch (err) {
      console.log(err);
      setError("error");
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={data}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        // contextMenuItems={dataColumn}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {dataColumn.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
      <button onClick={() => togglePopUp()}>Add Project</button>

      {popUp && (
        <div className="popup">
          <div className="button_container">
            <button className="close" onClick={() => togglePopUp()}>
              X
            </button>
          </div>
          <form className="addProject" onSubmit={addProject} id="project_add">
            <input
              id="title"
              value={data.title}
              placeholder="title"
              onChange={handleInput}
            />
            <input
              id="member"
              value={data.member}
              placeholder="member"
              onChange={handleInput}
            />
            <input
              id="status"
              value={data.status}
              placeholder="status"
              onChange={handleInput}
            />
            <button disabled={per !== null && per < 100} type="submit">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

const PopUP = () => {};

export default Orders;
