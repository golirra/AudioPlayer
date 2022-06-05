import React, { Component } from "react";
import { Audio } from "expo-av";
import {
  SafeAreaView,
  Text,
  Switch,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";

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
      console.log("Must be on mobile");
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView>
      <View>
        <Button
          title="Track Select Placeholder/LoadSound"
          onPress={loadSound}
        />
        <Button title="Play/Pause audio" onPress={playPauseSound} />
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
