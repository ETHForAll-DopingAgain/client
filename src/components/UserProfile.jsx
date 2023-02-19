import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import StartStream from "../pages/startStream";
import Upload from "../components/VideoInput";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import { AuthProvider } from '@arcana/auth';
import { Loader } from "./";

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

  useEffect(() => {
    setVideos(null);

    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
  }, [selectedCategory]);

     if(!pub_key) return <Loader />;

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
    </Stack>

  );
};

export default UserProfile;
