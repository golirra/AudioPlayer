import React, { Component } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";
import Slider from "@react-native-community/slider";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { useState, useEffect } from "react";

import styles from "../styles/styles.js";

const Playback = () => {
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState(false);
  let [songPosition, setSongPosition] = useState(0); //not supposed to use let with usestate
  let [songDuration, setSongDuration] = useState(0);

  async function loadSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/me.mp3")
    );
    setSound(sound);
    const status = await sound.getStatusAsync();
    console.log(status);
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //it works but the logic is off
  useEffect(() => {
    if (sound) {
      const getSongDuration = async () => {
        let status = await sound.getStatusAsync();
        setSongDuration(millisToMinutesAndSeconds(status.durationMillis));
      };
      getSongDuration();
    }
  });

  /*from stackoverflow */
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  useEffect(() => {
    if (sound) {
      if (playing) {
        songPosition = setInterval(async () => {
          let status = await sound.getStatusAsync();
          //console.log(status.positionMillis);
          setSongPosition(millisToMinutesAndSeconds(status.positionMillis)); //math here probably wrong
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

  const playPauseSound = async () => {
    if (sound) {
      if (!playing) {
        setPlaying(true);
        await sound.playAsync();
      } else {
        setPlaying(false);
        await sound.pauseAsync();
      }
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
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              position: "absolute",
              right: 200,
            }}
          >
            {songPosition}
          </Text>
          <Text
            style={{
              fontSize: 40,
              left: 500,
              position: "absolute",
            }}
          >
            {songDuration}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={playPauseSound}
        >
          {/* <Text style={{ color: "white" }}>Play/Pause</Text> */}
          <Image
            style={styles.logo}
            source={require("../assets/play-pause-icon.png")}
          />
        </TouchableOpacity>

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          onValueChange={() => {
            console.log(songDuration);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Playback;
