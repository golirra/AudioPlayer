import { Audio } from "expo-av";
import { Text, View, TouchableOpacity, Button, Image } from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";
import { SongContext } from "../context/SongContext";
import MusicInfo from "expo-music-info";

import styles from "../styles/styles.js";
import MediaButtons from "../styles/MediaButtons";
import Slider from "@react-native-community/slider";

const Playback = ({ route }) => {
  const { song, setSong } = useContext(SongContext);
  const {oldSong, setOldSong} = useContext(SongContext);
  const { sound, setSound } = useContext(SongContext);
  const { playing, setPlaying } = useContext(SongContext);
  var { songPosition, setSongPosition } = useContext(SongContext); //not supposed to use let with usestate
  var {songDuration, setSongDuration} = useContext(SongContext);
  var { seekBarPos, setSeekBarPos } = useContext(SongContext);
  var isSubscribed = false;
  const {songLoaded, setSongLoaded} = useContext(SongContext);
  var [art, setArt] = useState();
  var [metadata, setMetadata] = useState();

  useEffect(() => {
    const getSongDuration = async () => {
      try {
        if (sound) {
          let status = await sound.getStatusAsync();
          console.log('getting Song Duration ' + oldSong);
          if (status.durationMillis === undefined) {
            console.log('song duration is NaN');
          } else {
            setSongDuration(status.durationMillis);
          }
        } else if (!songLoaded) {
          console.log('song duration not available yet');
        }
      } catch (err) {
        console.log(err + " getSongDuration hook");
      }
      return songDuration;
    }; 
    getSongDuration();
  }, [sound])

  useEffect(() => {
    //moved into the same useeffect, downside is states update slowly but maybe better performanc

    const loadSound = async () => {
      if (!songLoaded || (songLoaded && (oldSong !== song))) {
        console.log("Loading Sound " + song);
        const { sound, status } = await Audio.Sound.createAsync(
          { uri: route.params.location },
          {
            shouldPlay: true,
          }
        );
        setSound(sound);
        setOldSong(song);
        setSong(song);
        setSongLoaded(true);
        //console.log(status);
        await sound.playAsync();
        setPlaying(true);
      }
    }

    //checks if the song is playing and sets the interval to update the songposition for the silderbar etc.
    if(playing && songLoaded) {
      songPosition = setInterval(async () => {
        let status = await sound.getStatusAsync();
        setSongPosition(millisToMinutesAndSeconds(status.positionMillis)); //math here probably wrong
        setSeekBarPos(status.positionMillis / status.durationMillis);
        console.log('getting song duration interval - running');

        //since the interval is tracking the song position it can see if the song vars are changed within the next second
        //that logic is hear, it takes a second to do everything b/c of the interval speed, slow performance but it works
        if (oldSong !== song) {
          await sound.unloadAsync();
          setSongLoaded(false);
          console.log('unloaded sound ' + oldSong);
          //return the clear interval call back when no song is loaded
          return () => clearInterval(songPosition);
        } 
      },1000);

      //if interval is declared it will return a clear function
      return () => clearInterval(songPosition);
    }

    loadSound();
  }, [playing, songLoaded]);


  //if setting a lot of states back to zero we can make a function
  const clearStates = () => {
  }

  /* useEffect(() => {
    let albumArt = async () => {
      let metadata = await MusicInfo.getMusicInfoAsync(route.params.location, {
        title: false,
        artist: false,
        album: false,
        genre: true,
        picture: true,
      });
      setArt(metadata.picture.pictureData);
      console.log(metadata);
    };
    albumArt();
  }, []); */

  const playPauseSound = async () => {
    if (sound) {
      if (!playing) {
        console.log('hit play');
        setPlaying(true);
        await sound.playAsync();
      } else {
        console.log('hit pause');
        setPlaying(false);
        await sound.pauseAsync();
      }
    }
  };

  const prevSound = async () => {
    console.log("pressed prev: playback.js");
    if (sound) {
      sound.replayAsync();
    }
  };

  const songPos = async (position) => {
    if (sound) {
      sound.setStatusAsync({ positionMillis: position });
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
          <Image style={styles.albumCover} source={{ uri: art }} />
          <Text>{route.params.songName}</Text>
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
