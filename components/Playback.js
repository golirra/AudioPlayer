import React, { Component } from "react";
import { Audio } from "expo-av";
import { Text, Switch, View, StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";

function Playback(props) {
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

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Button title="Track Select Placeholder/LoadSound" onPress={loadSound} />
      <Button title="Play/Pause audio" onPress={playPauseSound} />
    </View>
  );
}

export default Playback;
