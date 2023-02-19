import React from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import ReactPlayer from "react-player";
import { Link, useNavigate } from "react-router-dom";
import { ABI } from "../components/abi";
import { providers, ethers } from "ethers";

const Live = () => {
    const navigate = useNavigate();
    const checkSubscription = async (pb) => {
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
        .checkLiveSubscription(pb);
      console.log(result);
      return result;
    };
    console.log(localStorage.getItem("live"));
var x = JSON.parse(localStorage.getItem("live")).IDs[0];
console.log(x);
    return (
      <div>
        <div className="liveDiv" >
          <ReactPlayer
            url={`https://gateway.lighthouse.storage/ipfs/${x.hash}`}
            onClick={async () => {
                if(await checkSubscription(x.playbackId)){
                    
                }
                 else{
            navigate(
              `/livesubscribe?videoId=${x.playbackId}`,
              { replace: true }
            );
          }
            }}
            className="react-player-icon"
          />
        </div>
        <br />
        <Typography variant="h5" color="white">
          Watch this boy go mad before your eyes!!
        </Typography>
        <Typography variant="h6" color="gray">
          Never seen before.
        </Typography>
      </div>
    );}

export default Live;
