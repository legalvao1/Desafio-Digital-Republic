const model = require('../models/modelIndex');

const renderizaCalculadora = (_req, res) => {    
  try{
    res.render('calculadora', {resultado: '' });
  } catch(error) {
    res.render('calculadora', { resultado: error.message });
  }
}

const calculadoraDeTinta = (req, res) => {      
  try{    
    const resultado = model.paredes(req.body);
    res.render('calculadora', { resultado });
  } catch(error) {
    res.render('calculadora', { resultado: error.message });
  }
}

module.exports = { renderizaCalculadora, calculadoraDeTinta }