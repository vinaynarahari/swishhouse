import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Pressable } from 'react-native'; 
import ScreenWrapper from '../components/ScreenWrapper';
import { wp, hp } from '../helpers/common'; 
import { theme } from '../constants/theme';
import Button from '../components/Button'; 
import { useRouter } from 'expo-router';

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper bg={theme.colors.primaryDark}>
      <StatusBar barStyle="dark-content" /> 
      <View style={styles.container}> 
        <Image
          style={styles.welcomeImage} 
          source={require('../assets/images/swishhouselogo.png')} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.punchline}>
            Healthier and Happier through Basketball 🏀
          </Text>
        </View>

    {/* Footer*/}
        <View style={styles.footer}>
          <Button 
            title="Get Started" 
            buttonStyle={styles.fullWidthButton}
            onPress={() => router.push('signUp')}
          />

          <View style = {styles.bottomTextContainer}>
            <Text style = {styles.loginText}>
              Already have an account?
            </Text>

            <Pressable onPress= {()=> router.push('login')}>
              <Text style = {[styles.loginText, {color: theme.colors.blue2, fontWeight: theme.fonts.semibold}]}>
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingTop: hp(8), 
    paddingBottom: hp(8),
  },
  welcomeImage: {
    width: wp(120),
    height: wp(120), 
    resizeMode: 'contain', 
    marginBottom: hp(2),
    marginTop: -hp(10),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -hp(20),
  },
  punchline: {
    textAlign: 'center',
    fontSize: hp(2.5),
    color: theme.colors.text,
    width: wp(80), 
    fontWeight: theme.fonts.extraBold,
  },
  footer: {
    width: '100%', 
    paddingHorizontal: wp(4), 
  },
  bottomTextContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingTop: hp(5),
    
  },
  loginText:{
    textAlign: 'center',
    color: 'white',
    fontSize: hp(2),

  }
  
});
