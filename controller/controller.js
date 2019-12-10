const url = require('url');
const handler = require('./handler');
const logger = require("../logger/logger");

module.exports = (req, res) => {
    logger.eventEmitter.emit('log',`Request ${req.method} came from ${req.url}`);
    const urlObj = url.parse(req.url ,true,false);
    req.urlObj = urlObj;

    switch(req.method){
        case 'GET':
            handler.get(req,res);
            break;
        case 'POST':
            handler.post(req,res);
            break;
        case 'PUT':
            handler.put(req,res);
            break;
        case 'DELETE':
            handler.del(req,res);
            break;
        default:
            logger.eventEmitter.emit('errorEvents',`This server doesn't support ${req.method} method`);
            res.writeHead(404);
            res.write(`This server doesn't support '${req.method}' method`);
            res.end();
            break;
    }
};
