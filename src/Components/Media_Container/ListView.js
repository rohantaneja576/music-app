import React, { useState, useRef, useEffect } from "react";
import playBtn from "../../Images/playBtn.png";
import styled from "styled-components";
import play from "../../Images/play.png";
import pause from "../../Images/pause.png";
import next from "../../Images/next.png";
import prev from "../../Images/prev.png";

const StyledWrapper = styled.div`
  margin: 0 auto;
  padding: 15px 20px;
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
`;
const WrapperItems = styled.div`
  border: 1px solid;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
  overflow: hidden;
  width: 200px;
`;
const ImgBlock = styled.div`
  background: red;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const ContentBlock = styled.div`
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlayBtn = styled.div`
  position: absolute;
  width: 35%;
`;
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

const ListView = ({ data }) => {
  const PlayerState = {
    PLAYING: "PLAYING",
    PAUSED: "PAUSE",
  };

  const [activeTab, setActiveTab] = useState(null);
  const [playerState, setPlayerState] = useState(PlayerState.PLAYING);
  const audioRef = useRef(null);
  const valueRef = useRef(null);
  const [duration, setDuration] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setseconds] = useState(0);
  const [minutesDuration, setMinutesDuration] = useState(0);
  const [secondsDuration, setSecondsDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);

  console.log(valueRef.current);
  useEffect(() => {
    if (audioRef.current) {
      const canPlay = () => {
        const duration = audioRef.current.duration;
        setDuration(Math.floor(duration));
        const minutes = Math.floor(duration / 60);
        setMinutes(minutes);
        const seconds = Math.floor(duration - minutes * 60);
        setseconds(seconds);
      };
      audioRef.current.addEventListener("canplay", canPlay);
      audioRef.current.addEventListener("timeupdate", (event) => {
        const currentTime = audioRef.current.currentTime;
        const position = (100 / duration) * Math.floor(currentTime);
        setSliderValue(position);
        setCurrentTime(Math.floor(currentTime));
        const minutesDuration = Math.floor(currentTime / 60);
        setMinutesDuration(minutesDuration);
        const secondsDuration = Math.floor(currentTime - minutesDuration * 60);
        setSecondsDuration(secondsDuration);
      });
      return () => {
        audioRef.current.removeEventListener("canplay", canPlay);
      };
    }
    if (valueRef.current) {
      const position = valueRef.current.getBoundingClientRect();
      console.log(position);
    }
  }, [audioRef, minutes, seconds, duration]);

  const handleProgressBar = (index) => {
    setActiveTab(index);
    if (playerState === "PLAYING") {
      setPlayerState(PlayerState.PAUSED);
    } else {
      setPlayerState(PlayerState.PLAYING);
    }
  };

  return (
    <React.Fragment>
      <StyledWrapper>
        {data.map((item, index) => {
          return (
            <React.Fragment>
              <WrapperItems onClick={() => handleProgressBar(index)}>
                <ImgBlock>
                  <PlayBtn>
                    <img src={playBtn} />
                  </PlayBtn>
                  <img src={item.imgURL} />
                </ImgBlock>
                <ContentBlock>
                  <b>Title : </b>
                  <div>{item.title}</div>
                </ContentBlock>
              </WrapperItems>
            </React.Fragment>
          );
        })}
      </StyledWrapper>
      <PlaySection>
        <ControlSection>
          <button
            onClick={() => {
              return !data[activeTab].id ? null : setActiveTab(activeTab - 1);
            }}
          >
            <img src={prev} />
          </button>

          <button
            onClick={() => {
              playerState === "PLAYING"
                ? setPlayerState(PlayerState.PAUSED)
                  ? audioRef.current.pause()
                  : audioRef.current.play()
                : setPlayerState(PlayerState.PLAYING)
                ? audioRef.current.play()
                : audioRef.current.pause();
            }}
          >
            {playerState === "PLAYING" ? (
              <img src={play} />
            ) : (
              <img src={pause} />
            )}
          </button>

          <button
            onClick={() => {
              return !data[activeTab].id ? null : setActiveTab(activeTab + 1);
            }}
          >
            <img src={next} />
          </button>
        </ControlSection>
        <TimeSection>
          <span>
            {`${minutesDuration}`.padStart(2, "0")}:
            {`${secondsDuration}`.padStart(2, "0")}
          </span>
          /
          <span>
            {`${minutes}`.padStart(2, "0")}:{`${seconds}`.padStart(2, "0")}
          </span>
        </TimeSection>
        <Progressbar>
          <input
            type="range"
            id="slider"
            min="0"
            max="100"
            value={sliderValue}
            ref={valueRef}
            onChange={(e) => setSliderValue(e.target.value)}
          />
        </Progressbar>
      </PlaySection>
      <audio
        ref={audioRef}
        src={data[activeTab]?.audio}
        autoPlay
        controls
        style={{ display: "none" }}
      />
    </React.Fragment>
  );
};

export default ListView;
