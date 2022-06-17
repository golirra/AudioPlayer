import { createContext, useState } from "react";

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
    const [sound, setSound] = useState();
    const [playing, setPlaying] = useState(false);
    
    return (
        <SongContext.Provider value={{playing, setPlaying, sound, setSound}}>
            {children}
        </SongContext.Provider>
    )
}
