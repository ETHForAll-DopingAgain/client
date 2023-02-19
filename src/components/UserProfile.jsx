import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const UserProfile = () => {
  const [selectedCategory, setSelectedCategory] = useState("Live");
  const [videos, setVideos] = useState(null);

  let page;
  if(selectedCategory === "Live") {
  } else if(selectedCategory === "Start Stream") {
    page = <startStream />;
  } else if(selectedCategory === "Upload") {
    page = <Videos videos={videos} />;
  } else if(selectedCategory === "Music") {
    page = <Videos videos={videos} />;
  } else if(selectedCategory === "Education") {
    page = <Videos videos={videos} />;
  } else if(selectedCategory === "Movie") {
    page = <Videos videos={videos} />;
  } else if(selectedCategory === "Gaming") {
    page = <Videos videos={videos} />;
  } else {
  }

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
    }, [selectedCategory]);

  return (
    <>
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}></span>
        </Typography>

        {page}

      </Box>
    </Stack>
    </>
  );
};

export default UserProfile;