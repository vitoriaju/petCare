import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Button, StyleSheet, ScrollView, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroPacienteScreen() {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [sexo, setSexo] = useState('');
  const [idade, setIdade] = useState('');
  const [pelagem, setPelagem] = useState('');
  const [nomeTutor, setNomeTutor] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const carregarPacientes = async () => {
      const data = await AsyncStorage.getItem('pacientes');
      if (data) setPacientes(JSON.parse(data));
    };
    carregarPacientes();
  }, []);

  const salvarPacientes = async (listaAtualizada) => {
    await AsyncStorage.setItem('pacientes', JSON.stringify(listaAtualizada));
  };

  const handleCadastro = async () => {
    if (!nome || !raca || !sexo || !idade || !pelagem || !nomeTutor || !endereco) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const novoPaciente = { nome, raca, sexo, idade, pelagem, nomeTutor, endereco };
    const listaAtualizada = [...pacientes, novoPaciente];

    setPacientes(listaAtualizada);
    await salvarPacientes(listaAtualizada);

    Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
    setNome('');
    setRaca('');
    setSexo('');
    setIdade('');
    setPelagem('');
    setNomeTutor('');
    setEndereco('');
  };

  const handleLimparPacientes = () => {
  Alert.alert(
    'Confirmar exclusão',
    'Deseja realmente apagar todos os pacientes e consultas?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim, apagar',
        onPress: async () => {
          await AsyncStorage.removeItem('pacientes');
          await AsyncStorage.removeItem('consultas');  // limpa também as consultas
          setPacientes([]);
          // se tiver estado para consultas, setConsultas([]) aqui também
          Alert.alert('Lista zerada', 'Todos os pacientes e consultas foram apagados.');
        }
      }
    ]
  );
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro de Paciente (Animal)</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Raça"
        value={raca}
        onChangeText={setRaca}
      />

      <TextInput
        style={styles.input}
        placeholder="Sexo"
        value={sexo}
        onChangeText={setSexo}
      />

      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Pelagem"
        value={pelagem}
        onChangeText={setPelagem}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome do Tutor"
        value={nomeTutor}
        onChangeText={setNomeTutor}
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      <Button title="Cadastrar Paciente" onPress={handleCadastro} />
      <View style={{ marginTop: 20 }}>
        <Button
          title="Limpar todos os pacientes"
          color="red"
          onPress={handleLimparPacientes}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
});
