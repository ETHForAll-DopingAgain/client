import { React, useState } from "react";
import { ABI } from "./abi";
import { useLocation, useNavigate } from "react-router-dom";
import { providers, ethers } from "ethers";
import { Token } from "@mui/icons-material";
import { Framework } from "@superfluid-finance/sdk-core";
import * as PushAPI from "@pushprotocol/restapi";
const Livesubscribe = () => {
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [token, setToken] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const videoId = searchParams.get("videoId");

  const permit = async () => {
    console.log("permit called");
    const moneyRouterAddress = process.env.REACT_APP_ADDRESS;

    if (window?.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Using account: ", accounts[0]);
      const provider = new providers.Web3Provider(window.ethereum);
      console.log("provider:", provider);
      const { chainId } = await provider.getNetwork();
      console.log("chainId:", chainId);
      if (chainId !== 80001) {
        // switch to the goerli testnet
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x80001" }],
        });
      }
      console.log("chainId:", chainId);
      const signer = provider.getSigner(accounts[0]);
      const sf = await Framework.create({
        chainId,
        provider,
      });
      console.log(signer);

      const moneyRouter = new ethers.Contract(
        moneyRouterAddress,
        ABI,
        provider
      );

      const daix = await sf.loadSuperToken("MATICx");

      //approve contract to spend 1000 daix
      const aclApproval = daix.updateFlowOperatorPermissions({
        flowOperator: moneyRouter.address,
        flowRateAllowance: "3858024691358024", //10k tokens per month in flowRateAllowanace
        permissions: 7, //NOTE: this allows for full create, update, and delete permissions. Change this if you want more granular permissioning
      });
      await aclApproval.exec(signer).then(function (tx) {
        console.log(`
        Congrats! You've just successfully made the money router contract a flow operator. 
        Tx Hash: ${tx.hash}
    `);
      });
    } else {
      console.warn("Please use web3 enabled browser");
    }
  };

  const pAPI = process.env.REACT_APP_pAPI;
  const Pkey = `0x${pAPI}`;
  const SubscribeNotifcation = async () => {
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
          title: `Subscribed`,
          body: `you have successfully subscribed to live video succesfully`,
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

  const subscribe = async (uid) => {
    console.log("uid", uid);
    const moneyRouterAddress = process.env.REACT_APP_ADDRESS;
    //add the address of your intended receiver
    const receiver = "0x3487262703E3529E0c466319B2A51cDce413B8f5";

    if (window?.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Using account: ", accounts[0]);
      const provider = new providers.Web3Provider(window.ethereum);
      console.log("provider:", provider);
      const { chainId } = await provider.getNetwork();
      console.log("chainId:", chainId);
      if (chainId !== 80001) {
        // switch to the goerli testnet

        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x80001" }],
        });
      }

      const sf = await Framework.create({
        chainId,
        provider,
      });

      const signer = provider.getSigner(accounts[0]);

      // const superSigner = sf.createSigner({ signer: signer });
      const moneyRouter = new ethers.Contract(
        moneyRouterAddress,
        ABI,
        provider
      );

      const daix = await sf.loadSuperToken("MATICx");

      console.log("hy");

      console.log(
        await daix.balanceOf({
          account: accounts[0],
          providerOrSigner: signer,
        })
      );

      console.log("daix:", daix);

      //call money router create flow into contract method from signers[0]
      //this flow rate is ~1000 tokens/month
      await moneyRouter
        .connect(signer)
        .createStream("1666666666666", daix.address, receiver, uid)
        .then(function (tx) {
          console.log(`
        Congrats! You just successfully created a flow from the money router contract. 
        Tx Hash: ${tx.hash}
    `);
        });
      moneyRouter.on("livesubscribe", (id) => {
        console.log("id", id);
        navigate(`/video/${id}`, {
          replace: true,
        });
      });

      await SubscribeNotifcation();
    } else {
      console.warn("Please use web3 enabled browser");
    }
  };

  return (
    <div className="VideoInput">
      <div className="vidForm">
        <h1>
          Subscribe to <span className="red">Channel</span>
        </h1>
        <label>
          <br />
          <div style={{ display: "flex" }}>
            <div
              className={"div" + " " + active1}
              style={{ borderRadius: "50%", height: "7rem", margin: "1rem" }}
              onClick={async () => {
                setActive1(!active1);
                setToken(80001);
                console.log(token);
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  height: "5rem",
                  width: "5.2rem",
                  margin: "1rem",
                }}
                src="data:image/png;base64,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"
                alt="eth"
              />
            </div>
            <div
              className={"div" + " " + active2}
              onClick={() => {
                setActive2(!active2);
                setToken(5);
                console.log(token);
              }}
              style={{
                borderRadius: "50%",
                height: "7rem",
                margin: "1rem 1.2rem",
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  height: "5rem",
                  margin: "1rem 1.2rem",
                }}
                src="https://storage.googleapis.com/subgraph-images/1645121297131goerli-production.png"
                alt="eth"
              />
            </div>
          </div>
        </label>
        <br />
        <br />
        <button
          className="vidBtn"
          onClick={async () => {
            await subscribe(videoId);
            // await permit();
          }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Livesubscribe;
