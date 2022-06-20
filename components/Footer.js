import { View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { SongContext } from '../context/SongContext';
import styles from "../styles/styles.js";

const Footer = () => {
    const navigation = useNavigation();
    const {playing} = useContext(SongContext);
    const {song} = useContext(SongContext);


    return (
        <View flexDirection='row' justifyContent='center' style={{height: 80, borderTopWidth: 1, borderTopColor: '#dcdcdc', backgroundColor: '#ecf7d9'}}>
            {song ? 
                <>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Now Playing', {
                        songName: song
                    })}>
                        <Text>Playing: {song}</Text>
                    </TouchableOpacity>
                </> 
            : 
                <>
                    <Text style={{marginTop: 30}}>
                        Select a song.
                    </Text>
                </>
            }
        </View>
    )
}

export default Footer