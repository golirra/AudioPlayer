import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
<<<<<<< HEAD
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState(false);
  let [songPosition, setSongPosition] = useState("0:00");
  let [seekBarPos, setSeekBarPos] = useState(0);

  return (
    <SongContext.Provider
      value={{
        playing,
        setPlaying,
        sound,
        setSound,
        songPosition,
        setSongPosition,
        seekBarPos,
        setSeekBarPos,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
=======
    const [song, setSong] = useState();
    const [playing, setPlaying] = useState(false);
    let [songPosition, setSongPosition] = useState('0:00');
    let [seekBarPos, setSeekBarPos] = useState(0);
    
    return (
        <SongContext.Provider value={{
                playing, setPlaying, 
                song, setSong, 
                songPosition, setSongPosition, 
                seekBarPos, setSeekBarPos
            }}>
            {children}
        </SongContext.Provider>
    )
}
>>>>>>> parent of b6bc4b9 (Revert "pushing async storage")
