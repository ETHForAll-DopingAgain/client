import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lighthouse from "@lighthouse-web3/sdk";
import * as PushAPI from "@pushprotocol/restapi";
import { ABI } from "./abi";
import { providers, ethers } from "ethers";
import axios from "axios";

const VideoInput = () => {
  const [title, setTitle] = useState("");
  const [charge, setCharge] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  const pAPI = process.env.REACT_APP_pAPI;
  const Pkey = `0x${pAPI}`;
  const uploadNotifcation = async (title) => {
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
          title: `Uploaded`,
          body: `your video titled ${title} uploaded succesfully`,
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

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deploy = async (path, title, charge) => {
    // Push file to lighthouse node
    // Both file and folder supported by upload function
    console.log(path);
    console.log(process.env.REACT_APP_LHKEY);
    const output = await lighthouse.upload(
      path,
      process.env.REACT_APP_LHKEY,
      progressCallback
    );
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Using account: ", accounts[0]);
    const provider = new providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(accounts[0]);

    const addToChain = new ethers.Contract(
      process.env.REACT_APP_ADDRESS,
      ABI,
      provider
    );
    console.log("File Status:", output);
    console.log(output.data.Hash);

    const response = await axios.post(
      "https://livepeer.studio/api/asset/import",
      {
        url: "https://w3s.link/ipfs/" + output.data.Hash,
        name: title,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.REACT_APP_livepeer,
        },
      }
    );
    console.log(response);
    console.log(response.data.asset.playbackId);
    let videos = localStorage.getItem("videos");
    videos = JSON.parse(videos);
    console.log("videos before  parse", videos)
    console.log("videos", videos.IDs)
    videos.IDs.push({
      name: title,
      playbackId: response.data.asset.playbackId,
      hash: output.data.Hash,
      id: response.data.asset.id,
    });
    console.log("playbackid", response.data.asset.playbackId)
    console.log("videos", videos)
    localStorage.setItem("videos", JSON.stringify(videos));
    await addToChain
      .connect(signer)
      .addData(output.data.Hash, title, response.data.asset.playbackId, charge)
      .then((tx) => {
        console.log("added on chain tx:", tx);
      });

    await uploadNotifcation(title);
    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
  };

  return (
    <div className="VideoInput">
      <div className="vidForm">
        <h1>
          Upload <span className="red">Video</span>
        </h1>
        <label>
          <p>Title</p>
          <input
            className="vidText"
            type="text"
            name="name"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          <p>Charges</p>
          <input
            className="vidText"
            type="number"
            step="any"
            name="charge"
            onChange={(e) => {
              setCharge(e.target.value);
            }}
          />
        </label>
        <br />
        <br />
        <input
          className="file-upload"
          onChange={(e) => {
            setFile(e);
          }}
          type="file"
        />
        <br />
        <br />
        <button
          className="vidBtn"
          onClick={() => {
            deploy(file, title, charge);
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default VideoInput;
