import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [cor, setCor] = useState('');
  const [erro, setErro] = useState('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    if (!pesoNum || !alturaNum || alturaNum <= 0) {
      setErro('Por favor, insira valores válidos para peso e altura.');
      setImc(null);
      setClassificacao('');
      setCor('');
      return;
    }

    setErro('');
    const resultado = pesoNum / (alturaNum * alturaNum);
    setImc(resultado.toFixed(2));

    // Função de classificação com base na tabela OMS
    if (resultado < 18.5) {
      setClassificacao('Abaixo do Peso');
      setCor('#F4A460'); // Laranja claro
    } else if (resultado >= 18.5 && resultado < 25) {
      setClassificacao('Peso Normal');
      setCor('#2ECC71'); // Verde
    } else if (resultado >= 25 && resultado < 30) {
      setClassificacao('Sobrepeso');
      setCor('#FFD700'); // Amarelo escuro
    } else if (resultado >= 30 && resultado < 35) {
      setClassificacao('Obesidade Grau I');
      setCor('#FF8C00'); // Laranja / Vermelho claro
    } else if (resultado >= 35 && resultado < 40) {
      setClassificacao('Obesidade Grau II (Severa)');
      setCor('#FF4500'); // Vermelho
    } else {
      setClassificacao('Obesidade Grau III (Mórbida)');
      setCor('#8B0000'); // Vermelho escuro
    }
  };

  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    setCor('');
    setErro('');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>💪 Calculadora de IMC</Text>
        <Text style={styles.subtitulo}>Baseada na Tabela da OMS (Adultos ≥ 18 anos)</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite sua altura (m)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity style={styles.botao} onPress={calcularIMC}>
          <Text style={styles.textoBotao}>Calcular IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoLimpar]} onPress={limparCampos}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>

        {imc && (
          <View style={styles.resultadoContainer}>
            <Text style={styles.resultado}>Seu IMC: {imc}</Text>
            <Text style={[styles.classificacao, { color: cor }]}>{classificacao}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  botao: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  botaoLimpar: {
    backgroundColor: '#6c757d',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultadoContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultado: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  classificacao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  erro: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});