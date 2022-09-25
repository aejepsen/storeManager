const express = require('express');
const productRouter = require('./routes/productRouters');
const saleRouter = require('./routes/saleRouters');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.use(productRouter);
app.use(saleRouter);

module.exports = app;
