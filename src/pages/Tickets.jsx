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
    // console.log(data);
  };

  const togglePopUp = () => {
    setPopup(!popUp);
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "tickets", data.Id), {
        Id: data.Id,
        Title: data.Title,
        Type: data.Type,
        Assign: data.Assign,
        Status: "Open",
        Summary: data.Summary,
        Prioirty: data.Priority,
      });
      console.log("ticketID: " + ticketID);
      document.getElementById("ticket_add").reset();
      // navigate(-1);
      togglePopUp();
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      console.log("err ticketID: " + ticketID);
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
        let newTicket = parseInt(ticket.Id, 10) + 1;
        setTicketID(newTicket + 1);
        // console.log("ticket+1: " + ticketID);

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
            <form onSubmit={addProject} id="ticket_add">
              <div className="button_container">
                <button className="close" onClick={() => togglePopUp()}>
                  X
                </button>
              </div>
              <input
                id="Id"
                value={!data ? "" : data.Id}
                defaultValue={data.Id}
                placeholder={ticketID}
                onChange={handleInput}
                readOnly={false}
                required={true}
              />
              <input
                id="Title"
                value={data.Title}
                placeholder="Title"
                onChange={handleInput}
                required={true}
              />
              <input
                id="Type"
                value={data.Type}
                placeholder="Type"
                onChange={handleInput}
                required={true}
              />
              <input
                id="Assign"
                value={data.Assign}
                placeholder="Assign to"
                onChange={handleInput}
                required={true}
              />
              <textarea
                id="Summary"
                value={data.Summary}
                placeholder="Summary"
                onChange={handleInput}
                required={true}
              />
              <select
                id="Priority"
                value={data.Priority}
                placeholder="Priority"
                onChange={handleInput}
                required={true}
                // defaultValue={{ value: "low" }}
              >
                <option>Prioirty</option>
                <option value="low">Low</option>
                <option value="mid">Mid</option>
                <option value="high">High</option>
              </select>
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
              {err && (
                <p className="err_msg">
                  Something went wrong. Please check connection and try again
                </p>
              )}
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
