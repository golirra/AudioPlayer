import LibraryInfo from '../components/LibraryInfo'
import { View, Text, FlatList, Button } from 'react-native'
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";


export default function Songs() {
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

        try {
            let media = await MediaLibrary.getAssetsAsync({
            mediaType: "audio",
            });

            media = await MediaLibrary.getAssetsAsync({
                mediaType: 'audio',
                first: media.totalCount,
            });

        setAllMedia(media.assets);
        } catch (err) {
            console.log("Error: Must be on mobile or end of list.");
        }
    };

    useEffect(() => {
        getPermission();
    }, [])

return (
        <View>
            <Button
                title="media library assets console log"
                onPress={getAudioFiles}
            />

            <Button 
                title="media library permissions" 
                onPress={getPermission} 
            />

            <FlatList
                data={allMedia}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <LibraryInfo mediaData={item}/>
                )}
            />
        </View>
    )
}