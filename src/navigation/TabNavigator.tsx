import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

// 🔹 tabBarIcon 컴포넌트 외부 정의
const HomeTabIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="home-outline" size={size} color={color} />
);

const HistoryTabIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="book-outline" size={size} color={color} />
);

const ChatTabIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="chatbubble-ellipses-outline" size={size} color={color} />
);

const ProfileTabIcon = ({color, size}: {color: string; size: number}) => (
  <Icon name="person-circle-outline" size={size} color={color} />
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#fff', height: 60},
        tabBarActiveTintColor: '#AEE2FF',
        headerShown: false,
      }}>
      <Tab.Screen
        name="홈"
        component={HomeScreen}
        options={{tabBarIcon: HomeTabIcon}}
      />
      <Tab.Screen
        name="히스토리"
        component={HistoryScreen}
        options={{tabBarIcon: HistoryTabIcon}}
      />
      <Tab.Screen
        name="대화"
        component={ChatListScreen}
        options={{tabBarIcon: ChatTabIcon}}
      />
      <Tab.Screen
        name="프로필"
        component={ProfileScreen}
        options={{tabBarIcon: ProfileTabIcon}}
      />
    </Tab.Navigator>
  );
}
