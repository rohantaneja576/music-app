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
`;
const PlayBtn = styled.div`
  position: absolute;
  width: 35%;
`;
const PlaySection = styled.div`
  audio {
    outline: none;
    width: 95%;
    bottom: 5%;
    position: absolute;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ListView = ({ data }) => {
  const [activeTab, setActiveTab] = useState(null);
  return (
    <React.Fragment>
      <StyledWrapper>
        {data.map((item, index) => {
          return (
            <React.Fragment>
              <WrapperItems onClick={() => setActiveTab(index)}>
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
        {activeTab === null ? null : (
          <audio src={data[activeTab].audio} autoPlay controls />
        )}
      </PlaySection>
    </React.Fragment>
  );
};

export default ListView;
