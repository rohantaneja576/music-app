import React from "react";
import playBtn from "../../Images/playBtn.png";
import styled from "styled-components";
import AudioControl from "./AudioControl";
import { useSelector, useDispatch } from "react-redux";
import { visibleAudioController } from "../../Store/actions/visibilityActions";
import {
  currentSong,
  playerState,
  activeTime,
  sliderValue,
} from "../../Store/actions/audioActions";
import { PlayerState } from "../../Store/reducers/audioControllerReducer";

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
  const isPlaying = useSelector((state) => state.visibilityReducer.isVisible);
  const playingMode = useSelector(
    (state) => state.audioControllerReducer.playingMode
  );
  let currentSongID = useSelector(
    (state) => state.audioControllerReducer.currentSongID
  );
  const dispatch = useDispatch();

  const currentAudio = data.find((value) => value.id === currentSongID)?.audio;
  console.log(currentSongID, data.length, playingMode);

  const handleAudio = (id) => {
    dispatch(visibleAudioController());
    dispatch(currentSong(id));
    dispatch(activeTime(0));
    dispatch(sliderValue(0));
    if (playingMode === "PAUSED") {
      dispatch(playerState(PlayerState.PLAYING));
    }
  };

  const handlePrevSong = () => {
    if (currentSongID === 1) {
      currentSongID = data.length + 1;
    }
    dispatch(currentSong(currentSongID - 1));
    return currentAudio;
  };

  const handleNextSong = () => {
    if (currentSongID > data.length - 1) {
      currentSongID = 0;
    }
    dispatch(currentSong(currentSongID + 1));
    return currentAudio;
  };

  return (
    <React.Fragment>
      <StyledWrapper>
        {data.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <WrapperItems onClick={() => handleAudio(item.id)}>
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
          audiosrc={currentAudio}
          prevSong={handlePrevSong}
          nextSong={handleNextSong}
        />
      )}
    </React.Fragment>
  );
};

export default MusicList;
