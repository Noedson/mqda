import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Slider from '@react-native-community/slider';

const EnqueteTela = () => {
  const [valorSlide, setSliderValue] = useState(50);
  const [larguraSlider, setLarguraSlider] = useState(0); // Largura real do slider

  // Função para classificar o impacto
  const classificarImpacto = (valor) => {
    if (valor < 20) return 'Nenhum';
    else if (valor < 40) return 'Leve';
    else if (valor < 60) return 'Moderado';
    else if (valor < 80) return 'Considerado';
    else return 'Grave';
  };

  const tornarCorOpaca = (cor, opacidade = 0.25) => {
    // Converte a cor hexadecimal para RGBA
    let r = parseInt(cor.slice(1, 3), 16);
    let g = parseInt(cor.slice(3, 5), 16);
    let b = parseInt(cor.slice(5, 7), 16);

    // Retorna a cor RGBA com a opacidade definida
    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
};

  // Cores para cada classificação
  const obterCor = (classificacao) => ({
    'Nenhum': '#00AE3A',
    'Leve': '#8BE500',
    'Moderado': '#FFE000',
    'Considerado': '#FFB325',
    'Grave': '#FF431D'
  }[classificacao]);

  // Textos para cada classificação
  const textosClassificacao = {
    'Nenhum': 'Não há efeitos perceptíveis na saúde, segurança ou funcionamento dos equipamentos.',
    'Leve': 'A exposição está acima dos níveis seguros, mas os efeitos são temporários e discretos.',
    'Moderado': 'A concentração do produto químico começa a gerar efeitos mais perceptíveis e prejudiciais.',
    'Considerado': 'A concentração do produto químico representa um risco imediato e crítico à saúde e segurança.',
    'Grave': 'A concentração do produto químico representa um risco imediato e crítico à saúde e segurança.'
  };

  const classificacaoAtual = useMemo(() => classificarImpacto(Math.round(valorSlide)), [valorSlide]);
  const corAtual = useMemo(() => obterCor(classificacaoAtual), [classificacaoAtual]);

  // Posição do texto com base no valor do slider e na largura real
  const posicaoTexto = Math.max(
    0, // Limite esquerdo
    Math.min(
      (valorSlide / 100) * larguraSlider - 25, // Centraliza o texto
      larguraSlider - 50 // Limite direito (largura do contêiner - largura do texto)
    )
  );

  // Função para obter a largura real do slider
  const onLayoutSlider = (event) => {
    const { width } = event.nativeEvent.layout;
    setLarguraSlider(width);
  };

  return (
    <View style={estilo.container}>
      <Text style={estilo.title}>MQDA UNIFESSPA</Text>
      <Text style={estilo.greeting}>Olá</Text>
      <Text style={estilo.description}>
        Nos ajude a saber mais sobre você e registrar a sua opinião das consequências de cada gás,
        considerando as seguintes opções:
      </Text>

      {/* Exibir imagem correspondente */}
      <View style={estilo.carinhaContainer}>
        {classificacaoAtual === 'Grave' && (
          <Image source={require('./Imagens/IImagem-paia-com-raiva.png')} style={estilo.carinhaImage} />
        )}
        {classificacaoAtual === 'Considerado' && (
          <Image source={require('./Imagens/IImagem-paia-triste.png')} style={estilo.carinhaImage} />
        )}
        {classificacaoAtual === 'Moderado' && (
          <Image source={require('./Imagens/IImagem-paia-sem-expressao.png')} style={estilo.carinhaImage} />
        )}
        {classificacaoAtual === 'Leve' && (
          <Image source={require('./Imagens/IImagem-paia-marromeno.png')} style={estilo.carinhaImage} />
        )}
        {classificacaoAtual === 'Nenhum' && (
          <Image source={require('./Imagens/IImagem-paia-puta-de-alegre.png')} style={estilo.carinhaImage} />
        )}
      </View>

      {/* Barra deslizante */}
      <View style={estilo.sliderContainer} onLayout={onLayoutSlider}>
        <Slider
          style={estilo.slider}
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor={corAtual}
          maximumTrackTintColor="#e0e0e0"
          thumbTintColor={corAtual}
          step={1}
          // value={valorSlide} // Valor atual do slider
          onValueChange={(valor) => setSliderValue(valor)} // Atualiza o estado durante a interação
        />

        {/* Exibição da classificação atual */}
        <View style={estilo.classificacaoContainer}>
          <Text style={[estilo.classificacaoTexto, { color: corAtual, left: posicaoTexto }]}>
            {classificacaoAtual}
          </Text>
        </View>
      </View>

      {/* Texto de classificação com fundo dinâmico */}
      <View style={[estilo.textoClassificacaoContainer, { backgroundColor: tornarCorOpaca(corAtual, 0.40) }]}>
        <Text style={estilo.textoClassificacao}>
          {textosClassificacao[classificacaoAtual]}
        </Text>
      </View>

      {/* Botão Próximo Passo */}
      <TouchableOpacity
        style={[estilo.nextButton, valorSlide === 0 && estilo.disabledButton]}
        onPress={() => console.log('Próximo Passo:', Math.round(valorSlide))}
        disabled={valorSlide === 0}
      >
        <Text style={estilo.nextButtonText}>Próximo Passo</Text>
      </TouchableOpacity>
    </View>
  );
};

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0FFF8',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#0FA958',
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
  },
  sliderContainer: {
    marginBottom: 20,
    width: '100%', // Largura do contêiner do slider
  },
  slider: {
    width: '100%',
    height: 40,
  },
  classificacaoContainer: {
    marginTop: 15,
    alignItems: 'center',
    position: 'relative', // Permite posicionar o texto dinamicamente
  },
  classificacaoTexto: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    position: 'absolute', // Posiciona o texto absolutamente dentro do contêiner
    maxWidth: 100, // Limita a largura máxima do texto
    textAlign: 'center', // Centraliza o texto
  },
  textoClassificacaoContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10, // Bordas arredondadas
    height: 80
  },
  textoClassificacao: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000', // Texto branco para contrastar com o fundo
  },
  nextButton: {
    padding: 10,
    backgroundColor: '#0FA958',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b0b0b0',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  carinhaContainer: {
    alignItems: 'center',
  },
  carinhaImage: {
    width: 40,
    height: 40,
  },
});

export default EnqueteTela;