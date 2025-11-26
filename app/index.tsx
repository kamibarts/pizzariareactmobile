import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./_root/style";

export default function Index() {

  function login() {
    router.push('/telas/login');
  }

  return (
    <View
      style={styles.conteiner}
    >
      <Image
        source={require("../assets/forno.jpg")}
        style={styles.imgfundo}
      />
      <Text style={styles.title}>Pizzaria do seu Zé</Text>
      <TouchableOpacity
        onPress={() => { login() }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
