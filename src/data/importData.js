import React from "react";
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
        name: "kanban",
        icon: <BsKanban />,
      },
    ],
  },
  {
    title: "Charts",
    links: [
      {
        name: "line",
        icon: <AiOutlineStock />,
      },
      {
        name: "area",
        icon: <AiOutlineAreaChart />,
      },

      {
        name: "bar",
        icon: <AiOutlineBarChart />,
      },
      {
        name: "pie",
        icon: <FiPieChart />,
      },
      {
        name: "financial",
        icon: <RiStockLine />,
      },
      {
        name: "color-mapping",
        icon: <BsBarChart />,
      },
      {
        name: "stacked",
        icon: <AiOutlineBarChart />,
      },
    ],
  },
];
export const userColumns = [
  // { field: "id", headerName: "ID", width: 170 },
  {
    field: "title",
    headerName: "Title",
    width: 160,
    // renderCell: (params) => {
    //   return (
    //     <div className={`cellWithStatus ${params.row.status}`}>
    //       {params.row.status}
    //     </div>
    //   );
    // },
  },
  {
    field: "name",
    headerName: "name",
    width: 130,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.username}
    //     </div>
    //   );
    // },
  },
  {
    field: "email",
    headerName: "Email",
    width: 130,
  },

  {
    field: "password",
    headerName: "password",
    width: 100,
  },
];

export const dataColumn = [
  {
    field: "title",
    headerName: "Title",
  },
  {
    field: "member",
    headerName: "Member",
  },
  {
    field: "status",
    headerName: "Status",
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

export const kanbanGrid = [
  { headerText: "To Do", keyField: "Open", allowToggle: true },

  { headerText: "In Progress", keyField: "InProgress", allowToggle: true },

  {
    headerText: "Testing",
    keyField: "Testing",
    allowToggle: true,
    isExpanded: false,
  },

  { headerText: "Done", keyField: "Close", allowToggle: true },
];
