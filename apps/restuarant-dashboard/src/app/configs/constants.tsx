import { atom } from "jotai";
import { Icons } from "../../utils/Icon";

export const activeItem = atom<string>("/");

export const sideBarItems: SideBarItemsTypes[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Icons.home,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: Icons.invoice,
  },
  {
    title: "Add Meal",
    url: "/add-meal",
    icon: Icons.create,
  },
  {
    title: "Meals",
    url: "/meals",
    icon: Icons.food,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: Icons.analytics,
  },
];

export const foodCategoryItems: FoodCategoryType[] = [
  {
    title: "Pizza",
  },
  {
    title: "Snacks",
  },
  {
    title: "Set Menu",
  },
  {
    title: "Dessert",
  },
  {
    title: "Beverage",
  },
  {
    title: "Rice",
  },
  {
    title: "Burger",
  },
  {
    title: "Chowmein",
  },
  {
    title: "Wings",
  },
  {
    title: "Appetizer",
  },
  {
    title: "Nachos",
  },
  {
    title: "Pasta",
  },
  {
    title: "Soup & Salad",
  },
];
