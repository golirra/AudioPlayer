import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SongProvider } from "./context/SongContext.js";

import Api from "./components/Api.js";
import Home from "./screens/Home.js";
import Playback from "./components/Playback.js";
import Songs from "./screens/Songs.js";
import LibraryInfo from "./components/LibraryInfo.js";
import Footer from "./components/Footer.js";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <SongProvider>
        <StatusBar 
          backgroundColor="#ecf7d9"
          barStyle="dark-content" 
        />
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
          </Stack.Navigator>
            <Footer />
        </NavigationContainer>
      </SongProvider>
  );
};
