import {
    createReactClient,
    LivepeerConfig,
    studioProvider
  } from "@livepeer/react";
  
  import { Player } from "@livepeer/react";
  
  const client = createReactClient({
    provider: studioProvider({ apiKey: "4df4811f-d6db-4510-b786-73c2a932f85f" }),
  });
  
  const livepeerTheme = {
    colors: {
      accent: "rgb(0, 145, 255)",
      containerBorderColor: "rgba(0, 145, 255, 0.9)",
    },
    fonts: {
      display: "Inter",
    },
  };
  
  const playbackId = "666899k9r9t36tnh";
    
  
  export function Livepeer() {
    return (
      <Player
        title="Waterfalls"
        playbackId={playbackId}
        loop
        autoPlay
        showTitle={false}
        muted
      />
    );
  }
  
  const VideoPlayer = () => {
    return (
      <>
        <LivepeerConfig client={client} theme={livepeerTheme}>
          <Livepeer />
        </LivepeerConfig>
      </>
    );
  };
  
  export default VideoPlayer;