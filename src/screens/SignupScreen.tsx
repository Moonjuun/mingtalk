import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Picker} from '@react-native-picker/picker';
import {colors} from '../theme/colors';

import {useUserStore} from '../store/useUserStore';
import {createUserProfile} from '../lib/user';
import {signUpWithEmail} from '../lib/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

const SignupScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<'남' | '여' | ''>('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [location, setLocation] = useState('');
  const [checkingNickname, setCheckingNickname] = useState(false);

  const setUser = useUserStore(state => state.setUser);

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => `${currentYear - i}`);
  const months = Array.from({length: 12}, (_, i) =>
    `${i + 1}`.padStart(2, '0'),
  );
  const days = Array.from({length: 31}, (_, i) => `${i + 1}`.padStart(2, '0'));

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
    }

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      },
      error => {
        console.error('위치 가져오기 오류:', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    const birth = `${birthYear}-${birthMonth}-${birthDay}`;

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !nickname ||
      !gender ||
      !birthYear ||
      !birthMonth ||
      !birthDay
    ) {
      Alert.alert('모든 항목을 입력해주세요.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('이메일 형식 오류', '올바른 이메일을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('비밀번호 불일치', '비밀번호가 서로 다릅니다.');
      return;
    }

    try {
      console.log('[DEBUG] supabase.auth.signUp 시작');
      const {user} = await signUpWithEmail(email, password);
      if (!user) throw new Error('회원가입 실패');

      console.log('[DEBUG] createUserProfile 호출');
      await createUserProfile({
        id: user.id,
        email,
        nickname,
        gender,
        birth,
        location,
      });

      setUser({
        id: user.id,
        email: user.email ?? '',
        nickname,
        gender,
        location,
      });

      Alert.alert('회원가입 완료', '이제 서비스를 이용할 수 있어요!', [
        {
          text: '확인',
          onPress: () => navigation.navigate('로그인'),
        },
      ]);
    } catch (error: any) {
      console.log('[ERROR] 회원가입 중 오류:', error); // ✅ 오류 출력
      Alert.alert('오류', error.message ?? '알 수 없는 오류 발생');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={text => setEmail(text.trim())}
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
      <TextInput
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="닉네임"
        value={nickname}
        onChangeText={setNickname}
        style={styles.input}
      />

      {/* 성별 라디오 버튼 */}
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setGender('남')}>
          <View style={[styles.circle, gender === '남' && styles.selected]} />
          <Text style={styles.radioLabel}>남</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setGender('여')}>
          <View style={[styles.circle, gender === '여' && styles.selected]} />
          <Text style={styles.radioLabel}>여</Text>
        </TouchableOpacity>
      </View>

      {/* 생년월일 Picker */}
      <View style={styles.birthPickerRow}>
        <Picker
          selectedValue={birthYear}
          style={styles.picker}
          onValueChange={setBirthYear}>
          <Picker.Item label="년도" value="" />
          {years.map(year => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
        <Picker
          selectedValue={birthMonth}
          style={styles.picker}
          onValueChange={setBirthMonth}>
          <Picker.Item label="월" value="" />
          {months.map(month => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={birthDay}
          style={styles.picker}
          onValueChange={setBirthDay}>
          <Picker.Item label="일" value="" />
          {days.map(day => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSignup}
        disabled={checkingNickname}>
        <Text style={styles.submitText}>가입하기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.text,
    marginRight: 8,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  radioLabel: {
    fontSize: 16,
    color: colors.text,
  },
  birthPickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: colors.card,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
