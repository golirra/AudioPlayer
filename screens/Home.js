import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { ListItem, Icon } from '@rneui/themed'
import styles from "../styles/styles.js";
import { SongContext } from "../context/SongContext";
import { useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'


function Home({ navigation }) {

  const { allMedia, setAllMedia } = useContext(SongContext);

  const getAudioFiles = async () => {

    let values = await AsyncStorage.getItem('mediaAssets');

    if (values===null){
        console.log('storage is empty: Songs.js')
    } else {
        setAllMedia(JSON.parse(values));
        console.log('fetched from storage: Songs.js');
    }
  };

  useEffect(() => {
      getAudioFiles();
  }, [])

  const Options = [
    {
      id:0,
      name: 'Artists',
      icon: 'user'
    },  {
        id:1,
        name: 'Songs',
        icon: 'music'
    },  {
        id:2,
        name: 'Albums',
        icon: 'book'
    },  {
        id:3,
        name: 'Playlists',
        icon: 'list'
    },  {
        id:4,
        name: 'Genres',
        icon: 'box'
    }];

  return (
    <View style={{borderTopWidth: 1, borderTopColor: '#dcdcdc',}}>
      {Options.map((Options) => 
      <TouchableOpacity key={Options.id} onPress={() => navigation.navigate(Options.name)}>
        <ListItem bottomDivider>
        <Icon type='feather' name={Options.icon} />
        <ListItem.Content>
          <ListItem.Title>{Options.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      </TouchableOpacity>
      )}

        <View>
          <Text style={styles.text}>Recently Added</Text>
        </View>
    </View>
  );
}

export default Home;
