import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ListItem, Icon } from '@rneui/themed'

export default function LibraryInfo( { mediaData } ) {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity 
        key={mediaData.id}  
        onPress={() => navigation.navigate(
          'Now Playing',
          { location: mediaData.uri,
            songName: mediaData.filename,
          }
        )}
      >
        <ListItem bottomDivider>
        <Icon type='feather' name='music'/>
        <ListItem.Content>
          <ListItem.Title>{mediaData.filename}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      </TouchableOpacity>
    </View>
  );
}
