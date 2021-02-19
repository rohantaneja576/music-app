import React, { useState, useRef, useEffect } from "react";
import MusicList from "./MusicList";
import AudioControl from "./AudioControl";
import { Musiclists } from "../Services/MusicListData";

const ListView = ({ data }) => {
  return (
    <React.Fragment>
      <MusicList data={Musiclists} />
      {Playing && <AudioControl />}
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
