import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction }) => {
  // if(!videos?.length) return <Loader />;
  // let slice=videos.slice(0,2)
  return (
    <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.hash && <VideoCard video={item} /> }
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;
