"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Icons } from "../../utils/Icon";
import { Box } from "@mui/material";
import { GET_MEALS } from "../../graphql/actions/get.meal.action";
import { useMutation, useQuery } from "@apollo/client";
import Loader from "../layout/Loader";
import { format } from "timeago.js";
import { DELETE_MEAL } from "../../graphql/actions/delete.meal";
import toast from "react-hot-toast";

const Meals = () => {
  const { data, loading, refetch } = useQuery(GET_MEALS);
  const [deleteFood] = useMutation(DELETE_MEAL);
  const meals = data?.getCurrentRestaurantMeals.meals;
  const handleDeleteMeal = async (id: string) => {
    try {
      const response = await deleteFood({
        variables: { delemealDto: { id } },
        refetchQueries: [{ query: GET_MEALS }],
      });
      console.log("response: ", response);
      toast.success(response.data.deleteMeal.message);
      refetch();
    } catch (error: any) {
      console.log("error: ", error);
      toast.error(error.message);
    }
  };
  const columns: GridColDef<MealsDataType>[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 0.5 },
    { field: "totalOrders", headerName: "Total Orders", flex: 0.5 },
    { field: "createdAt", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <div className="md:w-[50%] flex justify-center">
            <span
              className="text-3xl cursor-pointer"
              onClick={() => handleDeleteMeal(params.row.id)}
            >
              {Icons.delete}
            </span>
          </div>
        );
      },
    },
  ];
  const rows: MealsDataType[] = [];
  meals?.map((i: MealsDataType) => {
    rows.push({
      id: i.id,
      name: i.name,
      price: i.price + "$",
      totalOrders: 10,
      createdAt: format(i.createdAt),
    });
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Box
            m={"40px 0 0 0"}
            height={"85vh"}
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
            <DataGrid
              // checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Meals;
