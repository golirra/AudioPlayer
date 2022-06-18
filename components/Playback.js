import { Audio } from "expo-av";
import {
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { SongContext } from '../context/SongContext';

import styles from "../styles/styles.js";
import MediaButtons from "../styles/MediaButtons";
import Slider from "@react-native-community/slider";

const Playback = () => {  

  const {sound, setSound} = useContext(SongContext);
  const {playing, setPlaying} = useContext(SongContext);
  let {songPosition, setSongPosition} = useContext(SongContext);//not supposed to use let with usestate
  let [songDuration, setSongDuration] = useState(0);
  let {seekBarPos, setSeekBarPos} = useContext(SongContext);


  const loadSound = async () => {
    if(sound) {
      console.log('sound already exists - unload it')
    } else {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/Songs/me.mp3"),
        {
          shouldPlay: false,
        }
      );
      setSound(sound);
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
    console.log('pressed prev');
    if (sound) {
      sound.replayAsync();
    } else {
      //do nothing
    }
  }

  /* useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]); */

  const songPos = async (position) => {
    if(sound) {
      sound.setStatusAsync({ positionMillis: position });
    } else {
      //do nothing
    }
  };

  /* it works but the logic is off, 
  need to get song duration before song plays */
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
        console.log("playing");
      } else {
        console.log("pausing");
      }
    }
  }, [playing]);

  return (
    <View style={styles.container}>
      <View>
        <Button
          title="Track Select Placeholder/LoadSound"
          onPress={loadSound}
        />
        <View style={styles.playbackContainer}>
          <Image
            style={styles.albumCover}
            source={require("../assets/cover.jpg")}
          />
          <View style={{ justifyContent: "center", flexDirection: 'row', marginTop: 30 }}>
            <Text style={{ fontSize: 15}}>
              {songPosition}
            </Text>
            <Slider
              value={seekBarPos}
              style={{ width: 220 }}
              minimumValue={0}
              maximumValue={1}
              onSlidingComplete={(value) => {
                songPos(value * songDuration);
              }}
            />
            <Text
              style={{ fontSize: 15 }}
            >
              {millisToMinutesAndSeconds(songDuration)}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.buttonContainer} onPress={prevSound}>
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
