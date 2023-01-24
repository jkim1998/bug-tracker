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
    e.preventDefault();
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
      togglePopUp();
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
    <div className="tickets">
      <div className="container_kanban">
        {popUp && (
          <div className="popup">
            <form className="addProject" onSubmit={addProject} id="ticket_add">
              <div className="button_container">
                <button className="close" onClick={() => togglePopUp()}>
                  X
                </button>
              </div>
              <input
                id="Id"
                value={data.Id}
                placeholder={ticketID}
                onChange={handleInput}
                readOnly={false}
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
              <textarea
                id="summary"
                value={data.Summary}
                placeholder="summary"
                onChange={handleInput}
              />
              <select
                id="Priority"
                value={data.Priority}
                placeholder="Priority"
                onChange={handleInput}
              >
                <option value="high">High</option>
                <option value="mid">Mid</option>
                <option value="low">Low</option>
                </select>
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        )}
        <button className="addticket" onClick={() => togglePopUp()}>
          Add Ticket {ticketID}
        </button>
        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource={data}
          cardSettings={{ contentField: "Summary", headerField: "Id" }}
        >
          <ColumnsDirective>
            {ticketGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
        </KanbanComponent>
      </div>

      <div className="container_chart">
        <div className="container_pie">
          <p>By Priority</p>
          <PieChart
            id="pie-chart"
            data={pieChartData}
            legendVisiblity={true}
            height="300px"
            width="400px"
            background="transparent"
          />
        </div>
        <div className="container_pie">
          <p>By Type</p>
          <PieChart
            id="pie-chart2"
            data={pieChartData2}
            legendVisiblity={true}
            height="300px"
            width="400px"
            background="transparent"
          />
        </div>
        <div className="container_pie">
          <p>By Status</p>
          <PieChart
            id="pie-chart3"
            data={pieChartData3}
            legendVisiblity={true}
            height="300px"
            width="400px"
            background="transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Kanban;
