import React, { Component } from "react";
import { Audio } from "expo-av";
import {
  SafeAreaView,
  FlatList,
  Text,
  Switch,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/styles";

const Api = () => {
  const cors = require("cors");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const getArtists = () => {
      axios
        .get("https://api.discogs.com/artists/3317315/releases", {
          headers: {
            "Content-Type": "application/json",
            //"User-Agent": "ReactNativeAudio/0.1 +Axios 0.27.2",

            Authorization:
              "Discogs key=JnWakoykeORxNFmHFywg,secret=hwPmGFhcFVEYCUeYUAEBOexadRSvsUdk",
          },
        })
        .then((response) => {
          setArtists(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err + "oh no");
        });
    };
    getArtists();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={artists}
          renderItem={({ item }) => <Playback data={item} />}
          keyExtractor={(item) => item.id}
        />
        <Text style={styles.pretty}>{artists.name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Api;
