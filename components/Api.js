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

const Api = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const getArtists = async () => {
      axios
        .get("https://api.discogs.com/database/search?type=artist&q=Lorde", {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Discogs key=JnWakoykeORxNFmHFywg,secret=hwPmGFhcFVEYCUeYUAEBOexadRSvsUdk",
          },
        })
        .then((response) => {
          setArtists(response);
          console.log(response);
        });
    };
    getArtists();
  });

  return (
    <SafeAreaView>
      <FlatList
        data={artists}
        renderItem={({ item }) => <Playback data={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Api;
