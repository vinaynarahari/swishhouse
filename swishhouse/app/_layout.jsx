import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/cartContext';  
import { supabase } from '../lib/supabase';
import { getUserData } from '../services/userService';

const _layout = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </AuthProvider>
  );
};

const MainLayout = () => {
  const router = useRouter();
  const { setAuth, setUserData } = useAuth();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user);
      
      if (session) {
        setAuth(session?.user);
        updateUserData(session?.user);
        router.replace('/home');
      } else {
        setAuth(null);
        router.replace('/welcome');
      }
    });

    
    return () => {
      authListener?.unsubscribe();
    };
  }, []); 

  const updateUserData = async (user) => {
    let response = await getUserData(user?.id);
    if (response.success) {
      setUserData(response.data);
    }
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
};

export default _layout;
