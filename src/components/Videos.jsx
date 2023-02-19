import React from "react";
import { Stack, Box} from "@mui/material";
import "./../index.css";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction, selectedCategory }) => {
  //if(!videos?.length) return <Loader />;
  //let slice=videos.slice(0,2)
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.hash && <VideoCard video={item} /> }
          {/* {selectedCategory == 'My Subscriptions' && <button className="sub-btn">Cancel Subscription</button>} */}
          <button className="sub-btn">Cancel Subscription</button>
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;
