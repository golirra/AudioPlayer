import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

function Home({ navigation }) {
  const Options = [{
    id:0,
    name: 'Artists',
},  {
    id:1,
    name: 'Songs',
},  {
    id:2,
    name: 'Albums',
},  {
    id:3,
    name: 'Playlists',
},  {
    id:4,
    name: 'Genres',
}
];
  return (
    <View style={styles.container}>
      {Options.map((Options) => 
        <View key={Options.id} style={styles.options}>
        <TouchableOpacity>
          <Text style={{ fontSize: 15 }}>{Options.name}</Text>
        </TouchableOpacity>
        </View>
      )}

        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10}}>Recently Added</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  options: {
    padding: 20,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
  },

});

export default Home;
