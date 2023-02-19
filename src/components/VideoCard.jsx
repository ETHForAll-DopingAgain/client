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


const checkSubscription = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log("Using account: ", accounts[0]);
  const provider = new providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(accounts[0]);

  const chainInteract = new ethers.Contract(
    "0x0C1D73502330BF0633d44a257b8AB4e47a69E08D",
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
  video: {
    id: { videoId },
    snippet,
  },
}) => {
const navigate = useNavigate();
return(
  <Card
    sx={{
      width: { xs: "100%", sm: "358px", md: "320px" },
      boxShadow: "none",
      borderRadius: 5,
    }}
  >
    <ReactPlayer
      url={`https://gateway.lighthouse.storage/ipfs/QmNb6cbYXgdTsSn6Gnn6fnaApEjubPtHDkyZ2fT2GowSWr`}
      className="react-player-icon"
      onClick={async () => {
          if(await checkSubscription()){
                      navigate(
                        videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`,
                        {
                          replace: true,
                        }
                      );
          }
          else{
            console.log("ma chuda")
          }
      }}
    />
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: "90px" }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        onClick={async () => {
          await checkSubscription()
          console.log("hi")
          if(checkSubscription){
                      navigate(
                        videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`,
                        {
                          replace: true,
                        }
                      );
          }
          else{
            console.log("ma chuda")
          }
;}}
        color="#FFF"
      >
        {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
      </Typography>
      {/* <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl} > */}
      <Typography variant="subtitle2" color="gray">
        {/* {snippet?.channelTitle || demoChannelTitle} */}Visionary Vibes
        {/* <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} /> */}
      </Typography>
      {/* </Link> */}
    </CardContent>
  </Card>
)
  };

export default VideoCard;
