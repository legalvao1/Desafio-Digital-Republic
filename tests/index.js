const sinon = require('sinon');
const { expect } = require('chai');

const { paredes, verificaAlturaParede, areaASerPintada } = require('../src/models/modelIndex');

const correctDataExmple = {
  altura1: '8',
  largura1: '1',
  porta1: '1',
  janela1: '0',
  altura2: '8',
  largura2: '1',
  porta2: '0',
  janela2: '1',
  altura3: '8',
  largura3: '1',
  porta3: '0',
  janela3: '0',
  altura4: '8',
  largura4: '1',
  porta4: '0',
  janela4: '0'
};

const correctResponseExample = 'Você precisara de:  1 Lata(s): 3.6 Litros, 5 Lata(s): 0.5 Litros'

describe('Testa a função que recebe as medidas das quatro paredes', () => {
  it('testa se o retorno é uma string com a quantidade de tintas', () => {
    const resposta = paredes(correctDataExmple);

    expect(resposta).to.equals(correctResponseExample)
  });

  it('testa se um erro é retornado, quando area da parede maior que o permitido', () => {
    const dataExmple = {
      altura1: '8',
      largura1: '1',
      porta1: '1',
      janela1: '0',
      altura2: '8',
      largura2: '1',
      porta2: '0',
      janela2: '1',
      altura3: '8',
      largura3: '1',
      porta3: '0',
      janela3: '0',
      altura4: '8',
      largura4: '2',
      porta4: '0',
      janela4: '0'
    };

    const responseExample = 'Área da parede inválida, \nTente novamente'
    const resposta = paredes(dataExmple);

    expect(resposta).to.equals(responseExample)
  });

});


