import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import Icon from '../assets/icons';
import BackButton from '../components/BackButton';
import { wp, hp } from '../helpers/common';
import Input from '../components/Input';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

const Login = () => {
  const router = useRouter();
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'Please fill all the fields!');
      return;
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Login', error.message);
    }
  };

  return (
    <ScreenWrapper bg={theme.colors.dark}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <BackButton router={router} />
          <View>
            <Text style={styles.welcomeText}>Hey,</Text>
            <Text style={[styles.welcomeText, styles.sideText]}>Welcome Back</Text>
          </View>
          <View style={styles.form}>
            <Text style={{ fontSize: hp(1.5), color: 'white' }}>
              Please login to continue
            </Text>
            <Input
              icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
              placeholder="Enter your email"
              onChangeText={(value) => {
                emailRef.current = value;
              }}
            />
            <Input
             icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
             placeholder="Enter your password"
             secureTextEntry
             onChangeText={(value) => (passwordRef.current = value)}
            />
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
            <Button title="Login" loading={loading} onPress={onSubmit} />
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Pressable onPress={() => router.push('/signUp')}>
              <Text style={[styles.footerText, styles.signUpText]}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: wp(5),
    gap: 45,
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.extraBold,
    color: 'white',
  },
  sideText: {
    paddingTop: hp(1),
    paddingLeft: wp(2),
    color: theme.colors.primary,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  footerText: {
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  signUpText: {
    color: theme.colors.alternateBlue,
    fontWeight: theme.fonts.semibold,
    marginLeft: wp(1),
  },
});
