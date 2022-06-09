import React, { Component } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";
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
import * as MediaLibrary from "expo-media-library";
import styles from "../styles/styles.js";

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
        <View style={{ right: 150 }}>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            {songPosition}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={playPauseSound}
        >
          <Text style={styles.text}>Play/Pause</Text>
        </TouchableOpacity>

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
