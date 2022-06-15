import { View, Text, TouchableOpacity } from 'react-native'
import Playback from './Playback'
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();

    return (
        <View flexDirection='row' justifyContent='center' style={{height: 80, borderTopWidth: 1, borderTopColor: '#dcdcdc'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Api')}>
                <Text>Playback</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer