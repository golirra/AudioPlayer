import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SongProvider } from "./context/SongContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MediaLibrary from "expo-media-library";
import { useState, useEffect } from "react";

import Playback from "./components/Playback.js";
import Footer from "./components/Footer.js";

import Albums from "./screens/Albums.js";
import Artists from "./screens/Artists.js";
import Home from "./screens/Home.js";
import Songs from "./screens/Songs.js";
import Playlists from "./screens/Playlists";
import Genres from "./screens/Genres";

export default function App() {
  const [allMedia, setAllMedia] = useState([]);

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    if (permission.granted) {
      getAudioFiles();
    }
    if (!permission.granted && permission.canAskAgain) {
      await MediaLibrary.requestPermissionsAsync();
    }
    console.log(permission);
  };

  const getAudioFiles = async () => {
    let values = await AsyncStorage.getItem("mediaAssets");

    if (values === null) {
      try {
        let media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
        });

        media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
          first: media.totalCount,
        });
        setAllMedia(media.assets);
        AsyncStorage.setItem("mediaAssets", JSON.stringify(media.assets));
      } catch (err) {
        console.log("Error: Must be on mobile or end of list: App.js");
      }
    } else {
      setAllMedia(JSON.parse(values));
      console.log("fetched from media storage: App.js");
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <SongProvider>
      <StatusBar backgroundColor="#ecf7d9" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home screen"
            component={Home}
            options={{
              title: "Library",
              headerStyle: {
                backgroundColor: "#ecf7d9",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Now Playing"
            component={Playback}
            options={{
              title: "Playback",
              headerStyle: {
                backgroundColor: "#ecf7d9",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Songs"
            component={Songs}
            options={{
              title: "Songs",
              headerStyle: {
                backgroundColor: "#ecf7d9",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Artists"
            component={Artists}
            options={{
              title: "Artists",
              headerStyle: {
                backgroundColor: "#ecf7d9",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Playlists"
            component={Playlists}
            options={{
              title: "Playlists",
              headerStyle: {
                backgroundColor: "#ecf7d9",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Albums"
            component={Albums}
            options={{
              title: "Albums",
              headerStyle: {
                backgroundColor: "#ecf7d9",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Genres"
            component={Genres}
            options={{
              title: "Genres",
              headerStyle: {
                backgroundColor: "#ecf7d9",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
        <Footer />
      </NavigationContainer>
    </SongProvider>
  );
}
