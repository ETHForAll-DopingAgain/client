import { Stack, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import { SearchBar } from "./";

const Navbar = () => {
  const path = window.location.href.split("/")[3];
  return (
    <Stack direction="row" alignItems="center" p={2} sx={{ position: "sticky", background: '#000', top: 0, justifyContent: "space-between" }}>
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={55} />
      </Link>
      {path !== "user" &&
        <SearchBar />}
      {/* <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" sx={{ width: 40, height: 40, bgcolor:"green" }} /> */}
      <Link to="/user">
      <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" sx={{ width: 40, height: 40, bgcolor:"green" }} />
      </Link>
    </Stack>
  );
};

export default Navbar;
