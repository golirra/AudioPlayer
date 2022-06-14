import { useEffect } from "react";
import { Button } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function LibraryInfo() {
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
  useEffect(() => {
    getPermission();
  }, []);

  const getAudioFiles = async () => {
    try {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
      });

      console.log(media);
    } catch (err) {
      console.log("Error: Must be on mobile");
    }
  };

  return (
    <View>
      <Button
        title="media library assets console log"
        onPress={getAudioFiles}
      />
      <Button title="media library permissions" onPress={getPermission} />
    </View>
  );
}
