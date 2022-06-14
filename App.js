import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Api from "./components/Api.js";
import Home from "./screens/Home.js";
import Playback from "./components/Playback.js";
import LibraryInfo from "./components/LibraryInfo.js";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home screen"
          component={Playback}
          options={{
            title: "Library",
            headerStyle: {
              backgroundColor: "grey",
              borderBottom: "1px solid",

              borderColor: "black",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen name="Api" component={Playback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} //end app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf7d9",
    padding: 10,
  },
  button: {
    flex: 1,
    width: 10,
    height: 50,
    color: "black",
  },
});
