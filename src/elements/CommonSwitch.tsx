import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Switch } from 'react-native-paper'
import theme from '../config/theme'

const CommonSwitch = ({value, setValue, text, containerStyle, switchStyle, switchColor=theme.colors.blue}: any) => {
  return (
    <View style={[styles.container, containerStyle]}>
       <Switch color={switchColor} style={[styles.switchStyle, switchStyle]} value={value} onValueChange={setValue} />
       <Text style={[styles.textStyle]}>{text}</Text>
    </View>

  )
}


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    switchStyle: {
        transform: [{ scaleX: .7 }, { scaleY: .7 }]
    },
    textStyle: {
        color: theme.colors.blue,
        fontSize: 17
    }
  });
  
export default CommonSwitch