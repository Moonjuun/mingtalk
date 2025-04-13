// App.tsx
import 'react-native-url-polyfill/auto';
import React, {useEffect, useState} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {supabase} from './src/lib/supabase';
import {useUserStore} from './src/store/useUserStore';
import SplashScreen from './src/screens/SplashScreen';

function App() {
  const {session, setSession} = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setLoading(false); // ✅ 여기 추가

    const {data: subscription} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return loading ? <SplashScreen /> : <AppNavigator />;
}

export default App;
