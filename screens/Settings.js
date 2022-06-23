import { View  } from 'react-native'
import {  useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import Button from '../components/Button'
import styles from '../styles/styles'


const Settings = () => {
    const [allMedia, setAllMedia] = useState([]);

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
                setAllMedia(media.assets);
                console.log('setting media storage')
                AsyncStorage.setItem("mediaAssets", JSON.stringify(media.assets));
            } catch (err) {
                console.log("Error: Must be on mobile or end of list: App.js");
            }
        } else {
            setAllMedia(JSON.parse(values));
            console.log("fetched from media storage: App.js");
        }
    };

    const clearMedia = async () => {
        await AsyncStorage.clear();
        console.log('storage cleared')
    }


    return (
        <View style={styles.container}>
            <Button name='Get Media' icon='music' onPress={getPermission}/>
            <Button name='Clear Media' icon='music' onPress={clearMedia} />
            <Button name='Get Album Art' icon='music'/>
        </View>
        
    )
}

export default Settings