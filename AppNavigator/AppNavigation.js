import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StateScreen from '../screens/StateScreen';
import DistrictScreen from '../screens/DistrictScreen';
import MunicipalityScreen from '../screens/MunicipalityScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="State" component={StateScreen} />
        <Stack.Screen name="District" component={DistrictScreen} />
        <Stack.Screen name="Municipality" component={MunicipalityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
