import React, { useState } from "react";
import playBtn from "../../Images/playBtn.png";
import styled from "styled-components";

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

const MusicList = ({ data }) => {
  const PlayerState = {
    PLAYING: "PLAYING",
    PAUSED: "PAUSE",
  };
  const [activeTab, setActiveTab] = useState(null);
  const [Playing, setPlaying] = useState(false);
  const [playerState, setPlayerState] = useState(PlayerState.PLAYING);

  const handleProgressBar = (index) => {
    setPlaying(true);
    setActiveTab(index);
    if (playerState === "PLAYING") {
      setPlayerState(PlayerState.PAUSED);
    } else {
      setPlayerState(PlayerState.PAUSED);
    }
  };
  return (
    <React.Fragment>
      <StyledWrapper>
        {data.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
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
    </React.Fragment>
  );
};

export default MusicList;
