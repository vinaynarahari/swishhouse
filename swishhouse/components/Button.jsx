import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { wp, hp } from '../helpers/common';
import { theme } from '../constants/theme';
import Loading from './Loading';

const Button = ({
  buttonStyle,
  textStyle,
  title = '',
  onPress,
  loading = false,
  hasShadow = true,
}) => {
  const shadowStyle = {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
      }

  if(loading){
    <View style={[styles.button, buttonStyle, {backgroundColor: theme.colors.primaryDark}]}>
      <Loading />
    </View>
  }


  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, buttonStyle, shadowStyle]}
      disabled={loading}
    >
      <Text style={[styles.text, textStyle]}>{loading ? 'Loading...' : title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(6.6),
    justifyContent: 'center',
    borderRadius: theme.radius.xl,
  },
  text: {
    
    fontSize: hp(2.5),
    color: theme.colors.primaryDark,
    fontWeight: theme.fonts.bold,
    textAlign: 'center',
  },
});
