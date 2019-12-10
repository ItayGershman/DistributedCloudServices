const http = require('http');
const controller = require('../controller/controller');

const port = process.env.PORT || 3031;
const server = http.createServer(controller);

server.listen(port, () => console.log(`listening on port ${port}`));