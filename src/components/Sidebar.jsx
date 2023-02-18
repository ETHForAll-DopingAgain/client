import React from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

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
    <a href={"/stream"} style={{display: "flex", justifyContent:"center", alignItems:"center", backgroundColor: "red", color: "white", padding: "10px", border: "1px solid white", position: "absolute", bottom: "2rem", width: "6rem", fontSize: "1rem", }}><GraphicEqIcon /><b> START STREAM</b></a>
    <a href={"/upload"} style={{display: "flex", justifyContent:"center", alignItems:"center", backgroundColor: "red", color: "white", padding: "10px", border: "1px solid white", position: "absolute", bottom: "2rem", width: "6rem", fontSize: "1rem", }}><GraphicEqIcon /><b> UPLOAD</b></a>

  </Stack>
);

export default Categories;
