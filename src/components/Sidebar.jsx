import React from "react";
import { Stack } from "@mui/material";
import VideoInput from "./VideoInput";
import { categories } from "../utils/constants";

const Categories = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}
  >
    {categories.map((category) => (
      <button
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory && "#FC1503",
          color: "white",
        }}
        key={category.name}
      >
        <span style={{ color: category.name === selectedCategory ? "white" : "red", marginRight: "15px" }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}>
          {category.name}
        </span>
      </button>
    ))}
    <a href={"/upload"} style={{backgroundColor: "red", color: "white", padding: "10px", border: "1px solid white", position: "absolute", bottom: "2rem", width: "6rem", fontSize: "1rem"}}><b>Upload Video</b></a>

  </Stack>
);

export default Categories;
