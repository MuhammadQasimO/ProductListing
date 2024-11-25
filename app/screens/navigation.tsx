import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MAIN_NAVIGATOR} from '@constants';
import ProductList from '@screens/productListing';

const MainStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={MAIN_NAVIGATOR.productList}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen
          name={MAIN_NAVIGATOR.productList}
          component={ProductList}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
