import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListagemScreen from './ListagemScreen';
import PacienteDetalhes from './PacienteDetalhes';

const Stack = createNativeStackNavigator();

export default function PacientesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListagemPacientes" 
        component={ListagemScreen} 
        options={{ title: 'Pacientes' }} 
      />
      <Stack.Screen 
        name="PacienteDetalhes" 
        component={PacienteDetalhes} 
        options={{ title: 'Detalhes do Paciente' }} 
      />
    </Stack.Navigator>
  );
}
