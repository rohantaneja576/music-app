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
`;
const PlayBtn = styled.div`
  position: absolute;
  width: 35%;
`;
const PlaySection = styled.div`
  /* audio {
    outline: none;
    width: 95%;
    bottom: 5%;
    position: absolute;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
  } */

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
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 0px 25px;
`;
const ControlSection = styled.div`
  img {
    width: 15% !important;
    cursor: pointer;
  }
  /* border: 1px solid; */
  width: 10%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
`;
const TimeSection = styled.div`
  /* border: 1px solid; */
  width: 5%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Progressbar = styled.div`
  width: 65%;
  height: 7%;
  border-radius: 50px;
  background: #908e8e;
  padding: 1px 0px;
  margin-left: 1%;
`;

const Progress = styled.div`
  width: 15px;
  height: 15px;
  background: #000;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const ListView = ({ data }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [ButtonPlay, setButtonPlay] = useState(play);
  const audioRef = useRef(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setseconds] = useState("00");

  //console.log(audioRef);

  useEffect(() => {
    if (audioRef.current) {
      const canPlay = () => {
        const duration = audioRef.current.duration;
        const minutes = Math.floor(duration / 60);
        setMinutes(minutes);
        const seconds = Math.floor(duration - minutes * 60);
        setseconds(seconds);
        console.log(minutes, seconds);
      };
      audioRef.current.addEventListener("canplay", canPlay);
      return () => {
        audioRef.current.removeEventListener("canplay", canPlay);
      };
    }
  }, [audioRef, minutes, seconds]);

  const handleTab = (index) => {
    setActiveTab(index);
  };

  const handlePlayButton = (activeTab) => {
    console.log(activeTab);
    if (playing) {
      setPlaying(false);
      setButtonPlay(play);
    } else {
      setPlaying(true);
      setButtonPlay(pause);
    }
  };
  return (
    <React.Fragment>
      <StyledWrapper>
        {data.map((item, index) => {
          return (
            <React.Fragment>
              <WrapperItems onClick={() => handleTab(index)}>
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
          <img
            src={prev}
            onClick={() => {
              console.log(activeTab);
              return !data[activeTab].id ? null : setActiveTab(activeTab - 1);
            }}
          />
          <img src={ButtonPlay} onClick={() => handlePlayButton(activeTab)} />
          <img
            src={next}
            onClick={() => {
              console.log(activeTab);
              return !data[activeTab].id ? null : setActiveTab(activeTab + 1);
            }}
          />
        </ControlSection>
        <TimeSection>
          <span>0:00</span> /
          <span>
            {minutes}:{seconds}
          </span>
        </TimeSection>
        <Progressbar>
          <Progress></Progress>
        </Progressbar>
      </PlaySection>
      <audio ref={audioRef} src={data[activeTab]?.audio} autoPlay controls />
    </React.Fragment>
  );
};

export default ListView;
