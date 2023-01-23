import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

// import { kanbanGrid } from "../data/importData";
import { kanbanData, kanbanGrid } from "../data/dummy";
import { Header } from "../components";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
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
      const docRef = await addDoc(collection(db, "tickets"), {
        data,
        // timeStamp: serverTimestamp(),
      });
      console.log(data);
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
    const getTicket = async () => {
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
    getTicket();
  }, []);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="App" title="Kanban" />
        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource={kanbanData}
          cardSettings={{ contentField: "Summary", headerField: "Id" }}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {kanbanGrid.map((item, index) => (
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
              id="priority"
              value={data.Priority}
              placeholder="priority"
              onChange={handleInput}
            />
            <input
              id="id"
              value={data.Id}
              placeholder="ID"
              onChange={handleInput}
            />
            <input
              id="title"
              value={data.Title}
              placeholder="title"
              onChange={handleInput}
            />
            <input
              id="type"
              value={data.Type}
              placeholder="type"
              onChange={handleInput}
            />
            <input
              id="assignTo"
              value={data.AssignTo}
              placeholder="Assign to"
              onChange={handleInput}
            />
            <input
              id="status"
              value={data.Status}
              placeholder="status"
              onChange={handleInput}
            />
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
