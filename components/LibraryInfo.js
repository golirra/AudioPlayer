import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ListItem, Icon } from '@rneui/themed';
import { useState, useEffect } from 'react';

export default function LibraryInfo( { mediaData, saveSong, getIndex } ) {

  const navigation = useNavigation();
  const [ art, setArt ] = useState();


  useEffect(() => {
    try {
      setArt(mediaData.metadata.picture.pictureData)
    } catch (e) {
      console.log('not all meta data available ' + mediaData.metadata.title);
    }
  }, []);

  return (
    <View>
      <TouchableOpacity 
        key={mediaData.id}  
        onPress={() => {
          saveSong(mediaData.metadata.title);
          navigation.navigate(
            'Now Playing',
            { location: mediaData.fileLocation,
              songName: mediaData.metadata.title,
              art: art,
              index: getIndex(mediaData)
            }
          )
        }}
      >
        <ListItem bottomDivider>
          {art ? 
            <>
              <Image style={{height: 40, width: 40}} source={{uri: art}} />
            </> 
          : 
            <>
              <Icon style={{height: 40, width: 40, justifyContent: 'center'}} type="feather" name="music" />
            </>
            }
        <ListItem.Content>
          <ListItem.Title>{mediaData.metadata.title}</ListItem.Title>
          <ListItem.Subtitle>{mediaData.metadata.artist}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      </TouchableOpacity>
    </View>
  );
}
