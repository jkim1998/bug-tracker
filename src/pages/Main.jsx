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
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const { user } = useAuth();
  return (
    <div className="flex flex-col h-full pr-4 bg-slate-500">
      <div className="flex flex-row justify-center w-full bg-sky-400">
        <h3>Welcome, {user.displayName}</h3>
      </div>
      <div className="flex flex-row justify-between w-full py-4 bg-sky-500">
        <div className="flex flex-col justify-center items-center w-1/4 mr-4 py-12 px-12 rounded-2xl bg-slate-500">
          <h1>Active Projects</h1>
          <h2>15</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4 mx-4 py-12 px-12 rounded-2xl bg-slate-500">
          <h1>Total Tickets</h1>
          <h2>15</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4 mx-4 py-12 px-12 rounded-2xl bg-slate-500">
          <h1>Unassigned Tickets</h1>
          <h2>15</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-1/4 ml-4 py-12 px-12 rounded-2xl bg-slate-500">
          <h1>Analytics</h1>
          <h2>15</h2>
        </div>
      </div>

      <div className="flex flex-row justify-between h-fit w-full py-4 bg-sky-600">
        <div className="flex flex-col justify-center items-center w-1/4 mr-4 px-3 rounded-2xl bg-white">
          <div className="flex flex-row items-center w-full h-1/4 my-1 border-b-4 border-indigo-500 ">
            <div className="flex justify-center roundex 2xl p-4 mr-2 border-2 border-indigo-300 rounded-2xl">
              <FaUserAlt />
            </div>
            <div className="flex flex-col">
              <p>new users</p>
              <p>10</p>
            </div>
          </div>
          <div className="flex flex-row items-center w-full h-1/4 mb-1 border-b-4 border-indigo-500">
            <div className="flex justify-center roundex 2xl p-4 mr-2 border-2 border-indigo-300 rounded-2xl">
              <FaUsers />
            </div>
            <div className="flex flex-col">
              <p>new users</p>
              <p>10</p>
            </div>
          </div>
          <div className="flex flex-row items-center w-full h-1/4 mb-1 border-b-4 border-indigo-500">
            <div className="flex justify-center roundex 2xl p-4 mr-2 border-2 border-indigo-300 rounded-2xl">
              <AiFillBug />
            </div>
            <div className="flex flex-col">
              <p>new users</p>
              <p>10</p>
            </div>
          </div>
          <div className="flex flex-row items-center w-full h-1/4 mb-1">
            <div className="flex justify-center roundex 2xl p-4 mr-2 border-2 border-indigo-300 rounded-2xl">
              <GrUserWorker />
            </div>
            <div className="flex flex-col">
              <p>new users</p>
              <p>10</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-1/4 mx-4 px-3 rounded-2xl bg-white">
          <div className="flex flex-col justify-center items-center h-1/5 w-full">
            Company Data
          </div>
          <div className="flex flex-col justify-center items-center h-4/5 w-full">
            <div className="flex flex-row justify-between items-center w-full h-1/4 px-4 mb-1 border-b-4 border-indigo-500">
              <div className="flex flex-row justify-center items-center w-1/5 mr-3">
                <FaUsers size={30} />
              </div>
              <div className="flex flex-row justify-between items-center w-4/5 h-full">
                <p>Members</p>
                <p className="flex flex-row justify-center items-center w-10 p-1 rounded-md border-4 border-indigo-500">
                  27
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center w-full h-1/4 px-4 mb-1 border-b-4 border-indigo-500">
              <div className="flex flex-row justify-center items-center w-1/5 mr-3">
                <AiFillFolder size={30} />
              </div>
              <div className="flex flex-row justify-between items-center w-4/5 h-full">
                <p>Projects</p>
                <p className="flex flex-row justify-center items-center w-10 p-1 rounded-md border-4 border-indigo-500">
                  4
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full h-1/4 px-4 mb-1 border-b-4 border-indigo-500">
              <div className="flex flex-row justify-center items-center w-1/5 mr-3">
                <GiTicket size={30} />
              </div>
              <div className="flex flex-row justify-between items-center w-4/5 h-full">
                <p>Tickets</p>
                <p className="flex flex-row justify-center items-center w-10 p-1 rounded-md border-4 border-indigo-500">
                  100
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full h-1/4 px-4">
              <div className="flex flex-row justify-center items-center w-1/5 mr-3">
                <IoMdNotifications size={30} />
              </div>
              <div className="flex flex-row justify-between items-center w-4/5 h-full">
                <p>Notifications</p>
                <p className="flex flex-row justify-center items-center w-10 p-1 rounded-md border-4 border-indigo-500">
                  1
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
      <div className="flex flex-row justify-center items-center h-1/3 rounded-2xl bg-sky-700">
        <div className="flex justify-center items-center w-1/3 mr-4 rounded-2xl bg-sky-800">
          <PieChart
            id="pie-chart"
            data={pieChartData}
            legendVisiblity={true}
            height="300px"
            width="400px"
            background="transparent"
          />
        </div>
        <div className="flex justify-center items-center w-1/3 mx-4 rounded-2xl bg-sky-800">
          <PieChart
            id="pie-chart2"
            data={pieChartData2}
            legendVisiblity={true}
            height="300px"
            width="400px"
            background="transparent"
          />
        </div>
        <div className="flex justify-center items-center w-1/3 ml-4 rounded-2xl bg-sky-800">
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
