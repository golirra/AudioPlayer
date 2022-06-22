import React, { Component } from "react";
import { Audio } from "expo-av";
import {
  Image,
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
import { API_TOKEN } from "@env";

const Api = () => {
  const [artists, setArtists] = useState([]);
  const [coverArt, setCoverArt] = useState();

  const instance = axios.create({
    baseURL: "https://api.discogs.com/database/search",
    timeout: 10000,
    params: {
      token: "jTelrhsWkQGOLfipTFiiSGpfpVTivrvlDvjRbsdT",
    },
  });

  useEffect(() => {
    const getArtists = () => {
      instance
        .get("https://api.discogs.com/masters/173765", {
          headers: {
            "Content-Type": "application/json",
            //"User-Agent": "ReactNativeAudio/0.1",
          },
        })
        .then((response) => {
          console.log(response);
          setArtists(response.data);
          console.log(response.data.releases[0]);
        })
        .catch((err) => {
          console.log("Probably requesting too fast or improper URL" + err);
        });
    };
    getArtists();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Image
          style={{ height: 500, width: 500 }}
          source={{
            uri:
              "https://i.discogs.com/3aV4_aoB--hDPrwXzpyJ65pCOCsuqfrlXljchbuNpNM/rs:" +
              "fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYzOTkw/NTItMTQyMTM5NDgw/Ny01MDIwLmpwZWc.jpeg",
          }}
        />
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
