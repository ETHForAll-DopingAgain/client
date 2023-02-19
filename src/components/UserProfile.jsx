import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";

const UserProfile = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [videos, setVideos] = useState(null);

  let username = "abc";
  let email = "abc@gmail.com"
  let address = "0xgdfjgfdgkjgfk"
  let pub_key = "sdsdfsfd"

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
    page = <Videos videos={videos} />;
  }

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
    }, [selectedCategory]);

  return (
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      {/* <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}></span>
        </Typography>

        {page}

      </Box> */}


      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>
      <Stack sx={{marginLeft: "100px", marginTop: "140px"}}>
        <Stack sx={{flexDirection: { sx: "column", md: "row"}, alignItems: "center", marginBottom: "60px"}}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" sx={{ width: 80, height: 80, bgcolor:"green", marginRight:"10px" }} />
          <Stack spacing={1} sx={{marginLeft: "8px"}}>
          <Typography variant="h5" color="white">Name: {username} </Typography>
          <Typography variant="h6" color="gray">E-mail: {email}</Typography>
          <Stack sx={{flexDirection: 'row'}} gap={2}>
          <Typography variant="subtitle1" color="gray">Address: {address}</Typography>
          <Typography variant="subtitle1" color="gray">||</Typography>
          <Typography variant="subtitle1" color="gray">Public Key: {pub_key} </Typography>
          </Stack>
          </Stack>
        </Stack>
        <Typography variant="h3" color="white">{username}'s Videos</Typography>
        {page}
      </Stack>
    </Stack>

  );
};

export default UserProfile;