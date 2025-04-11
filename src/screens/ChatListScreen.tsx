import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ChatListScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>대화 목록 화면</Text>
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F9FC',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
