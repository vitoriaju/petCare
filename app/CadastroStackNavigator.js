// CadastroStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CadastroHomeScreen from './cadastroHome';
import CadastroPacienteScreen from './cadastroPaciente';
import CadastroConsultaScreen from './cadastroConsulta';

const Stack = createNativeStackNavigator();

export default function CadastroStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="CadastroHome"
        component={CadastroHomeScreen}
        options={{ title: 'Cadastro' }}
      />
      <Stack.Screen
        name="CadastroPaciente"
        component={CadastroPacienteScreen}
        options={{ title: 'Cadastrar Paciente' }}
      />
      <Stack.Screen
        name="CadastroConsulta"
        component={CadastroConsultaScreen}
        options={{ title: 'Agendar Consulta' }}
      />
    </Stack.Navigator>
  );
}
