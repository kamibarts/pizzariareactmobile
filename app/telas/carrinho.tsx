import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../_root/style";

export default function Carrinho() {
  function voltar() {
    router.replace("../telas");
  }
  return (
    <View
      style={styles.conteiner}
    >
      <Text style={styles.title}>Carrinho</Text>
      <TouchableOpacity
        onPress={() => { voltar() }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}