import { View, ActivityIndicator, Text } from 'react-native'
import { useState, useContext } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import Button from '../components/Button'
import styles from '../styles/styles'
import MusicInfo from "expo-music-info";

import { SongContext } from '../context/SongContext';


const Settings = () => {
    const [loading, setloading] = useState(false);
    const {allMedia, setAllMedia} = useContext(SongContext);

    const getPermission = async () => {
    
        const permission = await MediaLibrary.getPermissionsAsync();

        if (permission.granted) {
            getAudioFiles();
        }
        if (!permission.granted && permission.canAskAgain) {
            await MediaLibrary.requestPermissionsAsync();
        }
        console.log(permission);
        };

    const getAudioFiles = async () => {
        let values = await AsyncStorage.getItem("mediaAssets");

        if (values === null) {
            try {
                let media = await MediaLibrary.getAssetsAsync({
                mediaType: "audio",
            });

            media = await MediaLibrary.getAssetsAsync({
                mediaType: "audio",
                first: media.totalCount,
            });
                console.log('setting media storage')
                for (let i in media.assets) {
                    setloading(true); 
                        let metadata = await MusicInfo.getMusicInfoAsync(media.assets[i].uri, {
                            title: true,
                            artist: true,
                            album: true,
                            genre: true,
                            picture: true  
                        });
                        var fileLocation = media.assets[i].uri;
                        var musicData = {
                            'fileLocation': fileLocation,
                            'metadata': metadata
                        };
                        allMedia.push(musicData)
                }
                AsyncStorage.setItem("mediaAssets", JSON.stringify(allMedia));
            } catch (err) {
                console.log("Error: Must be on mobile or end of list: App.js");
            }
            setloading(false);
        }
    };

    const clearMedia = async () => {
        await AsyncStorage.clear();
        console.log('storage cleared')
    }

    return (
        <View>
            {loading ? 
                <>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <ActivityIndicator size='large' />
                        <Text style={{justifyContent: 'center', alignItems: 'center'}}>This may take a while...</Text>
                    </View>
                </> 
            : 
                <>
                    <View style={styles.container}>
                        <Button name='Get Media' icon='music' onPress={getPermission}/>
                        <Button name='Clear Media' icon='trash' onPress={clearMedia} />
                        <Button name='Get Album Art' icon='archive'/>
                    </View>
                </>
            }
        </View>
        
    )
}

export default Settings