import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { wp, hp } from '../helpers/common'
import { theme } from '../constants/theme'

const Input = (props) => {
  return (
    <View style={[styles.container, props.containerStyles]}>
      {props.icon && props.icon}
      <TextInput
        style={{ flex: 1 , color:'white'}}
        placeholderTextColor='white'
        ref={props.inputRef}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(7.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.4,
    borderColor: theme.colors.primary,
    borderRadius: theme.colors.xxl,
    borderCurve: 'continuous',
    paddingHorizontal: 18,
    gap: 12,
  },
});
