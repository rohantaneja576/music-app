import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import play from "../../Images/play.png";
import pause from "../../Images/pause.png";
import next from "../../Images/next.png";
import prev from "../../Images/prev.png";

const PlaySection = styled.div`
  width: 95%;
  height: 54px;
  bottom: 5%;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  border-radius: 50px;
  background: #e1e3e4;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0px 25px;
`;
const ControlSection = styled.div`
  button img {
    width: 70% !important;
    cursor: pointer;
  }
  button {
    width: 20%;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  width: 10%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
`;
const TimeSection = styled.div`
  width: 5%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Progressbar = styled.div`
  width: 65%;
  input[type="range"] {
    width: 100%;
    -webkit-appearance: none;
    background-color: #9a9a97;
    border-radius: 50px;
    outline: none;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    border-radius: 50px;
  }

  input[type="range"]::-webkit-slider-thumb {
    width: 20px;
    -webkit-appearance: none;
    height: 20px;
    cursor: pointer;
    background: #000;
    border-radius: 50%;
    margin-top: -5px;
  }
  input[type="range"]::-ms-fill-lower {
    background: #919e4b;
    border-radius: 2px;
  }

  input[type="range"]::-ms-fill-upper {
    background: #c5c5c5;
    border-radius: 2px;
  }
`;
const ThrottleFunction = (func) => {
  let time = new Date().getTime() / 1000;
  return () => {
    const currentTimestamp = +new Date() / 1000;
    if (currentTimestamp - time >= 0) {
      func();
      time = currentTimestamp;
    }
  };
};
export const PlayerState = {
  PLAYING: "PLAYING",
  PAUSED: "PAUSE",
};

const AudioControl = ({
  playerState,
  updatePlayerState,
  audiosrc,
  prevSong,
  nextSong,
}) => {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const getFormattedTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audioRef.current && audioRef.current.src) {
      const timeUpdate = () => {
        const currentTime = audioRef.current.currentTime;
        const position = (100 / duration) * Math.floor(currentTime);
        setSliderValue(position);
        setCurrentTime(Math.floor(currentTime));
      };
      const DebouncingFunction = ThrottleFunction(timeUpdate, 1000);
      audioRef.current.addEventListener("timeupdate", DebouncingFunction);
      return () => {
        audioRef.current.removeEventListener("timeupdate", DebouncingFunction);
      };
    }
  }, [audioRef, audioRef.current?.src]);

  useEffect(() => {
    if (audioRef.current) {
      const canPlay = () => {
        const duration = audioRef.current.duration;
        setDuration(Math.floor(duration));
      };
      audioRef.current.addEventListener("canplay", canPlay);

      return () => {
        audioRef.current.removeEventListener("canplay", canPlay);
      };
    }
  }, [audioRef, duration]);

  const getPosition = (SlideValue) => {
    const getCurrenTime = (SlideValue * duration) / 100;
    if (audioRef.current) audioRef.current.currentTime = getCurrenTime;
  };

  return (
    <React.Fragment>
      <PlaySection>
        <ControlSection>
          <button onClick={prevSong}>
            <img src={prev} />
          </button>
          <button
            onClick={() => {
              if (playerState === PlayerState.PLAYING) {
                updatePlayerState(PlayerState.PAUSED);
                audioRef.current.pause();
              } else {
                updatePlayerState(PlayerState.PLAYING);
                audioRef.current.play();
              }
            }}
          >
            {<img src={playerState === PlayerState.PAUSED ? play : pause} />}
          </button>
          <button onClick={nextSong}>
            <img src={next} />
          </button>
        </ControlSection>
        <TimeSection>
          <span>{getFormattedTime(currentTime)}</span>/
          <span>{getFormattedTime(duration)}</span>
        </TimeSection>
        <Progressbar>
          <input
            type="range"
            id="slider"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            onClick={(e) => getPosition(e.target.value)}
          />
        </Progressbar>
      </PlaySection>

      <audio
        ref={audioRef}
        src={audiosrc}
        autoPlay
        controls
        style={{ display: "none" }}
      />
    </React.Fragment>
  );
};

export default AudioControl;
