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
  const [videos, setVideos] = useState(null);
  const { id } = useParams();
  console.log(client);

  // useEffect(() => {
  //   fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
  //     .then((data) => setVideoDetail(data.items[0]))

  //   fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
  //     .then((data) => setVideos(data.items))
  // }, [id]);

  // const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            {/* <ReactPlayer url={`https://gateway.lighthouse.storage/ipfs/QmNb6cbYXgdTsSn6Gnn6fnaApEjubPtHDkyZ2fT2GowSWr`} className="react-player" controls /> */}
            <LivepeerConfig client={client} theme={livepeerTheme}>
              <Player playbackId={id} loop showTitle={false} />
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
              {/* <Link to={`/channel/${channelId}`}> */}
              {/* <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" > */}
              {/* {channelTitle} */}
              {/* <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} /> */}
              {/* </Typography> */}
              {/* </Link> */}
              {/* <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack> */}
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          {/* <Videos videos={videos} direction="column" /> */}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
