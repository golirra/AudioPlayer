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
    const songStatus = async () => {
      const status = await sound.getStatusAsync();
      console.log(status.positionMillis);
    };
    const interval = setInterval(() => {
      console.log("fuck");
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () =>
    playing ? setButtonText("play") : setButtonText("pause");

  async function playPauseSound() {
    if (playing === false) {
      await sound.playAsync();
      console.log("playing sound");
      setPlaying(true);
    } else {
      await sound.pauseAsync();
      console.log("pausing sound");
      setPlaying(false);
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
        <Button
          title="test"
          onPress={() => {
            console.log(MyContext);
          }}
        />
        <Button
          title="song status"
          onPress={() => {
            songStatus();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Playback;
