import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import api from "../_root/api";
import styles from "../_root/style";

export default function Reserva() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [quantidade, setQuantidade] = useState("1");
  const [observacao, setObservacao] = useState("");
  const [confirmed, setConfirmed] = useState<any | null>(null);

  function validarEmail(e: string) {
    return /\S+@\S+\.\S+/.test(e);
  }

  function enviar() {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Digite seu nome.");
      return;
    }
    if (!email.trim() || !validarEmail(email)) {
      Alert.alert("Atenção", "Informe um e-mail válido.");
      return;
    }
    if (!celular.trim()) {
      Alert.alert("Atenção", "Informe um número de celular.");
      return;
    }
    const qnum = Number(quantidade);
    if (isNaN(qnum) || qnum <= 0) {
      Alert.alert("Atenção", "Informe a quantidade de pessoas.");
      return;
    }

    const reservation = {
      nome,
      email,
      celular,
      pessoas: qnum,
      observacao,
    };
    setConfirmed(reservation);
    // show a small alert too
    Alert.alert("Reserva concluída", "Sua reserva foi registrada. Você pode compartilhar por WhatsApp ou salvar o lembrete.");
  }

  function buildWhatsAppMessageForReservation(res: any) {
    const lines: string[] = [];
    lines.push('Olá, tenho uma nova reserva:');
    lines.push('');
    lines.push(`Nome: ${res.nome}`);
    lines.push(`Email: ${res.email}`);
    lines.push(`Celular: ${res.celular}`);
    lines.push(`Pessoas: ${res.pessoas}`);
    if (res.observacao) {
      lines.push('Observação: ' + res.observacao);
    }
    lines.push('');
    lines.push('Por favor, confirme a reserva. Obrigado!');
    return lines.join('\n');
  }

  async function openWhatsAppForReservation(res: any) {
    try {
      const phone = api.whatsapp;
      const msg = buildWhatsAppMessageForReservation(res);
      const encoded = encodeURIComponent(msg);
      const url = `https://wa.me/${phone}?text=${encoded}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
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
    <ScrollView contentContainerStyle={[styles.conteiner, { padding: 16 }] }>
      <Text style={styles.title}>Reservar Mesa</Text>

      <View style={{ width: '100%', marginTop: 12 }}>
        <Text style={styles.text}>Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
          style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6 }}
        />

        <Text style={[styles.text, { marginTop: 12 }]}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="seu@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6 }}
        />

        <Text style={[styles.text, { marginTop: 12 }]}>Celular</Text>
        <TextInput
          value={celular}
          onChangeText={setCelular}
          placeholder="(99) 99999-9999"
          keyboardType="phone-pad"
          style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6 }}
        />

        <Text style={[styles.text, { marginTop: 12 }]}>Quantidade de Pessoas</Text>
        <TextInput
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder="1"
          keyboardType="numeric"
          style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6 }}
        />

        <Text style={[styles.text, { marginTop: 12 }]}>Observação</Text>
        <TextInput
          value={observacao}
          onChangeText={setObservacao}
          placeholder="Ex: Mesa perto da janela"
          multiline
          numberOfLines={4}
          style={{ backgroundColor: '#fff', padding: 8, borderRadius: 6, marginTop: 6, height: 100, textAlignVertical: 'top' }}
        />

        <TouchableOpacity onPress={enviar} style={[styles.button, { marginTop: 16 }] }>
          <Text style={styles.buttonText}>Confirmar Reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('../telas')} style={[styles.button, { marginTop: 8 }] }>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        {confirmed && (
          <View style={[styles.itemList, { marginTop: 16, width: '100%' }]}>
            <Text style={styles.title}>Lembrete de Reserva</Text>
            <Text style={styles.text}>Nome: {confirmed.nome}</Text>
            <Text style={styles.text}>Email: {confirmed.email}</Text>
            <Text style={styles.text}>Celular: {confirmed.celular}</Text>
            <Text style={styles.text}>Pessoas: {confirmed.pessoas}</Text>
            {confirmed.observacao ? <Text style={styles.text}>Obs: {confirmed.observacao}</Text> : null}

            <TouchableOpacity style={[styles.whatsappButton, { marginTop: 12 }]} onPress={() => openWhatsAppForReservation(confirmed)}>
              <Text style={styles.whatsappButtonText}>Compartilhar por WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { marginTop: 8 }]} onPress={() => { setConfirmed(null); router.replace('../telas'); }}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
