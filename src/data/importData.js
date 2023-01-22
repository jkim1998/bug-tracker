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
    headerName: "title",
    width: 50,
  },
  {
    field: "member",
    headerName: "member",
    width: 50,
  },
  {
    field: "status",
    headerName: "status",
    width: 200,
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
