import { View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
<<<<<<< HEAD
import { SongContext, SongProvider } from '../context/SongContext';
=======
import { SongContext } from '../context/SongContext';
import styles from "../styles/styles.js";
>>>>>>> parent of 24c91f5 (footer changes)
=======
import { SongContext } from '../context/SongContext';
import styles from "../styles/styles.js";
>>>>>>> parent of b6bc4b9 (Revert "pushing async storage")

const Footer = () => {
    const navigation = useNavigation();
    const {playing} = useContext(SongContext);
    const {song} = useContext(SongContext);


    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <View flexDirection='row' justifyContent='center' style={{height: 80, borderTopWidth: 1, borderTopColor: '#dcdcdc'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Now Playing')}>
                <Text>Playback: {playing.toString()}</Text>
            </TouchableOpacity>
=======
=======
>>>>>>> parent of b6bc4b9 (Revert "pushing async storage")
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
<<<<<<< HEAD
>>>>>>> parent of 24c91f5 (footer changes)
=======
>>>>>>> parent of b6bc4b9 (Revert "pushing async storage")
        </View>
    )
}

export default Footer