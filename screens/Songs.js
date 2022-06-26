import LibraryInfo from '../components/LibraryInfo'
import { View, FlatList } from 'react-native'
import { useEffect, useContext, useState } from "react";
import { SongContext } from '../context/SongContext';

export default function Songs() {
    const {allMedia} = useContext(SongContext);
    const {song, setSong} = useContext(SongContext);

    const saveSong = (songName) => {
        setSong(songName);
        console.log("Songs.js - song pressed: " + songName)
    }

    const getIndex = (songName) =>{
        return allMedia.indexOf(songName);
    }

return (
        <View>
            <FlatList
                data={allMedia}
                keyExtractor={item => item.fileLocation}
                renderItem={({ item }) => (
                    <LibraryInfo mediaData={item} saveSong={saveSong} getIndex={getIndex}/>
                )}
            />
        </View>
    )
}