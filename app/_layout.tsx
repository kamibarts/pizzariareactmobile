import { router, Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import styles from "./_root/style";

export default function RootLayout() {
  function sair() {
    router.replace("/");
  }
  return <Stack>
    <Stack.Screen name="index" options={{ title: "Tela de Login" }} />
    <Stack.Screen name="telas" options={{
      title: "Pizzaria do Seu Zé", headerRight: () => (<TouchableOpacity
        style={styles.button}
        onPress={() => sair()}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>)
    }} />
  </Stack>;
}
