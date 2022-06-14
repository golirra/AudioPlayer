import { StyleSheet} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Api from "./components/Api.js";
import Home from "./screens/Home.js";
import Playback from "./components/Playback.js";
import Songs from "./screens/Songs.js";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home screen" 
            component={Home}
            options={{
              title: 'Library',
              headerStyle: {
                backgroundColor: '#ecf7d9',
              },
              headerTintColor: 'black',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTransparent: true,
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="Api"
            component={Playback}
          />
          <Stack.Screen
            name="Songs"
            component={Songs}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>

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
