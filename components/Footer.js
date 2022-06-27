import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { SongContext } from "../context/SongContext";
import MediaButtons from "../styles/MediaButtons";
import styles from "../styles/styles.js";

import { Icon } from "@rneui/themed";

const Footer = () => {
  const navigation = useNavigation();
  const { playing, setPlaying } = useContext(SongContext);
  const { songIndex, setSongIndex } = useContext(SongContext);
  const { song } = useContext(SongContext);
  const { art } = useContext(SongContext);

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: "#dcdcdc",
        backgroundColor: "#ecf7d9",
        alignItems: "center",
      }}
    >
      {song ? (
        <>
          <View style={{flexDirection: "row"}}>
            <TouchableOpacity
              style={{ padding: 20}}
              onPress={() =>
                navigation.navigate("Now Playing", {
                  songName: song,
                  art: art,
                  index: songIndex
                })
              }
            >
              <Text>Playing: {song}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text style={{ padding: 20 }}>Select a song.</Text>
        </>
      )}
      <View
        style={{
          width: "100%",
          borderTopWidth: 1,
          borderTopColor: "#dcdcdc",
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ paddingRight: 40 }}
          onPress={() => navigation.navigate("Home screen")}
        >
          <Icon type="feather" name="home" />
          <Text>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
        >
          <Icon type="feather" name="settings" />
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
