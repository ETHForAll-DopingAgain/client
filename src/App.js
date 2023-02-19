import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Auth } from "@arcana/auth-react";

import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Navbar,
  Feed,
  VideoInput,
  Stream,
  Subscribe,
} from "./components";

import Livesubscribe from "./components/Livesubscribe";
import Home from "./pages/Home";
import Arcana from "./pages/Auth";

import UserProfile from "./components/UserProfile";

const App = () => {
  const path = window.location.href.split("/")[3];

  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#000" }}>
        {path !== "" && path !== "auth" && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Arcana />} />
          <Route exact path="/feed" element={<Feed />} />
          <Route path="/upload" element={<VideoInput />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/livesubscribe" element={<Livesubscribe />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
