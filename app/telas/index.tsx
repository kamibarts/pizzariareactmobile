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

  return (
    <View
      style={styles.conteiner}
    >
      <Image
        source={require("../../assets/forno.jpg")}
        style={styles.imgfundo}
      />
      <Text style={styles.title}>Home</Text>
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
    </View>
  );
}