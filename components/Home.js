import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home({ navigation }) {
  return (
    <Button title="Api screen" onPress={() => navigation.navigate("Api")} />
  );
}

export default Home;
