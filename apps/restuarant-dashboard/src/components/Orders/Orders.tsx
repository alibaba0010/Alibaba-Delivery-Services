"use client";
import React, { useCallback, useState } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../graphql/actions/get.orders.action";
import Loader from "../layout/Loader";

const Orders = ({ isDashboard }: { isDashboard?: boolean }) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
    variables: {
      getOrdersDto: {
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      },
    },
  });

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    ...(isDashboard
      ? []
      : [{ field: "mealId", headerName: "Meal Id", flex: 1 }]),
    { field: "restaurantId", headerName: "Restaurant Id", flex: 0.8 },
    { field: "quantity", headerName: "Quantity", flex: 0.8 },
    { field: "amount", headerName: "Amount", flex: 0.5 },
    { field: "totalAmount", headerName: "Total Amount", flex: 0.5 },
  ];

  const rows: OrdersType[] = data?.getOrders?.orders || [];

  const handlePaginationModelChange = useCallback(
    (newPaginationModel: GridPaginationModel) => {
      setPaginationModel(newPaginationModel);
      refetch();
    },
    []
  );

  //   refetch({
  //     getOrdersDto: {
  //       page: newPaginationModel.page + 1,
  //       pageSize: newPaginationModel.pageSize,
  //     },
  //   });
  // }, 300),
  return (
    <Box>
      <Box
        m={isDashboard ? "0" : "40px 0 0 0"}
        height={isDashboard ? "60vh" : "85vh"}
        overflow={"hidden"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: "#fff",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#fff",
          },
          "& .MuiDataGrid-row": {
            color: "#fff",
            borderBottom: "1px solid #ffffff30!important",
          },
          "& .MuiTablePagination-root": {
            color: "#fff",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none!important",
          },
          "& .name-column--cell": {
            color: "#fff",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3e4396",
            borderBottom: "none",
            color: "#fff",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            color: "#fff",
            borderTop: "none",
            backgroundColor: "#3e4396",
          },
          "& .MuiCheckbox-root": {
            color: `#b7ebde !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#fff !important`,
          },
        }}
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <Box textAlign="center" p={2}>
            <Typography color="error" aria-label="Error Message">
              Error loading orders. Please try again later.
            </Typography>
          </Box>
        ) : (
          <DataGrid
            checkboxSelection={!isDashboard}
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[5, 10, 15, 20]}
            rowCount={data?.getOrders?.totalOrders || 0}
            paginationMode="server"
            aria-label="Orders Data Table"
          />
        )}
      </Box>
    </Box>
  );
};

export default Orders;
