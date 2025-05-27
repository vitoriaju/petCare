// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PacientesStackNavigator from '../PacientesStackNavigator';
import CadastroStackNavigator from '../CadastroStackNavigator'; // importa stack
import PerfilScreen from '../perfilUsuario';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Pacientes') {
            iconName = 'list';
          } else if (route.name === 'Cadastrar') {
            iconName = 'person-add';
          } else if (route.name === 'Perfil') {
            iconName = 'person-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Cadastrar" component={CadastroStackNavigator} />
      <Tab.Screen name="Pacientes" component={PacientesStackNavigator} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      
    </Tab.Navigator>
  );
};

export default TabNavigator;
