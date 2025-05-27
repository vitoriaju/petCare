import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ListagemConsultasScreen() {
  const [consultas, setConsultas] = useState([]);
  const isFocused = useIsFocused();

  // Recarrega as consultas do AsyncStorage sempre que a tela estiver focada
  useEffect(() => {
    const carregarConsultas = async () => {
      try {
        const json = await AsyncStorage.getItem('consultas');
        if (json) {
          setConsultas(JSON.parse(json));
        } else {
          setConsultas([]);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as consultas');
      }
    };

    if (isFocused) {
      carregarConsultas();
    }
  }, [isFocused]);


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.paciente}>Paciente: {item.paciente}</Text>
      <Text>Data: {item.data}</Text>
      <Text>Horário: {item.hora}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {consultas.length === 0 ? (
        <Text style={styles.vazio}>Nenhuma consulta agendada.</Text>
      ) : (
        <FlatList
          data={consultas}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={consultas.length === 0 ? styles.emptyList : styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  lista: {
    paddingTop: 20,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#e6f7ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  paciente: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
