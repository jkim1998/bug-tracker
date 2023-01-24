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
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { ChartsHeader, LineChart } from "../components";
import { pieChartData, pieChartData2, pieChartData3 } from "../data/importData";
import { Pie as PieChart } from "../components";

const Kanban = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const [popUp, setPopup] = useState(false);
  const [err, setError] = useState();
  const [per, setPerc] = useState(null);
  const [ticket, setTicket] = useState({});
  const [ticketID, setTicketID] = useState(0);

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
    // e.preventDefault();
    try {
      await setDoc(doc(db, "tickets", data.Id), {
        Id: data.Id,
        Status: data.Status,
      });
      console.log("ticketID: " + ticketID);
      document.getElementById("ticket_add").reset();
      // navigate(-1);
    } catch (err) {
      console.log("err ticketID: " + ticketID);
      // togglePopUp();
    }
  };
  // const q = query(collection(db, "users"), where("Country", "==", "US"));
  const q = collection(db, "tickets");
  const ticketlist = query(q);
  const ticketNumber = query(q, orderBy("Id", "desc"), limit(1));
  useEffect(() => {
    const getProject = async () => {
      let list = [];
      let list_ticket = [];
      try {
        const queryTicketList = await getDocs(ticketNumber);
        queryTicketList.forEach((doc) => {
          list_ticket.push({ ...doc.data() });
        });
        setTicket(list_ticket[0]);
        let test = parseInt(ticket.Id, 10) + 1;
        setTicketID(test);

        const querySnapshot = await getDocs(ticketlist);
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
  }, [ticketID]);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="App" title="Kanban" />
        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource={data}
          cardSettings={{ contentField: "Summary", headerField: "Id" }}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {ticketGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
        </KanbanComponent>
      </div>
      <button onClick={() => togglePopUp()}>Add Ticket {ticketID}</button>
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
              placeholder={ticketID}
              onChange={handleInput}
              readOnly={false}
            />
            <p>{ticketID}</p>
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
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <ChartsHeader category="Pie" title="Project Cost Breakdown" />
        <div className="w-full">
          <PieChart
            id="pie-chart"
            data={pieChartData}
            legendVisiblity={true}
            height="160px"
          />
          <PieChart
            id="pie-chart2"
            data={pieChartData2}
            legendVisiblity={true}
            height="160px"
          />
          <PieChart
            id="pie-chart3"
            data={pieChartData3}
            legendVisiblity={true}
            height="160px"
          />
        </div>
      </div>
    </>
  );
};

export default Kanban;
