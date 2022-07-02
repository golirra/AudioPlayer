import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Artists = () => {
    return (
        <View>
            <FlatList
                data={allMedia}
                keyExtractor={item => item.fileLocation}
                renderItem={({ item }) => (
                    <LibraryInfo mediaData={item} saveSong={saveSong} getIndex={getIndex}/>
                )}
            />
        </View>
    )
}

export default Artists