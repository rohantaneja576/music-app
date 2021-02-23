import React, { useState, useRef } from "react";
import playBtn from "../../Images/playBtn.png";
import styled from "styled-components";
import AudioControl, { PlayerState } from "./AudioControl";
import { useSelector, useDispatch } from "react-redux";
import { visibleAudioController } from "../../Store/actions/visibilityActions";
import { prevSong } from "../../Store/actions/audioActions";

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
  const [activeTab, setActiveTab] = useState(null);
  const [playerState, setPlayerState] = useState(PlayerState.PAUSED);
  const isPlaying = useSelector((state) => state.visibilityReducer.isVisible);
  const prevValue = useSelector((state) => state.audioControllerReducer.prevID);
  const dispatch = useDispatch();

  const handleAudio = (index) => {
    dispatch(visibleAudioController());
    setActiveTab(index);
    if (playerState === PlayerState.PAUSED) {
      setPlayerState(PlayerState.PLAYING);
    } else {
      setPlayerState(PlayerState.PLAYING);
    }
  };

  const handlePrevSong = () => {
    console.log(prevValue);
    let value = activeTab - 1;
    return !data[activeTab].id ? null : setActiveTab(dispatch(prevSong(value)));
  };

  const handleNextSong = () => {
    return !data[activeTab].id ? null : setActiveTab(activeTab + 1);
  };

  return (
    <React.Fragment>
      <StyledWrapper>
        {data.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              <WrapperItems onClick={() => handleAudio(index)}>
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
      {isPlaying && (
        <AudioControl
          data={data}
          playerState={playerState}
          updatePlayerState={setPlayerState}
          audiosrc={data[activeTab]?.audio}
          prevSong={handlePrevSong}
          nextSong={handleNextSong}
        />
      )}
    </React.Fragment>
  );
};

export default MusicList;
