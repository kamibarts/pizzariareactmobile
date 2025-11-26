import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../_root/AuthContext";
import { usePizza } from "../_root/PizzaContext";
import styles from "../_root/style";

export default function EditPizza() {
  const params = useLocalSearchParams();
  const nomeParam = params.nome ? String(params.nome) : '';
  const { pizzas, updatePizza } = usePizza();
  const { user } = useAuth();
  const [pizza, setPizza] = useState<any | null>(null);

  useEffect(() => {
    const found = pizzas.find(p => p.nome === nomeParam);
    if (found) setPizza({ ...found });
  }, [pizzas, nomeParam]);

  if (!user || user.role !== 'manager') {
    return (
      <View style={styles.conteiner}>
        <Text style={styles.title}>Acesso negado</Text>
        <Text style={styles.text}>Você não tem permissão para editar pizzas.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!pizza) {
    return (
      <View style={styles.conteiner}>
        <Text style={styles.title}>Pizza não encontrada</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function salvar() {
    // basic validation
    if (!pizza.nome || !pizza.descricao) {
      Alert.alert('Atenção', 'Nome e descrição são obrigatórios.');
      return;
    }
    pizza.preco = Number(pizza.preco) || 0;
    await updatePizza(nomeParam || null, pizza);
    Alert.alert('Salvo', 'Pizza atualizada.');
    router.back();
  }

  return (
    <ScrollView contentContainerStyle={[styles.conteiner, { padding: 16 }] }>
      <Text style={styles.title}>Editar Pizza</Text>

      <Text style={[styles.text, { alignSelf: 'flex-start', marginTop: 12 }]}>Nome</Text>
      <TextInput value={pizza.nome ?? ''} onChangeText={(t) => setPizza({ ...pizza, nome: t })} style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6, width: '100%' }} />

      <Text style={[styles.text, { alignSelf: 'flex-start', marginTop: 12 }]}>Descrição</Text>
      <TextInput value={pizza.descricao ?? ''} onChangeText={(t) => setPizza({ ...pizza, descricao: t })} style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6, width: '100%' }} />

      <Text style={[styles.text, { alignSelf: 'flex-start', marginTop: 12 }]}>Preço</Text>
      <TextInput value={String(pizza.preco ?? '')} onChangeText={(t) => setPizza({ ...pizza, preco: t })} keyboardType="numeric" style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6, width: '100%' }} />

      <Text style={[styles.text, { alignSelf: 'flex-start', marginTop: 12 }]}>Imagem (URL ou caminho)</Text>
      <TextInput value={pizza.imagem ?? ''} onChangeText={(t) => setPizza({ ...pizza, imagem: t })} style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6, width: '100%' }} />

      <TouchableOpacity onPress={salvar} style={[styles.button, { marginTop: 16 }]}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={[styles.button, { marginTop: 8 }]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
