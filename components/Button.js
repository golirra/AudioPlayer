import { View, Text, TouchableOpacity} from 'react-native'
import { Icon } from '@rneui/themed'
import styles from "../styles/styles"

const Button = ({name, icon, onPress}) => {

    return (
        <TouchableOpacity style={styles.buttonBackground} onPress={onPress}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon type='feather' name={icon}/>
                    <Text style={styles.text}>
                        {name}
                    </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Button