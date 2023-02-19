import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ABI } from "./abi";
import { providers, ethers } from "ethers";
import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

import {
  createReactClient,
  LivepeerConfig,
  studioProvider,
} from "@livepeer/react";

import { Player } from "@livepeer/react";
const client = createReactClient({
  provider: studioProvider({
    apiKey: process.env.REACT_APP_livepeer,
  }),
});

const livepeerTheme = {
  colors: {
    accent: "rgb(0, 145, 255)",
    containerBorderColor: "rgba(0, 145, 255, 0.9)",
  },
  fonts: {
    display: "Inter",
  },
};

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  // const [videos, setVideos] = useState(null);
  const videos=JSON.parse(localStorage.getItem("videos")).IDs
  const { id } = useParams();
  console.log(client);

  // const videos=[{name: "hi", playbackId: "1203kgztg5lylb6y", hash: "QmTAznyH583xUgEyY5zdrPB2LSGY7FUBPDddWKj58GmBgp"}]

  // useEffect(async () => {

  //     console.log(videos);
  // },[]);

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            {/* <ReactPlayer url={`https://gateway.lighthouse.storage/ipfs/QmNb6cbYXgdTsSn6Gnn6fnaApEjubPtHDkyZ2fT2GowSWr`} className="react-player" controls /> */}
            <LivepeerConfig client={client} theme={livepeerTheme}>
              <div className="playerDiv">
              <Player playbackId={id} loop showTitle={false} />
              </div>
            </LivepeerConfig>
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {/* {title} */}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>

    </Box>
  );
};

export default VideoDetail;
