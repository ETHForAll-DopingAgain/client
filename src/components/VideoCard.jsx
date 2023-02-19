import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import ReactPlayer from "react-player";
import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import { ABI } from "./abi";
import { providers, ethers } from "ethers";
import { InsertEmoticon } from "@mui/icons-material";

const checkSubscription = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log("Using account: ", accounts[0]);
  const provider = new providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(accounts[0]);

  const chainInteract = new ethers.Contract(
    process.env.REACT_APP_ADDRESS,
    ABI,
    provider
  );
 
  const result = await chainInteract
    .connect(signer)
    .checkIsSubscribed("QmNb6cbYXgdTsSn6Gnn6fnaApEjubPtHDkyZ2fT2GowSWr")
    console.log(result)
    return result
};

const VideoCard = ({
  video,
}) => {
const navigate = useNavigate();


return(
  <Card
    sx={{
      width: { xs: "100%", sm: "350px", md: "328px" },
      boxShadow: "none",
      borderRadius: 5,
    }}
  >
    <ReactPlayer
      url={`https://gateway.lighthouse.storage/ipfs/${video.hash}`}
      className="react-player-icon"
      onClick={async () => {
          if(await checkSubscription()){
          }
          else{
            navigate(
              `/subscribe?videoId=${video.hash}`,
              { replace: true }
            );
          }
      }}
    />
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: "50px" }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        onClick={async () => {
            if(await checkSubscription()){
            }
            else{
              navigate(
                `/subscribe?videoId=${video.hash}`,
                { replace: true }
              );
            }

;}}
        color="#FFF"
      >
        {video.name}
      </Typography>
      {/* <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} > */}
      <Typography variant="subtitle2" color="gray">
        {/* {snippet?.channelTitle || demoChannelTitle} */}Visionary Vibes
        {/* <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} /> */}
      </Typography>
      {/* </Link> */}
      {/* { path == "user" &&<Typography variant="subtitle2" color="gray">Subscribers: 6969</Typography>} */}
    </CardContent>
  </Card>
)
  };

export default VideoCard;
