"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../graphql/actions/get.orders.action";
import Loader from "../layout/Loader";

const Orders = ({ isDashboard }: { isDashboard?: boolean }) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const { data, loading, refetch } = useQuery(GET_ORDERS, {
    variables: {
      getOrdersDto: {
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      },
    },
  });
  console.log(`Pagination Model: `, paginationModel);
  console.log("Data: ", data?.getOrders);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    // { field: "userId", headerName: "User Id", flex: isDashboard ? 0.8 : 0.5 },
    ...(isDashboard
      ? []
      : [{ field: "mealId", headerName: "Meal Id", flex: 1 }]),
    { field: "restaurantId", headerName: "Restaurant Id", flex: 0.8 },
    { field: "quantity", headerName: "quantity", flex: 0.8 },
    { field: "amount", headerName: "Amount", flex: 0.5 },
    { field: "totalAmount", headerName: "Total Amount", flex: 0.5 },
    // { field: "createdAt", headerName: "Created At", flex: 0.5 },
  ];
  // orders
  const rows: OrdersType[] = [];
  if (data) {
    const { orders } = data?.getOrders;
    orders.map((i: OrdersType) => {
      rows.push({
        id: i.id,
        userId: i.userId,
        mealId: i.mealId,
        restaurantId: i.restaurantId,
        quantity: i.quantity,
        amount: i.amount,
        totalAmount: i.totalAmount,
        // createdAt: format(new Date(i.createdAt), "MMM Do, YYYY"),
      });
    });
  }
  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel
  ) => {
    console.log("newPaginationModel: ", newPaginationModel);
    setPaginationModel(newPaginationModel);
    refetch({
      page: newPaginationModel.page + 1,
      pageSize: newPaginationModel.pageSize,
    });
  };
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
        ) : (
          <DataGrid
            checkboxSelection={!isDashboard}
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            pageSizeOptions={[5, 10, 15, 20, 25]}
            rowCount={data?.getOrders?.totalOrders || 0}
          />
        )}
      </Box>
    </Box>
  );
};

export default Orders;
