import { Audio } from "expo-av";
import { Text, View, TouchableOpacity, Button, Image } from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import { SongContext } from "../context/SongContext";

import styles from "../styles/styles.js";
import MediaButtons from "../styles/MediaButtons";
import Slider from "@react-native-community/slider";

const Playback = ({ route }) => {
  const { song } = useContext(SongContext);
  const [oldSong, setOldSong] = useState();
  const [sound, setSound] = useState();
  const { playing, setPlaying } = useContext(SongContext);
  let { songPosition, setSongPosition } = useContext(SongContext); //not supposed to use let with usestate
  let [songDuration, setSongDuration] = useState(0);
  let { seekBarPos, setSeekBarPos } = useContext(SongContext);
  let isSubscribed = false;

  useEffect(() => {
    const getSongDuration = async () => {
      let status = await sound.getStatusAsync();
      setSongDuration(status.durationMillis);

      return status.durationMillis;
    };
    if (sound) {
      getSongDuration();
    }
  });

  useEffect(() => {
    if (sound) {
      if (playing) {
        songPosition = setInterval(async () => {
          let status = await sound.getStatusAsync();
          //console.log(status.positionMillis);
          setSongPosition(millisToMinutesAndSeconds(status.positionMillis)); //math here probably wrong
          setSeekBarPos(status.positionMillis / status.durationMillis);
        }, 1000);
        console.log("playing: playback.js");
      } else {
        console.log("pausing or not playing: playback.js");
      }
    }
  }, [playing]);

  const loadSound = async () => {
    if (sound) {
      console.log("sound already exists - unloading: playback.js");
    } else {
      console.log("Loading Sound");
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: route.params.location },
        {
          shouldPlay: false,
        }
      );
      setSound(sound);
      isSubscribed = true;
      console.log(status);
    }
    //load sound different from current one
    if (sound) {
      console.log("Reminder: Playing now will throw an error.");
      await sound.unloadAsync();
      isSubscribed = false;
      setSound(null);
    }
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

  const prevSound = async () => {
    console.log("pressed prev: playback.js");
    if (sound) {
      sound.replayAsync();
    } else {
      //do nothing
    }
  };

  const songPos = async (position) => {
    if (sound) {
      sound.setStatusAsync({ positionMillis: position });
    } else {
      //do nothing
    }
  };

  function millisToMinutesAndSeconds(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.playbackContainer}>
          <Image
            style={styles.albumCover}
            source={require("../assets/cover.jpg")}
          />
          <Text>{route.params.songName}</Text>
          <Text>{route.params.filename}</Text>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 30,
            }}
          >
            <Text style={{ fontSize: 15 }}>{songPosition}</Text>
            <Slider
              value={seekBarPos}
              style={{ width: 220 }}
              minimumValue={0}
              maximumValue={1}
              onSlidingComplete={(value) => {
                songPos(value * songDuration);
              }}
            />
            <Text style={{ fontSize: 15 }}>
              {millisToMinutesAndSeconds(songDuration)}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={prevSound}
            >
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
        </View>
      </View>
    </View>
  );
};

export default Playback;
