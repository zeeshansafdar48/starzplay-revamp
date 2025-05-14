import { useEffect, useRef } from "react";
import { Player } from "bitmovin-player";
import "bitmovin-player/bitmovinplayer-ui.css";

const BitmovinPlayer = () => {
  const playerRef = useRef(null);
  const bitmovinPlayer = useRef(null);

  const playerConfig = {
    key: "9c89f7d3-2fe7-4986-aaaf-dacaf8f37b93",
    playback: {
      autoplay: true,
      muted: true
    }
  };

  const sources = {
    dash: {
      dash: "https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd",
      poster: "https://bitmovin-a.akamaihd.net/content/sintel/poster.png"
    },
    hls: {
      hls: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      poster: "https://bitmovin-a.akamaihd.net/content/sintel/poster.png"
    },
    mp4: {
      progressive: [
        {
          url: "https://bitmovin-a.akamaihd.net/content/sintel/video.mp4",
          type: "video/mp4"
        }
      ],
      poster: "https://bitmovin-a.akamaihd.net/content/sintel/poster.png"
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      bitmovinPlayer.current = new Player(playerRef.current, playerConfig);
      bitmovinPlayer.current
        .load(sources.dash)
        .then(() => {
          console.log("Initial source loaded (DASH)");
        })
        .catch((error) => {
          console.error("Error loading player:", error);
        });
    }

    return () => {
      if (bitmovinPlayer.current) {
        bitmovinPlayer.current.destroy();
      }
    };
  }, []);

  const switchSource = (type) => {
    if (bitmovinPlayer.current) {
      bitmovinPlayer.current
        .load(sources[type])
        .then(() => {
          console.log(`Switched to ${type} source`);
        })
        .catch((error) => {
          console.error(`Error switching to ${type}:`, error);
        });
    }
  };

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => switchSource("dash")}>Play DASH</button>
        <button onClick={() => switchSource("hls")}>Play HLS</button>
        <button onClick={() => switchSource("mp4")}>Play MP4</button>
      </div>
      <div ref={playerRef} style={{ width: "100%", height: "90vh" }} />
    </>
  );
};

export default BitmovinPlayer;
