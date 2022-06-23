import LibraryInfo from '../components/LibraryInfo'
import { View, FlatList } from 'react-native'
import { useEffect, useContext, useState } from "react";
import { SongContext } from '../context/SongContext';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Songs() {
    const [allMedia, setAllMedia] = useState([]);
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