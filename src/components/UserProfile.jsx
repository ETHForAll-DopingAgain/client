import React, { useEffect, useState } from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import StartStream from "../pages/startStream";
import Upload from "../components/VideoInput";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import { AuthProvider } from "@arcana/auth";
import { Loader } from "./";
import { ABI } from "./abi";
import { Card, CardContent, CardMedia } from "@mui/material";
import ReactPlayer from "react-player";
import { providers, ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import axios from "axios";

const UserProfile = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [videos, setVideos] = useState(null);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [pub_key, setPub_key] = useState(null);
  const path = window.location.href.split("/")[3];
  console.log("userprofile path =>", path);
  const pAPI = process.env.REACT_APP_pAPI;
  const Pkey = `0x${pAPI}`;
  const deleteNotifcation = async () => {
    console.log("push called");
    const signer = new ethers.Wallet(Pkey);
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // subset
        identityType: 2, // direct payload
        notification: {
          title: `[SDK-TEST] notification TITLE:`,
          body: `[sdk-test] notification BODY`,
        },
        payload: {
          title: `Unsubscribed`,
          body: `you deleted the video succesfully`,
          cta: "",
          img: "",
        },
        recipients: "eip155:5:0xD4819586cBB21B3A819100040163C56210021899", // recipients addresses
        channel: "eip155:5:0x3487262703E3529E0c466319B2A51cDce413B8f5", // your channel address
        env: "staging",
      });
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const deleteVideo = async (uid) => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Using account: ", accounts[0]);
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(accounts[0]);
    const subContract = new ethers.Contract(
      process.env.REACT_APP_ADDRESS,
      ABI,
      provider
    );
    await subContract
      .connect(signer)
      .deleteData(uid)
      .then((tx) => {
        console.log("added on chain tx:", tx);
      });
    axios.delete('https://livepeer.studio/api/asset/'+x.id,
    {
      headers: {
        "Authorization": "Bearer ee2c5c83-3c17-4f0d-84e7-373e9b401eab"
      }
    })
    //remove from local storage here
    await deleteNotifcation();
  };

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
    getUser();
  }, []);
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

  if (!pub_key) return <Loader />;
  var len = JSON.parse(localStorage.getItem("videos")).IDs.length;
  var x = JSON.parse(localStorage.getItem("videos")).IDs[len - 1];
  console.log(x.name);
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
      <Stack sx={{ marginLeft: "100px", marginTop: "140px" }}>
        <Stack
          sx={{
            flexDirection: { sx: "column", md: "row" },
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar.jpg"
            sx={{
              width: 80,
              height: 80,
              bgcolor: "green",
              marginRight: "10px",
            }}
          />
          <Stack spacing={1} sx={{ marginLeft: "8px" }}>
            <Typography variant="h5" color="white">
              Name: {username}{" "}
            </Typography>
            <Typography variant="h6" color="gray">
              E-mail: {email}
            </Typography>
            <Stack sx={{ flexDirection: "column" }} gap={2}>
              <Typography variant="subtitle1" color="gray">
                Address: {address}
              </Typography>
              {/* <Typography variant="subtitle1" color="gray">||</Typography> */}
              <Typography variant="subtitle1" color="gray">
                Public Key: {pub_key}{" "}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Typography variant="h3" color="white">
          {username}'s Videos
        </Typography>
        {/* {page} */}
      </Stack>

      <div className="userVid">
        <Card
          sx={{
            width: { xs: "100%", sm: "350px", md: "328px" },
            boxShadow: "none",
            borderRadius: 5,
          }}
        >
          <ReactPlayer
            url={`https://gateway.lighthouse.storage/ipfs/${x.hash}`}
            className="react-player-icon"
          />
          <CardContent sx={{ backgroundColor: "#1E1E1E", height: "50px" }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
              {x.name}
            </Typography>
            <Typography variant="subtitle2" color="gray"></Typography>
          </CardContent>
        </Card>
        <button className="primary-btn" onClick={async () => { await deleteVideo(x.hash, x.id); }}>
          Delete Video
        </button>
      </div>
    </Stack>
  );
};

export default UserProfile;
