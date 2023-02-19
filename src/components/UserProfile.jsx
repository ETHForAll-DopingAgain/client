import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import StartStream from "../pages/startStream";
import Upload from "../components/VideoInput";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import { AuthProvider } from '@arcana/auth';
import { Loader } from "./";
import {  Card, CardContent, CardMedia } from "@mui/material";
import ReactPlayer from "react-player";

const UserProfile = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [videos, setVideos] = useState(null);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [pub_key, setPub_key] = useState(null);
  const path = window.location.href.split("/")[3];
  console.log("userprofile path =>", path)


  useEffect(() => {
    async function getUser() {
      const auth = new AuthProvider(`8afe688dafd1119144bb600dae348c712add9daf`);
      await auth.init();
      const user = await auth.getUser();
      console.log(user);
      setUsername(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setPub_key(user.publicKey);
    }
    getUser()
  }, [])
  let page;
  if (selectedCategory === "Live") {
  } else if (selectedCategory === "Start Stream") {
    page = <StartStream />;
  } else if (selectedCategory === "Upload") {
    page = <Upload />;
  } else if (selectedCategory === "Music") {
    page = <Videos videos={videos} />;
  } else if (selectedCategory === "Education") {
    page = <Videos videos={videos} />;
  } else if (selectedCategory === "Movie") {
    page = <Videos videos={videos} />;
  } else if (selectedCategory === "Gaming") {
    page = <Videos videos={videos} />;
  } else {
    page = <Videos videos={videos} />;
  }

     if(!pub_key) return <Loader />;
      var x= JSON.parse(localStorage.getItem("videos")).IDs[1]
      console.log(x.name);
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>
      <Stack sx={{ marginLeft: "100px", marginTop: "140px" }}>
        <Stack sx={{ flexDirection: { sx: "column", md: "row" }, alignItems: "center", marginBottom: "60px" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" sx={{ width: 80, height: 80, bgcolor: "green", marginRight: "10px" }} />
          <Stack spacing={1} sx={{ marginLeft: "8px" }}>
            <Typography variant="h5" color="white">Name: {username} </Typography>
            <Typography variant="h6" color="gray">E-mail: {email}</Typography>
            <Stack sx={{ flexDirection: 'column' }} gap={2}>
              <Typography variant="subtitle1" color="gray">Address: {address}</Typography>
              {/* <Typography variant="subtitle1" color="gray">||</Typography> */}
              <Typography variant="subtitle1" color="gray">Public Key: {pub_key} </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Typography variant="h3" color="white">{username}'s Videos</Typography>
        {/* {page} */}
      </Stack>

<div className="userVid">
      <Card
    sx={{
      width: { xs: "100%", sm: "357px", md: "318px" },
      boxShadow: "none",
      borderRadius: 5,
    }}
  >
    <ReactPlayer
      url={`https://gateway.lighthouse.storage/ipfs/${x.hash}`}
      className="react-player-icon"
    />
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: "50px" }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        color="#FFF"
      >
        {x.name}
      </Typography>
      <Typography variant="subtitle2" color="gray"></Typography>
      </CardContent>
  </Card>
  <button
              className="primary-btn"
              onClick={async () => {
                await unsubscribe(item.hash);
              }}
            >
              Delete Video
            </button>
  </div>

    </Stack>

  );
};

export default UserProfile;
