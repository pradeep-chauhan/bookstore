import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Icon, IconButton, Tooltip } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/system";

export default function DataTable(props) {
  const { bookData, setFormOpen, setData, setFormType, handleDelete } = props;

  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "isbn", headerName: "ISBN", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const onEdit = (e) => {
          const currentRow = params.row;
          setFormOpen(true);
          setData(currentRow);
          setFormType(true);
        };
        
        const onDelete = () => {
          const currentRowId = params.row.id;
          handleDelete(currentRowId);
        }
        return (
          <Box>
            <IconButton onClick={onEdit}>
              <ModeEditIcon />
            </IconButton>

            <IconButton onClick={onDelete}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={bookData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
}
