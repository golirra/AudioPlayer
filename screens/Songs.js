import LibraryInfo from '../components/LibraryInfo'
import { View, Text, FlatList, Button } from 'react-native'
import { useState, useEffect, useContext } from "react";
import * as MediaLibrary from "expo-media-library";
import { SongContext } from '../context/SongContext';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Songs() {
    const {allMedia, setAllMedia} = useContext(SongContext);
    const {song, setSong} = useContext(SongContext);

    const getAudioFiles = async () => {

        let values = await AsyncStorage.getItem('mediaAssets');

        if (values===null){
            console.log('storage is empty: Songs.js')
        } else {
            setAllMedia(JSON.parse(values));
            console.log('fetched from storage: Songs.js');
        }
    };

    useEffect(() => {
        getAudioFiles();
    }, [])

    const saveSong = (songName) => {
        setSong(songName);
        console.log("Songs.js - song pressed: " + songName)
    }

return (
        <View>
            <FlatList
                data={allMedia}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <LibraryInfo mediaData={item} saveSong={saveSong}/>
                )}
            />
        </View>
    )
}