// src/screens/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../theme/colors';
import {signInWithEmail} from '../lib/auth';
import {useUserStore} from '../store/useUserStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useUserStore(state => state.setUser);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    try {
      const {session, user} = await signInWithEmail(email, password);
      if (user) {
        setUser({id: user.id, email: user.email ?? ''});
        navigation.navigate('홈'); // 로그인 성공 시 홈으로 이동
      }
    } catch (err: any) {
      Alert.alert('로그인 실패', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>밍톡에 오신 걸 환영합니다</Text>

      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('회원가입')}
        style={styles.signupButton}>
        <Text style={styles.signupText}>계정이 없으신가요? 회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupButton: {
    alignItems: 'center',
  },
  signupText: {
    color: colors.text,
    textDecorationLine: 'underline',
  },
});
