const express = require('express');

const router = require('./src/routes');

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
