import React from "react";
import { Stack, Box } from "@mui/material";
import { Framework } from "@superfluid-finance/sdk-core";
import { ChannelCard, Loader, VideoCard } from "./";
import { ABI } from "./abi";
import { providers, ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";

const Videos = ({ videos, direction, selectedCategory }) => {
  const pAPI = process.env.REACT_APP_pAPI;
  const Pkey = `0x${pAPI}`;

  const unsubscribeNotifcation = async () => {
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
          body: `you unsubscribed the video succesfully`,
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

  const unsubscribe = async (uid) => {
    console.log("unsubscribe called", uid);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Using account: ", accounts[0]);
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(accounts[0]);
    const { chainId } = await provider.getNetwork();
    const sf = await Framework.create({
      chainId,
      provider,
    });

    const daix = await sf.loadSuperToken("MATICx");
    const subContract = new ethers.Contract(
      process.env.REACT_APP_ADDRESS,
      ABI,
      provider
    );
    await subContract
      .connect(signer)
      .deleteStream(
        daix.address,
        "0x3487262703E3529E0c466319B2A51cDce413B8f5",
        uid
      )
      .then((tx) => {
        console.log("added on chain tx:", tx);
      });
    await unsubscribeNotifcation();
    videos = JSON.parse(localStorage.getItem("videos"));
    videos.IDs.pop();
    localStorage.setItem("videos", JSON.stringify(videos));
  };
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="space-around"
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.hash && <VideoCard video={item} />}
          {selectedCategory === "Subscriptions" && (
            <button
              className="primary-btn"
              onClick={async () => {
                await unsubscribe(item.hash);
              }}
            >
              Cancel Subscription
            </button>
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
