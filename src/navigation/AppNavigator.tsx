// src/navigation/AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import TabNavigator from './TabNavigator';

// 네비게이션에 사용할 라우트 이름과 파라미터 타입 정의
export type RootStackParamList = {
  로그인: undefined;
  회원가입: undefined;
  홈: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="로그인" component={LoginScreen} />
        <Stack.Screen name="회원가입" component={SignupScreen} />
        <Stack.Screen name="홈" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
