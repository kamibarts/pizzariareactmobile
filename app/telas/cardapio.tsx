import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import api from "../_root/api";
import styles from "../_root/style";

export default function Cardapio() {

  const [pizzas, setPizzas] = useState([{ nome: null }]);

  useEffect(() => {
    fetchPizzas();
  }, []);

  async function fetchPizzas() {
    try {
      const response = await fetch(api.url + api.pizzas);
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  }

  function voltar() {
    router.replace("../telas");
  }
  return (
    <View
      style={styles.conteiner}
    >
      <Text style={styles.title}>Cardapio</Text>
      <FlatList
        style={styles.list}
        data={pizzas}
        renderItem={({ item }) => (<View style={styles.itemList}>
          <Text style={styles.text}>Nome:{item.nome} </Text>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Comprar</Text>
          </TouchableOpacity>
        </View>)}
      />
      <TouchableOpacity
        onPress={() => { voltar() }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}