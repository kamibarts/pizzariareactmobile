import React from 'react';
import { Platform, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

export const API_URL = "https://api-pizzas-seu-ze.vercel.app/"; // 👈 Aqui


export default function Index() {
  const siteUrl = 'https://willianpiedade08.github.io/pizzaria-frontend/';

  // Aqui você pode usar o API_URL se precisar fazer fetch ou axios futuramente
  console.log("Conectado ao backend:", API_URL);

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <iframe
          src={siteUrl}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="App Web Preview"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: siteUrl }}
        style={{ flex: 1 }}
        startInLoadingState={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});