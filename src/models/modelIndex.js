let medidaDasQuatroParedes = [];
const larguraPorta = 0.80;
const alturaPorta = 1.90;
const larguraJanela = 2.00;
const alturaJanela = 1.20;

const retornaQuantidadeDeLatas = () => {
  const totalArea = medidaDasQuatroParedes.reduce((acc, curr) => acc + curr, 0);
    const totalLatas = calculaQuantidadeTinta(totalArea);
    const latasMaiorZero = Object.entries(totalLatas).filter((lata) => totalLatas[lata[0]] > 0);
    const latasString = latasMaiorZero.map((lata) => ` ${lata[1]} Lata(s): ${lata[0]} Litros`)
    medidaDasQuatroParedes = [];
    return `Você precisara de: ` + [...latasString]
};

const calculaQuantidadeTinta = (area) => {
  const m2PorLitro = 5;
  let litrosDeTinta = parseFloat((area / m2PorLitro).toFixed(2));

  const latas = {
    18: 0,
    3.6: 0,
    2.5: 0,
    0.5: 0
  };

  while(litrosDeTinta > 0){
    const latasDisponiveis = Object.keys(latas);
    latasDisponiveis.forEach((litro) => {
      litro = parseFloat(litro);
      if (litrosDeTinta > litro) {
        latas[litro] = Math.floor(litrosDeTinta / litro);
        litrosDeTinta -= litro * latas[litro]
      } else if(litrosDeTinta > 0 && litrosDeTinta < 0.5) {
        latas[0.5] += 1;
        litrosDeTinta = 0;
      }
    });  
  }
  return latas;
};
 
const areaASerPintada = (areaDaParede, areaPortas, areaJanelas) => {
  const areaPortaJanela = areaDaParede / 2;
  const areaTinta = areaPortaJanela - (parseFloat(areaPortas) + parseFloat(areaJanelas));
  if (areaTinta < 0) return "Parede não comporta portas e janelas";
  return parseFloat((areaTinta + areaPortaJanela).toFixed(2));
};

const calculaAreaDaParede = (alturaParede, larguraParede) => {
  const area =  alturaParede * larguraParede;
  if (area > 15 || area < 1) {
    return "Área da parede inválida";
  };
  return area;
};

const calculaAreaPortasOuJanelas = (qtd, altura, largura) => {
  return ((altura * largura) * qtd).toFixed(2);
};

const verificaAlturaParede = ({ alturaParede, larguraParede, janelas, portas }) => {
  if (alturaParede < alturaPorta + 0.30) return "Essa parede não comporta o tamanho da porta" 
  
  const areaPorta = calculaAreaPortasOuJanelas(portas, alturaPorta, larguraPorta);
  const areaJanela = calculaAreaPortasOuJanelas(janelas, alturaJanela, larguraJanela);
  const parede = calculaAreaDaParede(alturaParede, larguraParede);
  if (typeof parede === 'string') return parede;
  return areaASerPintada(parede, areaPorta, areaJanela);
};

const paredes = (obj) => {  
  do {
    const paredeAtual = medidaDasQuatroParedes.length + 1
    const parede =  {
      alturaParede: obj[`altura${paredeAtual}`],
      larguraParede: obj[`largura${paredeAtual}`],
      janelas: obj[`janela${paredeAtual}`],
      portas: obj[`porta${paredeAtual}`],
    };
    const resultado = verificaAlturaParede(parede);

    if (typeof resultado === 'string') {
      return `${resultado}, \nTente novamente`; 
    };
    medidaDasQuatroParedes.push(resultado);
    
  } while (medidaDasQuatroParedes.length < 4);

  return retornaQuantidadeDeLatas();
};

module.exports = { paredes, verificaAlturaParede, areaASerPintada };
