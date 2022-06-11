import { Audio, AVPlaybackStatus } from "expo-av";
import * as MediaLibrary from "expo-media-library";

import {
  SafeAreaView,
  Text,
  Switch,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import styles from "../styles/styles.js";
import  MediaButtons  from '../styles/MediaButtons'

const Playback = ({ data }) => {
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState(false);
  const [buttonText, setButtonText] = useState("play");
  let [songPosition, setSongPosition] = useState(0);

  async function loadSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/me.mp3")
    );
    setSound(sound);
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (sound) {
      if (playing) {
        songPosition = setInterval(async () => {
          let status = await songStatus();
          //console.log(status.positionMillis);
          setSongPosition(status.positionMillis);
        }, 1000);

        console.log("something is playing");
      } else {
        console.log("pausing");
      }
    }
    return () => {
      clearInterval(songPosition);
    };
  }, [playing]);

  const handleClick = () =>
    playing ? setButtonText("play") : setButtonText("pause");

  /* const songStatus = async () => {
    const status = await sound.getStatusAsync();
    console.log(status.positionMillis);
  }; */

  const songStatus = async () => {
    return await sound.getStatusAsync();
  };

  async function playPauseSound() {
    if (sound) {
      if (playing === false) {
        setPlaying(true);
        await sound.playAsync();
      } else {
        setPlaying(false);
        await sound.pauseAsync();
      }
    }
  }

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
    <SafeAreaView>
      <View style={styles.container}>
        <Button
          title="Track Select Placeholder/LoadSound"
          onPress={loadSound}
        />
        <View style={styles.container}>
          <Image
            style={styles.albumCover}
            source={require("../assets/cover.jpg")}
          />
        </View>

        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            {songPosition}
          </Text>
        </View>
        
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
              style={styles.buttonContainer}
            > 
              <Image
                source={MediaButtons.previous}
                style={styles.button}
              /> 
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={playPauseSound}
          > 
            {playing ? 
              <Image
                source={MediaButtons.pause}
                style={styles.button}
              /> 
            : 
              <Image
                source={MediaButtons.play}
                style={styles.button}
              /> 
            }
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.buttonContainer}
            > 
              <Image
                source={MediaButtons.next}
                style={styles.button}
              /> 
          </TouchableOpacity>

        </View>

        <Button
          title="media library assets console log"
          onPress={getAudioFiles}
        />
        <Button title="media library permissions" onPress={getPermission} />
      </View>
    </SafeAreaView>
  );
};

export default Playback;
