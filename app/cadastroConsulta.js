import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function CadastroConsultaScreen({ navigation }) {
  const [dataConsulta, setDataConsulta] = useState('');
  const [horaConsulta, setHoraConsulta] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState('');

  // Carrega a lista de pacientes ao montar o componente
  useEffect(() => {
    const carregarPacientes = async () => {
      try {
        const data = await AsyncStorage.getItem('pacientes');
        if (data) {
          setPacientes(JSON.parse(data));
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os pacientes');
      }
    };

    carregarPacientes();
  }, []);

  const salvarConsultas = async (listaAtualizada) => {
    await AsyncStorage.setItem('consultas', JSON.stringify(listaAtualizada));
  };

const handleAgendar = async () => {
  if (!dataConsulta || !horaConsulta || !pacienteSelecionado) {
    Alert.alert('Erro', 'Preencha todos os campos!');
    return;
  }

  const pacienteObj = pacientes.find(p => p.nome === pacienteSelecionado);

  const novaConsulta = {
    paciente: pacienteObj ? pacienteObj.nome : pacienteSelecionado,
    data: dataConsulta,
    hora: horaConsulta,
  };

  try {
    const consultasSalvasJSON = await AsyncStorage.getItem('consultas');
    const consultasSalvas = consultasSalvasJSON ? JSON.parse(consultasSalvasJSON) : [];

    const listaAtualizada = [...consultasSalvas, novaConsulta];
    await salvarConsultas(listaAtualizada);

    Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
    setDataConsulta('');
    setHoraConsulta('');
    setPacienteSelecionado('');
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível salvar a consulta');
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Agendar Consulta</Text>

      <Text style={styles.label}>Selecione o Paciente:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={pacienteSelecionado}
          onValueChange={(itemValue) => setPacienteSelecionado(itemValue)}
        >
          <Picker.Item label="Selecione um paciente" value="" />
          {pacientes.map((paciente, index) => (
            <Picker.Item key={index} label={paciente.nome} value={paciente.nome} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Data da Consulta (ex: 2025-05-27)"
        value={dataConsulta}
        onChangeText={setDataConsulta}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora da Consulta (ex: 14:30)"
        value={horaConsulta}
        onChangeText={setHoraConsulta}
      />

      <Button title="Agendar Consulta" onPress={handleAgendar} />
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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
});
