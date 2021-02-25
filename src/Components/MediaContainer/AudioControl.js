import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import play from "../../Images/play.png";
import pause from "../../Images/pause.png";
import next from "../../Images/next.png";
import prev from "../../Images/prev.png";
import {
  totalTime,
  activeTime,
  playerState,
  sliderValue,
} from "../../Store/actions/audioActions";
import { PlayerState } from "../../Store/reducers/audioControllerReducer";

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
    if (currentTimestamp - time >= 1) {
      func();
      time = currentTimestamp;
    }
  };
};

const AudioControl = ({ audiosrc, prevSong, nextSong }) => {
  const audioRef = useRef(null);
  const duration = useSelector(
    (state) => state.audioControllerReducer.duration
  );
  const current = useSelector((state) => state.audioControllerReducer.current);
  const playingMode = useSelector(
    (state) => state.audioControllerReducer.playingMode
  );
  const slider_value = useSelector(
    (state) => state.audioControllerReducer.sliderValue
  );
  const dispatch = useDispatch();

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
        dispatch(sliderValue(Math.floor(position)));
        dispatch(activeTime(Math.floor(currentTime)));
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
        dispatch(totalTime(Math.floor(duration)));
      };
      audioRef.current.addEventListener("canplay", canPlay);

      return () => {
        audioRef.current.removeEventListener("canplay", canPlay);
      };
    }
  }, [audioRef, duration]);
  var getCurrentTime;
  const getPosition = (SlideValue) => {
    getCurrentTime = (SlideValue * duration) / 100;
    if (audioRef.current)
      audioRef.current.currentTime = Math.floor(getCurrentTime);
  };

  if (playingMode === "PAUSED") {
    audioRef.current.pause();
  }
  if (audioRef.current) {
    if (current === duration) {
      dispatch(playerState(PlayerState.PAUSED));
    }
  }

  return (
    <React.Fragment>
      <PlaySection>
        <ControlSection>
          <button onClick={prevSong}>
            <img src={prev} />
          </button>
          <button
            onClick={() => {
              if (playingMode === "PLAYING") {
                dispatch(playerState(PlayerState.PAUSED));
                audioRef.current.pause();
              } else {
                dispatch(playerState(PlayerState.PLAYING));
                audioRef.current.play();
              }
            }}
          >
            {<img src={playingMode === PlayerState.PAUSED ? play : pause} />}
          </button>
          <button onClick={nextSong}>
            <img src={next} />
          </button>
        </ControlSection>
        <TimeSection>
          <span>{getFormattedTime(current)}</span>/
          <span>{getFormattedTime(duration)}</span>
        </TimeSection>
        <Progressbar>
          <input
            type="range"
            id="slider"
            min="0"
            max="100"
            value={slider_value}
            onChange={(e) => dispatch(sliderValue(e.target.value))}
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
