import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

// import { kanbanGrid } from "../data/importData";
import { kanbanData, kanbanGrid } from "../data/dummy";
import { ticketData, ticketGrid } from "../data/importData";
import { Header } from "../components";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
const Kanban = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const [popUp, setPopup] = useState(false);
  const [err, setError] = useState();
  const [per, setPerc] = useState(null);

  const handleInput = (e) => {
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
      await setDoc(doc(db, "tickets", data.Id), {
        Id: data.Id,
        Status: data.Status,
      });
      setData("");
      document.getElementById("ticket_add").reset();
      // navigate(-1);
      setError("");
    } catch (err) {
      console.log(err);
      setError("error");
    }
  };

  // const q = query(collection(db, "users"), where("Country", "==", "US"));
  const q = query(collection(db, "tickets"));
  useEffect(() => {
    const gerProject = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          list.push({ ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    gerProject();
  }, []);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="App" title="Kanban" />
        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource={data}
          cardSettings={{ contentField: "summary", headerField: "Id" }}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {ticketGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
        </KanbanComponent>
      </div>
      <button onClick={() => togglePopUp()}>Add Ticket</button>
      {popUp && (
        <div className="popup">
          <div className="button_container">
            <button className="close" onClick={() => togglePopUp()}>
              X
            </button>
          </div>
          <form className="addProject" onSubmit={addProject} id="ticket_add">
            <input
              id="Priority"
              value={data.Priority}
              placeholder="Priority"
              onChange={handleInput}
            />
            <input
              id="Id"
              value={data.Id}
              placeholder="ID"
              onChange={handleInput}
            />
            <input
              id="Title"
              value={data.Title}
              placeholder="Title"
              onChange={handleInput}
            />
            <input
              id="Type"
              value={data.Type}
              placeholder="Type"
              onChange={handleInput}
            />
            <input
              id="AssignTo"
              value={data.AssignTo}
              placeholder="Assign to"
              onChange={handleInput}
            />
            <input
              id="Status"
              value={data.Status}
              placeholder="Status"
              onChange={handleInput}
            />
            {/* <select id="status" name="status" size="3">
              <option value="Open">Open</option>
              <option value="Testing">Testing</option>
              <option value="InProcess">In Process</option>
              <option value="Closed">Closed</option>
            </select> */}
            <input
              id="summary"
              value={data.Summary}
              placeholder="summary"
              onChange={handleInput}
            />
            <input
              id="tag"
              value={data.Tag}
              placeholder="tag"
              onChange={handleInput}
            />
            <button disabled={per !== null && per < 100} type="submit">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Kanban;
