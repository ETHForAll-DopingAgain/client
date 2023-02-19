import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import StartStream from "../pages/startStream";
import Live from "../pages/live";
import Upload from "../components/VideoInput";
import ReactPlayer from "react-player";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [videos, setVideos] = useState(null);
  let page;
  if (selectedCategory === "Live") {
    page=<Live />
  } else if (selectedCategory === "Start Stream") {
    page = <StartStream />;
  } else if (selectedCategory === "Upload") {
    page = <Upload />;
  } else if (selectedCategory === "Music") {
    page = <Videos videos={videos} selectedCategory={selectedCategory} />;
  } else if (selectedCategory === "Education") {
    page = <Videos videos={videos} selectedCategory={selectedCategory} />;
  } else if (selectedCategory === "Movie") {
    page = <Videos videos={videos} selectedCategory={selectedCategory} />;
  } else if (selectedCategory === "Gaming") {
    page = <Videos videos={videos} selectedCategory={selectedCategory} />;
  } else if (selectedCategory === "Subscriptions") {
    page = <Videos videos={videos} selectedCategory={selectedCategory} />;
  }
  console.log("feed path =>", selectedCategory);
  useEffect(() => {
    setVideos(
      JSON.parse(localStorage.getItem("videos")).IDs
      );
  },[]);
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC1503" }}></span>
        </Typography>
        {/* <StartStream /> */}
        {page}
      </Box>
    </Stack>
  );
};
export default Feed;
