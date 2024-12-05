import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import { wp, hp } from '../helpers/common'
const BackButton = ({size = 26, router}) => {

  return (
    <Pressable onPress={()=> router.back()} style={styles.button}>
      <Icon name = "arrowLeft" strokeWidth={2.5} size={size} color={theme.colors.primary} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button:{
        alignSelf: 'flex-start',
        padding: 5,
        borderRadius: theme.radius.xl,
        backgroundColor: theme.colors.darkLight,
       
    }
})