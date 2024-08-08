import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DealsScreen from './screens/customer/DealsScreen';
import TicketScreen from './screens/store/TicketScreen';
import SettingsScreen from './screens/store/SettingsScreen';
import HoldingScreen from './screens/customer/HoldingScreen';
import AdDetailScreen from './screens/customer/AdDetailScreen';
import StoreAnalyticsScreen from './screens/store/StoreAnalyticsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Deals">
        <Stack.Screen name="Deals" component={DealsScreen} />
        <Stack.Screen name="Ticket" component={TicketScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Holding" component={HoldingScreen} />
        <Stack.Screen name="AdDetail" component={AdDetailScreen} />
        <Stack.Screen name="StoreAnalytics" component={StoreAnalyticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;