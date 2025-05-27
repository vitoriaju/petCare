import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PacienteDetalhes({ route }) {
  const { paciente } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Paciente</Text>
      
      <Text style={styles.label}>
        Nome: <Text style={styles.valor}>{paciente.nome}</Text>
      </Text>
      <Text style={styles.label}>
        Raça: <Text style={styles.valor}>{paciente.raca}</Text>
      </Text>
      <Text style={styles.label}>
        Sexo: <Text style={styles.valor}>{paciente.sexo}</Text>
      </Text>
      <Text style={styles.label}>
        Idade: <Text style={styles.valor}>{paciente.idade}</Text>
      </Text>
      <Text style={styles.label}>
        Pelagem: <Text style={styles.valor}>{paciente.pelagem}</Text>
      </Text>
      
      <Text style={styles.label}>
        Tutor: <Text style={styles.valor}>{paciente.nomeTutor}</Text>
      </Text>
      <Text style={styles.label}>
        Endereço: <Text style={styles.valor}>{paciente.endereco}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
  },
  valor: {
    fontWeight: 'normal',
  },
});
