import * as React from "react";
import { useState, useEffect } from "react";
import { Text, Switch, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import Playback from "./components/Playback.js";
import Api from "./components/Api.js";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home.js";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Api Testing" component={Api} />
          <Stack.Screen name="Playback Screen" component={Playback} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
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
