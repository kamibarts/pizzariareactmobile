import { router } from "expo-router";
import { Alert, Image, Linking, Text, TouchableOpacity, View } from "react-native";
import api from "../_root/api";
import { useCart } from "../_root/CartContext";
import styles from "../_root/style";

export default function Carrinho() {
  const { items, clear, removeItem, changeQuantity } = useCart();

  function voltar() {
    // volta para o cardápio para permitir adicionar mais pizzas
    router.replace("./cardapio");
  }

  function getImageUrl(path: any) {
    if (!path) return null;
    const str = String(path);
    if (str.startsWith('http')) return str;
    if (str.startsWith('/')) return api.url + str;
    return api.url + '/' + str;
  }

  const delivery = 8;
  const subtotal = items.reduce((sum, it) => {
    const p = it.preco ? Number(it.preco) : 0;
    const q = it.quantity ? Number(it.quantity) : 1;
    const v = (isNaN(p) ? 0 : p) * (isNaN(q) ? 1 : q);
    return sum + v;
  }, 0);
  const total = subtotal + (items.length > 0 ? delivery : 0);

  function buildWhatsAppMessage() {
    if (items.length === 0) return '';
    let lines: string[] = [];
    lines.push('Olá, gostaria de fazer o pedido:');
    lines.push('');
    items.forEach((it, i) => {
      const q = it.quantity ? Number(it.quantity) : 1;
      const unit = it.preco ? Number(it.preco) : 0;
      const line = `${q} x ${it.nome} - R$ ${unit.toFixed(2)} cada = R$ ${(unit * q).toFixed(2)}`;
      lines.push(line);
    });
    lines.push('');
    lines.push(`Subtotal: R$ ${subtotal.toFixed(2)}`);
    lines.push(`Entrega: R$ ${items.length > 0 ? delivery.toFixed(2) : '0.00'}`);
    lines.push(`Total: R$ ${total.toFixed(2)}`);
    lines.push('');
    lines.push('Por favor, confirme o pedido. Obrigado!');
    return lines.join('\n');
  }

  async function openWhatsApp() {
    if (items.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione pelo menos uma pizza ao carrinho antes de finalizar.');
      return;
    }
    try {
      const phone = api.whatsapp; // expects international format without +
      const msg = buildWhatsAppMessage();
      const encoded = encodeURIComponent(msg);
      const url = `https://wa.me/${phone}?text=${encoded}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        // fallback try whatsapp://
        const alt = `whatsapp://send?text=${encoded}`;
        if (await Linking.canOpenURL(alt)) {
          await Linking.openURL(alt);
        } else {
          Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
        }
      }
    } catch (e) {
      console.error('Error opening WhatsApp:', e);
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
    }
  }

  return (
    <View
      style={styles.conteiner}
    >
      <Text style={styles.title}>Carrinho</Text>

      {items.length > 0 ? (
        <View style={{ width: '100%', paddingHorizontal: 10 }}>
          {items.map((it, idx) => (
            <View key={idx} style={styles.itemList}>
              {it.imagem ? (
                <Image
                  source={{ uri: getImageUrl(it.imagem) || undefined }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
              ) : null}
              <Text style={styles.text}>Nome: {it.nome}</Text>
              <Text style={styles.text}>Descrição: {it.descricao}</Text>
              <Text style={styles.text}>Preço unit: R$ {Number(it.preco || 0).toFixed(2)}</Text>
              <View style={styles.qtyContainer}>
                <TouchableOpacity style={styles.qtyButton} onPress={() => changeQuantity(idx, -1)}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{it.quantity ?? 1}</Text>
                <TouchableOpacity style={styles.qtyButton} onPress={() => changeQuantity(idx, 1)}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => removeItem(idx)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.text}>Carrinho vazio</Text>
      )}

      <View style={styles.totalsContainer}>
        <Text style={styles.deliveryText}>Entrega: R$ {items.length > 0 ? delivery.toFixed(2) : '0.00'}</Text>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        onPress={() => openWhatsApp() }
        style={styles.whatsappButton}
      >
        <Text style={styles.whatsappButtonText}>Finalizar pedido por WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => { voltar() }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}
