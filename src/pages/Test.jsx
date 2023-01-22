import React, { useState, useEffect } from "react";
import "./test.css";

import { projectData, dataColumn } from "../data/importData";
import { userColumns } from "../data/importData";
import { Header, AddEmployee } from "../components";
import { chatData } from "../data/dummy";
import { db } from "../firebase";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Test = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);

  // const q = query(collection(db, "users"), where("Country", "==", "US"));
  const q = query(collection(db, "projects"));
  useEffect(() => {
    const getEmployee = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          console.log(doc.id);
          list.push({ ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    getEmployee();
  }, []);

  return (
    <div className="all">
      {/* <div className="test1">
        <div className="test4">
          <div className="project">
            <div className="project_img"></div>
            Project1
          </div>
          <div className="project">
            <div className="project_img"></div>
            Project2
          </div>
          <div className="project">
            <div className="project_img"></div>
            Project3
          </div>
          <div className="project">
            <div className="project_img"></div>
            Project4
          </div>
          <div className="project">
            <div className="project_img"></div>
            Project5
          </div>
        </div>
    </div> */}
      <Header category="Page" title="Employees" />
      <GridComponent
        dataSource={data}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {dataColumn.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};

export default Test;
