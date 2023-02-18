import React from 'react'
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import ReactPlayer from "react-player";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 5 }}>
    <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY` }>
    <ReactPlayer url={`https://gateway.lighthouse.storage/ipfs/QmNb6cbYXgdTsSn6Gnn6fnaApEjubPtHDkyZ2fT2GowSWr`} className="react-player-icon"/>
    </Link>
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: '90px' }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl } >
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      {/* <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} > */}
        <Typography variant="subtitle2" color="gray">
          {/* {snippet?.channelTitle || demoChannelTitle} */}Visionary Vibes
          {/* <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} /> */}
        </Typography>
      {/* </Link> */}
    </CardContent>
  </Card>
);

export default VideoCard
