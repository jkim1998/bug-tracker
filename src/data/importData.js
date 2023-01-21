export const userColumns = [
  { field: "id", headerName: "ID", width: 170 },
  {
    field: "name",
    headerName: "Name",
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
    field: "Country",
    headerName: "Country",
    width: 100,
  },
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
];
