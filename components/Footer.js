import { View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import { SongContext, SongProvider } from '../context/SongContext';
=======
import { SongContext } from '../context/SongContext';
import styles from "../styles/styles.js";
>>>>>>> parent of 24c91f5 (footer changes)

const Footer = () => {
    const navigation = useNavigation();
    const {playing} = useContext(SongContext);

    return (
<<<<<<< HEAD
        <View flexDirection='row' justifyContent='center' style={{height: 80, borderTopWidth: 1, borderTopColor: '#dcdcdc'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Now Playing')}>
                <Text>Playback: {playing.toString()}</Text>
            </TouchableOpacity>
=======
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
>>>>>>> parent of 24c91f5 (footer changes)
        </View>
    )
}

export default Footer