// cadastroHome.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function CadastroHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Cadastrar Paciente"
        onPress={() => navigation.navigate('CadastroPaciente')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Agendar Consulta"
        onPress={() => navigation.navigate('CadastroConsulta')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
});
