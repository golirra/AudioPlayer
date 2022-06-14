import { Text, View } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { ListItem, Icon } from '@rneui/themed'


function Home({ navigation }) {
  const headerHeight = useHeaderHeight();

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
    }
    ];

  return (
    <View style={{ marginTop: headerHeight, borderTopWidth: 1, borderTopColor: '#dcdcdc' }}>
      {Options.map((Options) => 
      <TouchableOpacity key={Options.id}>
        <ListItem bottomDivider>
        <Icon type='feather' name={Options.icon} />
        <ListItem.Content>
          <ListItem.Title>{Options.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      </TouchableOpacity>
      )}

        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>Recently Added</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    padding: 30,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 1,
  },

});

export default Home;
