/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { db } from './src/constants';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import store from './src/store';
import MyTask from './src/screens/MyTask';
import { navigationRef } from './src/rootNavigation';
const stack = createStackNavigator()
const RootStack = () => {
  return (
    <stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <stack.Screen component={Home} name="Home" />
      <stack.Screen options={{
        ...TransitionPresets.FadeFromBottomAndroid
      }} component={MyTask} name="MyTask" />
    </stack.Navigator>
  )
}
const App = () => {

  useEffect(() => {
    // _setup()
  }, [])
  const _setup = () => {
    db.child('humidities').child(`${new Date().getTime()}`).set({
      date: new Date().toUTCString(),
      value: 77
    })
    db.child('temperatures').child(`${new Date().getTime()}`).set({
      date: new Date().toUTCString(),
      value: 30
    })
    db.child('mode').set(0)
    db.child('himidityLimit').set(70)
    db.child('temperatureLimit').set(35)
    db.child('turnOnPump').set(false)
    db.child('turnOnLED').set(false)
    db.child('pumpTimer').child(`${new Date().getTime()}`).set({
      from: `${new Date().getTime()}`,
      to: `${new Date().getTime()}`,
      loop: false,
      done: false,
      name: 'Turn on '
    })
  }
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
