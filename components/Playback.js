import { Audio } from "expo-av";

import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useState, useEffect, useContext } from "react";
import styles from "../styles/styles.js";
import MediaButtons from "../styles/MediaButtons";
import Slider from "@react-native-community/slider";

const Playback = () => {
  const headerHeight = useHeaderHeight();
  const [sound, setSound] = useState();
  const [playing, setPlaying] = useState(false);
  let [songPosition, setSongPosition] = useState(0); //not supposed to use let with usestate
  let [songDuration, setSongDuration] = useState(0);
  let [seekBarPos, setSeekBarPos] = useState(0);

  const loadSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/me.mp3"),
      {
        shouldPlay: true,
      }
    );
    setSound(sound);
  };

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

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const songPos = async (position) => {
    let status = await sound.getStatusAsync();
    sound.setStatusAsync({ positionMillis: position });
  };

  const getSongPos = async () => {
    let status = await sound.getStatusAsync();
    return status.PositionMillis;
  };

  const getSongDuration = async () => {
    let status = await sound.getStatusAsync();
    setSongDuration(status.durationMillis);
    return status.durationMillis;
  };

  /* it works but the logic is off, 
  need to get song duration before song plays */
  useEffect(() => {
    if (sound) {
      getSongDuration();
    }
  });

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
          setSeekBarPos(status.positionMillis / status.durationMillis);
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

  return (
    <SafeAreaView style={{ marginTop: headerHeight }}>
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
              left: 300,
              position: "absolute",
            }}
          >
            {millisToMinutesAndSeconds(songDuration)}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Image source={MediaButtons.previous} style={styles.button} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={playPauseSound}
          >
            {playing ? (
              <Image source={MediaButtons.pause} style={styles.button} />
            ) : (
              <Image source={MediaButtons.play} style={styles.button} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}>
            <Image source={MediaButtons.next} style={styles.button} />
          </TouchableOpacity>
        </View>
        <Slider
          value={seekBarPos}
          style={{ width: 200 }}
          minimumValue={0}
          maximumValue={1}
          onSlidingComplete={(value) => {
            songPos(value * songDuration);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Playback;
