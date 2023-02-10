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
  getCountFromServer,
} from "firebase/firestore";
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { projectData, projectColumn } from "../data/importData";
import { Header } from "../components";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";

import { ChartsHeader, LineChart } from "../components";
import { pieChartData, pieChartData2, pieChartData3 } from "../data/importData";
import { Pie as PieChart } from "../components";
import { useAuth } from "../contexts/AuthContext";
import { FaUserAlt, FaUsers } from "react-icons/fa";
import { AiFillBug, AiFillFolder } from "react-icons/ai";
import { GrUserWorker } from "react-icons/gr";
import { GiTicket } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import "./styles.css";

const Main = () => {
  let date = new Date();
  var today = new Date();
  var yesterday = new Date(date.setDate(today.getDate() - 100));
  const { user } = useAuth();
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const [err, setError] = useState();
  const [NumProject, setNumProject] = useState(0);
  const [NumTicket, setNumTicket] = useState(0);
  const [NumUser, setNumUser] = useState(0);
  const [unassigned, setUnassigned] = useState(0);
  const [newUser, setNewUser] = useState(0);

  const colProject = collection(db, "Projects");
  const colTicket = collection(db, "tickets");
  const colUser = collection(db, "users");
  const colUnassigned = collection(db, "tickets");
  const colNewUser = collection(db, "users");

  const qProject = query(colProject);
  const qTicket = query(colTicket);
  const qUser = query(colUser);
  const qUnassigned = query(colUnassigned, where("Status", "==", "Open"));
  const qNewUser = query(colUnassigned, where("timeStamp", "=>", yesterday));

  useEffect(() => {
    const getNum = async () => {
      try {
        const snapProject = await getCountFromServer(qProject);
        const snapTicket = await getCountFromServer(qTicket);
        const snapUser = await getCountFromServer(qUser);
        const snapUnassigned = await getCountFromServer(qUnassigned);
        const snapNewUser = await getCountFromServer(qNewUser);

        setNumProject(snapProject.data().count);
        setNumTicket(snapTicket.data().count - 1);
        setNumUser(snapUser.data().count);
        setUnassigned(snapUnassigned.data().count);
        setNewUser(snapNewUser.data().count);

        console.log("date: ", yesterday);
      } catch (err) {
        console.log(err);
      }
    };
    getNum();
  }, []);

  return (
    <div className="flex flex-col h-full px-4">
      <div className="flex flex-row justify-center w-full pb-5">
        <h3>Welcome, {user.displayName}</h3>
      </div>
      <div className="flex flex-row justify-between w-full py-4">
        <div className="flex flex-col justify-center items-center w-1/4 mr-4 py-12 px-12 rounded-2xl bg-blue-600 text-white font-bold">
          <h1>Active Projects</h1>
          <h2>{NumProject}</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4 mx-4 py-12 px-12 rounded-2xl bg-yellow-400 text-white font-bold">
          <h1>Total Tickets</h1>
          <h2>{NumTicket}</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4 mx-4 py-12 px-12 rounded-2xl bg-green-600 text-white font-bold">
          <h1>Unassigned Tickets</h1>
          <h2>{unassigned}</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4 ml-4 py-12 px-12 rounded-2xl bg-red-600 text-white font-bold">
          <h1>Analytics</h1>
          <h2>99</h2>
        </div>
      </div>

      <div className="flex flex-row justify-between h-fit w-full py-4">
        <div className="flex flex-col justify-center items-center w-1/4 mr-4 px-3 rounded-2xl bg-white">
          <div className="flex flex-row items-center w-full h-1/4 my-1 border-b-2 border-slate-300 ">
            <div className="flex justify-center roundex 2xl p-4 mr-2 border-1 border-slate-300 rounded-xl">
              <FaUserAlt />
            </div>
            <div className="flex flex-col">
              <p>New Users</p>
              <p>{newUser}</p>
            </div>
          </div>
          <div className="flex flex-row items-center w-full h-1/4 mb-1 border-b-2 border-slate-300">
            <div className="flex justify-center roundex 2xl p-4 mr-2 border-1 border-slate-300 rounded-xl">
              <FaUsers />
            </div>
            <div className="flex flex-col">
              <p>Total Users</p>
              <p>99</p>
            </div>
          </div>
          <div className="flex flex-row items-center w-full h-1/4 mb-1 border-b-2 border-slate-300">
            <div className="flex justify-center roundex 2xl p-4 mr-2 border-1 border-slate-300 rounded-xl">
              <AiFillBug />
            </div>
            <div className="flex flex-col">
              <p>Tickets in Development</p>
              <p>99</p>
            </div>
          </div>
          <div className="flex flex-row items-center w-full h-1/4 mb-1">
            <div className="flex justify-center roundex 2xl p-4 mr-2 border-1 border-slate-300 rounded-xl">
              <GrUserWorker />
            </div>
            <div className="flex flex-col">
              <p>Total Developers</p>
              <p>99</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-1/4 mx-4 px-3 rounded-2xl bg-white">
          <div className="flex flex-col justify-center items-center h-1/5 w-full">
            Company Data
          </div>
          <div className="flex flex-col justify-center items-center h-4/5 w-full">
            <div className="flex flex-row justify-between items-center w-full h-1/4 px-4 mb-1 border-b-2 border-slate-300">
              <div className="flex flex-row justify-center items-center w-1/5 mr-3">
                <FaUsers size={30} />
              </div>
              <div className="flex flex-row justify-between items-center w-4/5 h-full">
                <p className="text-teal-400 font-semibold">Members</p>
                <p className="flex flex-row justify-center items-center w-10 p-1 rounded-md border-2 border-slate-300">
                  {NumUser}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center w-full h-1/4 px-4 mb-1 border-b-2 border-slate-300">
              <div className="flex flex-row justify-center items-center w-1/5 mr-3">
                <AiFillFolder size={30} />
              </div>
              <div className="flex flex-row justify-between items-center w-4/5 h-full">
                <p className="text-teal-400 font-semibold">Projects</p>
                <p className="flex flex-row justify-center items-center w-10 p-1 rounded-md border-2 border-slate-300">
                  {NumProject}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full h-1/4 px-4 mb-1 border-b-2 border-slate-300">
              <div className="flex flex-row justify-center items-center w-1/5 mr-3">
                <GiTicket size={30} />
              </div>
              <div className="flex flex-row justify-between items-center w-4/5 h-full">
                <p className="text-teal-400 font-semibold">Tickets</p>
                <p className="flex flex-row justify-center items-center w-10 p-1 rounded-md border-2 border-slate-300">
                  {NumTicket}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full h-1/4 px-4">
              <div className="flex flex-row justify-center items-center w-1/5 mr-3">
                <IoMdNotifications size={30} />
              </div>
              <div className="flex flex-row justify-between items-center w-4/5 h-full">
                <p className="text-teal-400 font-semibold">Notifications</p>
                <p className="flex flex-row justify-center items-center w-10 p-1 rounded-md border-2 border-slate-300">
                  99
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-1/4 mx-4 px-3 rounded-2xl bg-white">
          Prioirty Projects
          <div className="flex justify-center items-centerbg-sky-800">
            <PieChart
              id="pie-chart5"
              data={pieChartData}
              legendVisiblity={true}
              height="300px"
              width="300px"
              innerRadius="40%"
              background="transparent"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-1/4 h-fit ml-4 px-3 rounded-2xl bg-white">
          <ChartsHeader category="Line" title="Inflation Rate" />
          <div className="w-full">
            <LineChart />
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center items-center">
        {/* <div className="criticalbug">
          <p>Critical Bug</p>
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
        </div> */}
      </div>
      <div className="flex flex-row justify-center items-center h-1/3 rounded-2xl">
        <div className="flex justify-center items-center w-1/3 mr-4 rounded-2xl bg-white">
          <PieChart
            id="pie-chart"
            data={pieChartData}
            legendVisiblity={true}
            height="300px"
            width="400px"
            background="transparent"
          />
        </div>
        <div className="flex justify-center items-center w-1/3 mx-4 rounded-2xl bg-white">
          <PieChart
            id="pie-chart2"
            data={pieChartData2}
            legendVisiblity={true}
            height="300px"
            width="400px"
            background="transparent"
          />
        </div>
        <div className="flex justify-center items-center w-1/3 ml-4 rounded-2xl bg-white">
          <PieChart
            id="pie-chart3"
            data={pieChartData2}
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

export default Main;
