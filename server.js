const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./src/controller');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.get('/', controller.renderizaCalculadora);
app.post('/', controller.calculadoraDeTinta);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});