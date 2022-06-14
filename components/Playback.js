import { Audio } from "expo-av";

import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";

import { useState, useEffect } from "react";
import styles from "../styles/styles.js";
import  MediaButtons  from '../styles/MediaButtons'

import { API_KEY, API_SECRET } from "@env";

const Playback = () => {
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState(false);
  let [songPosition, setSongPosition] = useState(0); //not supposed to use let with usestate
  let [songDuration, setSongDuration] = useState(0);

  async function loadSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/me.mp3"),
      {
        shouldPlay: true,
      }
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
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
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

      </View>
  );
};

export default Playback;
