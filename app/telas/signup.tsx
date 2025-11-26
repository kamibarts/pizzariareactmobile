import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../_root/AuthContext";
import styles from "../_root/style";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();

  async function entrar() {
    const ok = await login(username.trim(), password);
    if (ok) {
      // Delay slightly to allow context to update
      setTimeout(() => {
        if (user?.role === 'manager') {
          router.replace('/telas/cardapio');
        } else {
          router.replace('/telas/home');
        }
      }, 100);
    }
  }

  function voltar() {
    router.replace('/');
  }

  return (
    <View style={styles.conteiner}>
      <Text style={styles.title}>Login</Text>

      <Text style={[styles.text, { alignSelf: 'flex-start', marginTop: 12 }]}>Usuário</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Usuário"
        style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6, width: '100%' }}
        autoCapitalize="none"
      />

      <Text style={[styles.text, { alignSelf: 'flex-start', marginTop: 12 }]}>Senha</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6, width: '100%' }}
      />

      <TouchableOpacity onPress={entrar} style={[styles.button, { marginTop: 16 }] }>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/telas/signup')} style={[styles.button, { marginTop: 8 }]}>
        <Text style={styles.buttonText}>Criar usuário</Text>
      </TouchableOpacity>

      

      <TouchableOpacity onPress={voltar} style={[styles.button, { marginTop: 8 }]}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
