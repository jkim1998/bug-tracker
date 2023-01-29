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

import "./styles.css";

const Main = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const [data, setData] = useState([]);
  const { user } = useAuth();
  return (
    <div className="main">
      <div className="welcome">
        <h3>Welcome, {user.displayName}</h3>
      </div>
      <div className="flex flex-row"></div>
      <div className="flex flex-row w-full justify-center items-center">
        <div className="total_tickets">
          <h1>Total Tickets</h1>
          <h2>15</h2>
        </div>
        <div className="criticalbug">
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
        </div>
      </div>
      <div className="flex flex-row">
        <div className="graph">
          <ChartsHeader category="Line" title="Inflation Rate" />
          <div className="w-full">
            <LineChart />
          </div>
        </div>
        <div className="task_completion">
          <PieChart
            id="pie-chart"
            data={pieChartData}
            legendVisiblity={true}
            height="300px"
            width="400px"
            background="transparent"
          />
        </div>
        <div className="task_completion">
          <PieChart
            id="pie-chart2"
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
