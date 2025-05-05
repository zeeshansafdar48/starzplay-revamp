// BitmovinPlayer.jsx
import { useEffect, useRef } from "react";
import { Player } from "bitmovin-player";

import "bitmovin-player/bitmovinplayer-ui.css"; // important to style the player!

const BitmovinPlayer = () => {
  const playerRef = useRef(null);
  const bitmovinPlayer = useRef(null);

  useEffect(() => {
    const playerConfig = {
      key: "9c89f7d3-2fe7-4986-aaaf-dacaf8f37b93", // 🔑 Replace this!
      playback: {
        autoplay: true
      }
    };

    const sourceConfig = {
      dash: "https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd",
      hls: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
      progressive: [
        {
          url: "https://bitmovin-a.akamaihd.net/content/sintel/video.mp4",
          type: "video/mp4"
        }
      ],
      poster: "https://bitmovin-a.akamaihd.net/content/sintel/poster.png"
    };

    if (playerRef.current) {
      bitmovinPlayer.current = new Player(playerRef.current, playerConfig);
      bitmovinPlayer.current
        .load(sourceConfig)
        .then(() => {
          console.log("Player loaded successfully");
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

  return (
    <div ref={playerRef} style={{ width: "100%", height: "500px", backgroundColor: "#000" }} />
  );
};

export default BitmovinPlayer;
