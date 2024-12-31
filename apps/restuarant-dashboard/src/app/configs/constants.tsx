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
    icon: Icons.meal,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: Icons.analytics,
  },
];

export const mealCategoryItems: MealCategoryType[] = [
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

export const analyticsData = [
  {
    name: "Page A",
    Count: 4000,
  },
  {
    name: "Page B",
    Count: 3000,
  },
  {
    name: "Page C",
    Count: 5000,
  },
  {
    name: "Page D",
    Count: 1000,
  },
  {
    name: "Page E",
    Count: 4000,
  },
  {
    name: "Page F",
    Count: 800,
  },
  {
    name: "Page G",
    Count: 200,
  },
];
