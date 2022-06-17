import { View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { SongContext, SongProvider } from '../context/SongContext';

const Footer = () => {
    const navigation = useNavigation();
    const {playing} = useContext(SongContext);

    return (
        <View flexDirection='row' justifyContent='center' style={{height: 80, borderTopWidth: 1, borderTopColor: '#dcdcdc'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Api')}>
                <Text>Playback: {playing.toString()}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer