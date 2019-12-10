
const events = require('events');

const eventEmitter = new events.EventEmitter();

let logs = [];//All logs
const log = (str)=>{
    console.log(`log: ${str}`);
    logs.push(`log: ${str}`);
}

const ticketEvents = (str)=>{
    console.log(`ticketEvents: ${str}`);
    logs.push(`ticketEvents: ${str}`);
}

const errorEvents = (str) =>{
    console.log(`errorEvents: ${str}`);
    logs.push(`errorEvents: ${str}`);
}

eventEmitter.on('log',log);
eventEmitter.on("ticketEvents",ticketEvents);
eventEmitter.on("errorEvents",errorEvents);
eventEmitter.on('DisplayLogs',()=>{
    console.log(logs);
});

module.exports = {
    eventEmitter,
    logs
};