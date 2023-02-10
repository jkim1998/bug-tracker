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
import { projectData, projectColumn } from "../data/importData";
import { Header } from "../components";

const Projects = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const [addproject, setAddProject] = useState(false);
  const [err, setError] = useState();
  const [per, setPerc] = useState(null);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData((data) => {
      return { ...data, [id]: value };
    });

    console.log("data:" + data.title);
  };

  const toggleAddProject = () => {
    setAddProject(!addproject);
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "Projects", data.title), {
        data,
      });
      console.log("project: " + data.title);
      document.getElementById("project_add").reset();
      // is there better option than refresh page to reload data
      window.location.reload();
      toggleAddProject();
    } catch (err) {
      console.log(err);
    }
  };

  const q = collection(db, "Projects");
  const projectlist = query(q);
  useEffect(() => {
    const getProject = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(projectlist);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          list.push({ ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    getProject();
  }, []);

  return (
    <>
      {addproject ? (
        <div className="project">
          <div className="button_container">
            <button className="close" onClick={() => toggleAddProject()}>
              close
            </button>
          </div>
          <form onSubmit={addProject} id="project_add">
            <input
              id="title"
              value={data.title}
              placeholder="title"
              onChange={handleInput}
              required={true}
            />
            <input
              id="member"
              value={data.member}
              placeholder="member"
              onChange={handleInput}
              required={false}
            />
            <input
              id="status"
              value={data.status}
              placeholder="status"
              onChange={handleInput}
              required={true}
            />
            <input
              id="tag"
              value={data.tag}
              placeholder="tag"
              onChange={handleInput}
              required={false}
            />
            <input
              id="github"
              value={data.github}
              placeholder="github link"
              onChange={handleInput}
              required={false}
            />
            <input
              id="preview"
              value={data.preview}
              placeholder="preview link"
              onChange={handleInput}
              required={false}
            />
            <button disabled={per !== null && per < 100} type="submit">
              Add
            </button>
          </form>
        </div>
      ) : (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="Page" title="Orders" />
          <GridComponent
            id="gridcomp"
            dataSource={data}
            allowPaging
            allowSorting
            allowExcelExport
            allowPdfExport
            contextMenuItems={projectColumn}
            editSettings={editing}
          >
            <ColumnsDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {projectColumn.map((item, index) => (
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
          <button onClick={() => toggleAddProject()}>Add Project</button>
        </div>
      )}
    </>
  );
};

const PopUP = () => {};

export default Projects;
