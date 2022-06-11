import * as React from "react";
import { useState, useEffect } from "react";
import { Text, Switch, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Api from "./components/Api.js";
import Home from "./components/Home.js";
import Playback from "./components/Playback.js";
import Navigator from "./screens/Navigator.js";

export default function App() {
  const Stack = createStackNavigator();
  //const navigation = useNavigation();

  const goToPrevScreen = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home screen" component={Playback} />
          <Stack.Screen
            name="Api"
            component={Playback}
            options={{
              headerTitle: (props) => (
                <Button
                  title="Placeholder Button goback"
                  onPress={navigation.goBack}
                />
              ),
            }}
          />
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
