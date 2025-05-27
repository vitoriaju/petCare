// app/perfil.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PerfilScreen = ({ navigation }) => {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Button title="Deslogar" onPress={handleLogout} color="#FF3B30" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
});

export default PerfilScreen;
