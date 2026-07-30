import { title } from "node:process";

import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import CategoryTwoToneIcon from "@mui/icons-material/CategoryTwoTone";

const CLOUD = "https://res.cloudinary.com/drezpxdjw/image/upload";

let data_product = [
  {
    id: 1,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_1.png`,
    new_price: 50.0,
    old_price: 80.5,
  },
  {
    id: 2,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_2.png`,
    new_price: 85.0,
    old_price: 120.5,
  },
  {
    id: 3,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_3.png`,
    new_price: 60.0,
    old_price: 100.5,
  },
  {
    id: 4,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_4.png`,
    new_price: 100.0,
    old_price: 150.0,
  },
  {
    id: 5,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_5.png`,
    new_price: 100.0,
    old_price: 150.0,
  },
  {
    id: 6,
    name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse",
    image: `${CLOUD}/product_6.png`,
    new_price: 100.0,
    old_price: 150.0,
  },
];

export const sidebarMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <GridViewTwoToneIcon fontSize="medium" />,
  },

  {
    title: "Categories",
    href: "/dashboard",
    icon: <CategoryTwoToneIcon fontSize="medium" />,
  },
  {
    title: "Categories",
    href: "/dashboard",
    icon: <CategoryTwoToneIcon />,
  },
];

export default data_product;
