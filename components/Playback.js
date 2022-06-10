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
import { useState, useEffect, useRef } from "react";
import * as MediaLibrary from "expo-media-library";
import styles from "../styles/styles.js";

const Playback = ({ data }) => {
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState(false);
  const [buttonText, setButtonText] = useState("play");
  let [songPosition, setSongPosition] = useState(0);
  let [songDuration, setSongDuration] = useState(0);

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

  const isInitialMount = useRef(true);

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

  const handleClick = () =>
    playing ? setButtonText("play") : setButtonText("pause");

  const playPauseSound = async () => {
    if (sound) {
      if (playing === false) {
        setPlaying(true);
        await sound.playAsync();
      } else {
        setPlaying(false);
        await sound.pauseAsync();
      }
    }
  };

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
              fontWeght: "bold",
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
