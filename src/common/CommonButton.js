import { View, Text , TouchableOpacity} from 'react-native'
import React from 'react'

const CommonButton = ({onPress, title, bgColor, textColor, disabled}) => {
  return (
    <View>
      <TouchableOpacity 
        disabled={disabled}
        style={{
            backgroundColor: bgColor,
            justifyContent: 'center',
            alignItems: 'center',
            width:'85%',
            height:46,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 50,
            marginBottom: 20,
        }} onPress={() => {
            onPress();
        }}>
            <Text style={{
                color: textColor
            }}>{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CommonButton