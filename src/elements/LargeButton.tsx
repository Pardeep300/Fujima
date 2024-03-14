import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const LargeButton = ({onPress, title, style}: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#883333',
    paddingHorizontal: 20,
    paddingVertical:15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
});

export default LargeButton;
