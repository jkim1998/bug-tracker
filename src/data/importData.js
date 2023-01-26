import React, { useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import {
  FiShoppingBag,
  FiEdit,
  FiPieChart,
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
} from "react-icons/fi";
import {
  BsKanban,
  BsBarChart,
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
} from "react-icons/bs";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GiLouvrePyramid } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";
import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";
import product1 from "./product1.jpg";
import product2 from "./product2.jpg";
import product3 from "./product3.jpg";
import product4 from "./product4.jpg";
import product5 from "./product5.jpg";
import product6 from "./product6.jpg";
import product7 from "./product7.jpg";
import product8 from "./product8.jpg";
import {
  AiFillGithub,
  AiFillEdit,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { MdPreview } from "react-icons/md";
import { Email } from "../components/Email";
export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Main",
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "projects",
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: "members",
        icon: <IoMdContacts />,
      },
      {
        name: "tickets",
        icon: <IoMdContacts />,
      },
    ],
  },
  {
    title: "Apps",
    links: [
      {
        name: "calendar",
        icon: <AiOutlineCalendar />,
      },
      {
        name: "pie",
        icon: <FiPieChart />,
      },
    ],
  },
  {
    title: "Admin",
    links: [
      {
        name: "manage members",
        icon: <FiPieChart />,
      },
      {
        name: "Account Management",
        icon: <FiPieChart />,
      },
    ],
  },
];

const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img className="rounded-full w-10 h-10" src={avatar} alt="tes" />
    <p>{props.name}</p>
  </div>
);

const gridEmployeeAction = () => (
  <div className="flex flex-row justify-between px-1">
    <button className="bg-lime-500 flex flex-row justify-center w-10">
      edit
    </button>
    <button className="bg-red-600 flex flex-row justify-center w-10">
      delete
    </button>
  </div>
);

const EmailJS = () => {
  return <Email />;
};

const gridEmail = (props) => (
  <a target="_blank" className="cursor-pointer">
    {props.email}
  </a>
);

const gridProjectAcction = (props) => (
  <div className="flex flex-row justify-between px-1">
    <a
      href={props.github}
      target="_blank"
      className="flex flex-row justify-center items-center w-10 hover:bg-slate-600"
    >
      <AiFillGithub size={30} />
    </a>
    <a
      href={props.preview}
      target="_blank"
      className="flex flex-row justify-center items-center w-10 hover:bg-slate-600"
    >
      <MdPreview size={30} />
    </a>
    <button className="flex flex-row justify-center items-center w-10 hover:bg-slate-600">
      <AiFillEdit size={30} />
    </button>
    <button className="flex flex-row justify-center items-center w-10 hover:bg-slate-600">
      <AiOutlineStar size={30} />
      {/* <AiFillStar size={30}/> */}
    </button>
  </div>
);

export const userColumns = [
  {
    field: "employee id",
    headerName: "ID",
    width: 15,
  },
  {
    headerText: "Employee",
    field: "name",
    width: 30,
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
  {
    field: "title",
    headerName: "Title",
    width: 30,
  },
  {
    field: "email",
    headerName: "Email",
    template: gridEmail,
    width: 50,
  },
  {
    field: "Reports to",
    headerName: "reports to",
    width: 50,
  },
  {
    field: "hiredate",
    headerName: "Hire Date",
    width: 30,
  },
  {
    field: "action",
    headerName: "Action",
    width: 30,
    template: gridEmployeeAction,
    textAlign: "Center",
  },
];

export const dataColumn = [
  {
    field: "title",
    headerName: "Title",
    width: 30,
  },
  {
    field: "member",
    headerName: "Member",
    width: 30,
  },
  {
    field: "status",
    headerName: "Status",
    width: 30,
  },
  {
    field: "action",
    headerName: "Action",
    width: 30,
    template: gridEmployeeAction,
    textAlign: "Center",
  },
];
export const projectColumn = [
  {
    field: "title",
    headerName: "Title",
    width: 30,
  },
  {
    field: "member",
    headerName: "Member",
    width: 30,
  },
  {
    field: "status",
    headerName: "Status",
    width: 30,
  },
  {
    field: "tag",
    headerName: "tag",
    width: 20,
  },
  {
    field: "action",
    headerName: "Action",
    width: 20,
    template: gridProjectAcction,
    textAlign: "Center",
  },
];

export const projectData = [
  {
    OrderID: 10248,
    CustomerName: "Vinet",

    TotalAmount: 32.38,
    OrderItems: "Fresh Tomato",
    Location: "USA",
    Status: "pending",
    StatusBg: "#FB9678",
    // ProductImage: product6,
  },
];

export const ticketGrid = [
  { headerText: "Open", keyField: "Open", allowToggle: true },

  { headerText: "In Progress", keyField: "inProgress", allowToggle: true },

  { headerText: "Closed", keyField: "Closed", allowToggle: true },
];

export const ticketData = [
  {
    Id: "Task 1",
    Title: "Task - 29001",
    Status: "Open",
    Summary: "Analyze the new requirements gathered from the customer.",
    Type: "Story",
    Priority: "Low",
    Tags: "Analyze,Customer",
    Estimate: 3.5,
    Assignee: "Nancy Davloio",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-low, e-nancy-davloio",
  },
  {
    Id: "Task 5",
    Title: "Task - 29005",
    Status: "closed",
    Summary: "Fix the issues reported by the customer.",
    Type: "Bug",
    Priority: "Low",
    Tags: "Customer",
    Estimate: "3.5",
    Assignee: "Steven walker",
    RankId: 1,
    Color: "#E64A19",
    ClassName: "e-bug, e-low, e-steven-walker",
  },
];

export const pieChartData = [
  { x: "High", y: 33, text: "33%", color: "red", name: "high" },
  { x: "Low", y: 33, text: "33%", color: "green" },
  { x: "Standard", y: 33, text: "33%", color: "yellow" },
];

export const pieChartData2 = [
  { x: "High", y: 33, text: "33%", color: "red" },
  { x: "Low", y: 33, text: "33%", color: "green" },
  { x: "Standard", y: 33, text: "33%", color: "yellow" },
];
export const pieChartData3 = [
  { x: "High", y: 33, text: "33%", color: "red" },
  { x: "Low", y: 33, text: "33%", color: "green" },
  { x: "Standard", y: 33, text: "33%", color: "yellow" },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    link: "/profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <BsShield />,
    title: "My Inbox",
    link: "/inbox",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
  {
    icon: <FiCreditCard />,
    title: "My Tasks",
    link: "/task",
    desc: "To-do and Daily Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];
