import { StyleSheet, Text } from 'react-native';
import React from 'react';
import Home from './Home';
import ArrowLeft from './ArrowLeft';
import Mail from './Mail';
import Lock from './Lock';
import User from './User';
import Profile from './Profile';
import Heart from './Heart';
import Plus from './Plus';
import Calender from './Calender';
import Notif from './Notif';
import Logout from './Logout';

import { theme } from '../../constants/theme';

const icons = {
  home: Home,
  arrowLeft: ArrowLeft,
  mail: Mail,
  lock: Lock,
  user: User,
  profile: Profile,
  heart: Heart,
  plus: Plus,
  calender: Calender,
  notif: Notif,
  logout: Logout,
};

const Icon = ({ name, ...props }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.error(`Icon "${name}" not found. Check the name or icon mapping.`);
    return <Text style={{ color: theme.colors.error }}>Icon not found</Text>; // Fallback UI
  }

  return (
    <IconComponent
      height={props.size || 24}
      innerWidth={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={props.color || theme.colors.textLight}
      {...props}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({});
