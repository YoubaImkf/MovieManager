import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
import { Ionicons } from '@expo/vector-icons';  //https://ionic.io/ionicons

import RegistrationScreen from './components/RegistrationScreen'; 
import MoviesListScreen from './components/MoviesListScreen'; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Registration') {
              iconName = focused
                ? 'create'
                : 'create-outline';
            } else if (route.name === 'MoviesList') {
              iconName = focused 
              ? 'menu' 
              : 'menu-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#7286D3',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Registration" component={RegistrationScreen} />
        <Tab.Screen name="MoviesList" component={MoviesListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}