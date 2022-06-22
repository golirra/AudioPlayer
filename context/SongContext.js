import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
  const [song, setSong] = useState();
  const [playing, setPlaying] = useState(false);
  const [oldSong, setOldSong] = useState();
  const [sound, setSound] = useState();
  const [songLoaded, setSongLoaded] = useState(false);
  var [songPosition, setSongPosition] = useState("0:00");
  var [seekBarPos, setSeekBarPos] = useState(0);
  var [songDuration, setSongDuration] = useState(0);

  return (
    <SongContext.Provider
      value={{
        songDuration, setSongDuration,
        playing, setPlaying,
        song, setSong,
        sound, setSound,
        oldSong, setOldSong,
        songLoaded, setSongLoaded,
        songPosition, setSongPosition,
        seekBarPos, setSeekBarPos,

      }}
    >
      {children}
    </SongContext.Provider>
  );
};
