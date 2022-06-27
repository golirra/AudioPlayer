import { Audio } from "expo-av";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { useEffect, useContext, useState } from "react";
import { SongContext } from "../context/SongContext";
import styles from "../styles/styles.js";
import MediaButtons from "../styles/MediaButtons";
import Slider from "@react-native-community/slider";

const Playback = ({ route }) => {
  const { allMedia, setAllMedia } = useContext(SongContext);
  const { art, setArt } = useContext(SongContext)
  const { songIndex, setSongIndex } = useContext(SongContext)
  const { song, setSong } = useContext(SongContext);
  const { oldSong, setOldSong } = useContext(SongContext);
  const { sound, setSound } = useContext(SongContext);
  const { playing, setPlaying } = useContext(SongContext);
  var { songPosition, setSongPosition } = useContext(SongContext); //not supposed to use let with usestate
  var { songDuration, setSongDuration } = useContext(SongContext);
  var { seekBarPos, setSeekBarPos } = useContext(SongContext);
  const { songLoaded, setSongLoaded } = useContext(SongContext);
  const [nextCounter, setNextCounter] = useState(0);
  

  useEffect(() => {
    const getSongDuration = async () => {
        if (sound) {
          let status = await sound.getStatusAsync();
          console.log('getting Song Duration ' + oldSong);
          setSongDuration(status.durationMillis);
        } else if (!songLoaded) {
          console.log('song duration not available yet');
        }
    }; 
    getSongDuration();
  }, [sound]);

  useEffect(() => {
    const loadSound = async (file) => {
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
        setArt(route.params.art);
        setSongIndex(route.params.index);
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
        //that logic is here, it takes a second to do everything b/c of the interval speed, slow performance but it works
        if (oldSong !== song) {
          //return the clear interval call back when different loaded is loaded
          return () => clearInterval(songPosition);
        } 
      },1000); 
      //if interval is declared it will return a clear function
      return () => clearInterval(songPosition);
    }

    loadSound();
  }, [playing, songLoaded]);

  useEffect(() => {
    //when the another song is clicked this will check the sounds
    const checkSong = async () => {
      if ((oldSong !== song) && songLoaded) {
        await sound.unloadAsync();
        setSongLoaded(false);
        console.log('unloaded sound ' + oldSong);
      } 
    }
    checkSong();
  }, []);

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
    console.log("pressed prev");
    if (sound) {
      sound.replayAsync();
    }
  };

  const nextSound = async () => {
    let nextSong
    console.log('pressed next, unloading current sound');
    await sound.unloadAsync();
    try {
      nextSong = allMedia[songIndex+1];
      route.params.location = nextSong.fileLocation;
      route.params.songName = nextSong.metadata.title;
      route.params.index = songIndex+1;
      setSong(nextSong.metadata.title);
    } catch (e) {
      nextSong = allMedia[0];
      route.params.location = nextSong.fileLocation;
      route.params.songName = nextSong.metadata.title;
      route.params.index = 0;
      console.log('next song not available, starting over');
      setSong(nextSong.metadata.title);
    }

    try {
      route.params.art = nextSong.metadata.picture.pictureData
    } catch (e) {
      console.log('no picture data next song');
      route.params.art = null
    }
    setSongLoaded(false)
  }

  const songPos = async (position) => {
    if (sound) {
      playPauseSound();
      setSeekBarPos(position/songDuration);
      await sound.setStatusAsync({ positionMillis: position });
      
      setTimeout(async function() {
        await sound.playAsync();
        setPlaying(true); 
      }, 1000);
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
          <View style={styles.albumCover}>
            {route.params.art ? <><Image style={styles.albumCover} source={{uri: route.params.art}} /></> : <><Image style={styles.albumCover} source={MediaButtons.albumArt} /></>}
          </View>
          <Text style={{marginTop: 10}}>{route.params.songName}</Text>
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

            <TouchableOpacity style={styles.buttonContainer} onPress={nextSound}>
              <Image source={MediaButtons.next} style={styles.button} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Playback;
