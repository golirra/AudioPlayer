import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
    const [sound, setSound] = useState();
    const [playing, setPlaying] = useState(false);
    let [songPosition, setSongPosition] = useState('0:00');
    let [seekBarPos, setSeekBarPos] = useState(0);
    
    return (
        <SongContext.Provider value={{
                playing, setPlaying, 
                sound, setSound, 
                songPosition, setSongPosition, 
                seekBarPos, setSeekBarPos
            }}>
            {children}
        </SongContext.Provider>
    )
}
