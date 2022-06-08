import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home({ navigation }) {
  return (
    <Button
      title="Playback Screen"
      onPress={() => navigation.navigate("Api")}
    />
  );
}

export default Home;
