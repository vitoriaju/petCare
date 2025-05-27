import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListagemConsultas from './listagemConsultas';
import PacientesScreen from './listagemPaciente';
import { useFocusEffect } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

export default function ListagemScreen() {
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        try {
          const dataPacientes = await AsyncStorage.getItem('pacientes');
          if (dataPacientes) {
            setPacientes(JSON.parse(dataPacientes));
          }

          const dataConsultas = await AsyncStorage.getItem('consultas');
          if (dataConsultas) {
            setConsultas(JSON.parse(dataConsultas));
          }
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        }
      };

      carregarDados();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../assets/fundo.png')}
      style={[styles.background, { height: windowHeight }]}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Animais Cadastrados</Text>
       <PacientesScreen pacientes={pacientes} />


        <Text style={[styles.titulo, { marginTop: 30 }]}>Agenda de Consultas</Text>
        <ListagemConsultas consultas={consultas} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.8)', 
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
