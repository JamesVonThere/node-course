const express = require('express');
const app = express();

app.get('/', (request, response, next) => {
    response.send("<h1>Gådu?</h1>");
});

app.get('/about', (request, response, next) => {
    response.send("<h1>du gå. He gåna</h1>");
})

app.listen(3001, () => {
    console.log('start server at port 3001');
})