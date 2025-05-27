import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PacientesScreen = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Recarrega a lista toda vez que a tela ficar ativa/focada
  useEffect(() => {
    const carregarPacientes = async () => {
      try {
        const data = await AsyncStorage.getItem('pacientes');
        if (data) {
          setPacientes(JSON.parse(data));
        } else {
          setPacientes([]);
        }
      } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
      }
    };

    if (isFocused) {
      carregarPacientes();
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.tutor}>Tutor: {item.nomeTutor}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PacienteDetalhes', { paciente: item })}
        >
          <Icon name="eye" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {pacientes.length === 0 ? (
        <Text style={styles.vazio}>Nenhum paciente cadastrado.</Text>
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listaHorizontal}
        />
      )}
    </View>
  );
};

export default PacientesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
  listaHorizontal: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginRight: 12,
    width: 250,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tutor: {
    fontSize: 14,
    color: '#555',
  },
});
