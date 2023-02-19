import { Stack, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import { SearchBar } from "./";
import { useEffect } from "react";
import { useAuth } from "@arcana/auth-react";

const Navbar = () => {
  const path = window.location.href.split("/")[3];
  console.log(path)
  const IDs = localStorage.getItem("videos");
  const h8uehue = localStorage.getItem("live");
  console.log(IDs);
  const auth = useAuth();
  const isloggedIn = auth.isLoggedIn;
  console.log(isloggedIn)
  console.log(auth.loading)

  if (!IDs) {
    localStorage.setItem("videos", JSON.stringify({ IDs: [] }));
  }
  if(!h8uehue){
    localStorage.setItem("live", JSON.stringify({ IDs: [] }));
  }

  return (
    <>
      <Stack direction="row" alignItems="center" p={2} sx={{ position: "sticky", background: '#000', top: 0, justifyContent: "space-between" }}>
        <Link to="/feed" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" height={55} />
        </Link>
        {path !== "user" &&
          <SearchBar />}
        {path !== "user" && <Link to="/user">
          <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" sx={{ width: 48, height: 48, bgcolor: "green", marginRight: "10px" }} />
        </Link>}
      </Stack>
    </>
  );
};

export default Navbar;
