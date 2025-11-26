import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../_root/style";

export default function Index() {

  function irParaCarrinho() {
    router.replace("./telas/carrinho");
  }

  function irParaCardapio() {
    router.replace("./telas/cardapio");
  }

  function irParaReserva() {
    router.replace('./telas/reserva');
  }

  return (
    <View
      style={styles.conteiner}
    >
      <Image
        source={require("../../assets/forno.jpg")}
        style={styles.imgfundo}
      />
      <Text style={styles.subtitle}>Deixe seu dia mais saboroso!!!</Text>
      <Text style={styles.subtitle}>As melhores pizzas da cidade</Text>
      <TouchableOpacity
      
        onPress={() => { irParaCardapio() }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Cardapio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { irParaCarrinho() }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Carrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { irParaReserva() }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>FAÇA SUA RESERVA</Text>
      </TouchableOpacity>
    </View>
  );
}