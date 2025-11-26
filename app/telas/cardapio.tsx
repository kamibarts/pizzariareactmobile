import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import api from "../_root/api";
import { useAuth } from "../_root/AuthContext";
import { useCart } from "../_root/CartContext";
import { usePizza } from "../_root/PizzaContext";
import styles from "../_root/style";

export default function Cardapio() {

  const { pizzas, loading } = usePizza();
  const { user } = useAuth();

  function getImageUrl(path: any) {
    if (!path) return null;
    const str = String(path);
    if (str.startsWith('http')) return str;
    if (str.startsWith('/')) return api.url + str;
    return api.url + '/' + str;
  }

  const { addItem } = useCart();

  function voltar() {
    router.replace("../telas");
  }
  return (
    <View
      style={styles.conteiner}
    >
      <Text style={styles.title}>Cardapio</Text>
      {loading ? <Text style={styles.text}>Carregando pizzas...</Text> : (
      <FlatList
        style={styles.list}
        data={pizzas}
        renderItem={({ item }) => (<View style={styles.itemList}>
         
          {item.imagem ? (
            <Image
              source={{ uri: getImageUrl(item.imagem) || undefined }}
              style={styles.itemImage}
              resizeMode="cover"
            />
          ) : null}

          <Text style={styles.itemFieldBold}>Nome: {item.nome}</Text>
          <Text style={styles.itemFieldBold}>Descrição: {item.descricao}</Text>
          <Text style={styles.itemFieldBold}>Preço: R$ {item.preco}</Text>
       

          
          <TouchableOpacity
            onPress={() => {
              try {
                addItem({
                  nome: item.nome,
                  descricao: item.descricao,
                  preco: item.preco,
                  imagem: item.imagem,
                });
                router.push(`./carrinho`);
              } catch (e) {
                console.error('Error adding to carrinho:', e);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Comprar</Text>
          </TouchableOpacity>

          {user?.role === 'manager' ? (
            <TouchableOpacity
              onPress={() => {
                const name = encodeURIComponent(String(item.nome || ''));
                router.push(`/telas/editPizza?nome=${name}`);
              }}
              style={[styles.button, { backgroundColor: '#FFA000', marginTop: 8 }]}
            >
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          ) : null}
          
    

        </View>)}
        />
      )}
      <TouchableOpacity
        onPress={() => { voltar() }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}