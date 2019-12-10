const order = require("../server/order");
const logger = require("../logger/logger");

const get = (req,res)=>{
    if(req.urlObj.path === '/'){
        res.writeHead(200);
        res.write(`
            <body>
                <h1>Welcome to Lady Gaga Show!!</h1>
                <h3>It is unusual show and we have only 10 tickets to purchase!<br>Hurry up and order</h3>
                <br>
                <h2>Ticket price: 100$</h2>
                <p>To purchase go to localhost:3031/insertNewData</p>
            </body>    
        `);
        res.end();
    }
    else if(req.urlObj.pathname === '/displayAllOrders'){
        let body = "";
        req.on('data',(chunk) => {
            body += chunk.toString();
        });
        req.on('end',()=>{
            if(body !== ""){
                const newData = JSON.parse(body);
                //Check permission
                if(newData.userName === 'admin' && newData.password === 'password'){
                    logger.eventEmitter.emit('ticketEvents','Display all orders - from admin');
                    if(order.orders.length == 0){
                        logger.eventEmitter.emit('ticketEvents','No orders to display');
                        res.writeHead(200);
                        res.write(`No orders to display`);
                        res.end();
                    }else {
                        logger.eventEmitter.emit('log','Tickets displayed');
                        res.writeHead(200);
                        res.write(`TicketsLeft: ${order.tickets}\n`);
                        res.write(JSON.stringify(order.orders));
                        res.end();
                    }
                }
                else {
                    logger.eventEmitter.emit('errorEvents','Display all orders - from user');
                    res.writeHead(401);
                    res.write(`Sorry you don't have the permission for this action`);
                    res.end();
                }
            }
            else {
                logger.eventEmitter.emit('errorEvents',"You didn't enter any values");
                res.writeHead(404);
                res.write(`You didn't enter any values`);
                res.end();
            }    
        });
    }
    else if(req.urlObj.pathname === '/getOrderData' && req.urlObj.query){
        const {id} = req.urlObj.query;  
        if(!Number.isNaN(id) && id){   
            try{
                if(id == order.orders[order.getOrderById(id)].id){
                    let order = order.orders[order.getOrderById(id)];
                    res.writeHead(200);
                    res.write(`
                        <body>
                            <h1>Full Name:${order.orderName}</h1><br>
                            <h3>ID: ${order.id}</h3>
                            <p>Ticket amount: ${order.ticketsAmount}<p>
                            <p>Date of order: ${order.date}<p>
                        </body>
                    `)
                    res.end();
                }
            }
            catch(error){
                logger.eventEmitter.emit('errorEvents', error);
                res.writeHead(404);
                res.write(`${error}`);
                res.end();
            }
        }
        else {
            logger.eventEmitter.emit('errorEvents', `#${id} not exist`);
            res.writeHead(404);
            res.write('Bad request - ID ');
            res.end();
        }
    }
    else if(req.urlObj.pathname === '/displayAllLogs') {
        //verify admin and display logs
        let body = "";
        req.on('data',(chunk) => {
            body += chunk.toString();
        });
        req.on('end',()=>{
            if(body !== ""){
                const newData = JSON.parse(body);
                if(newData.userName === 'admin' && newData.password === 'password'){
                    logger.eventEmitter.emit('log','Display all logs - from admin');
                    res.writeHead(200);
                    res.write(`Logs are also on console\n`);
                    res.write(JSON.stringify(logger.logs));
                    res.end();
                }
                else {
                    logger.eventEmitter.emit('errorEvents','Display all logs - from user');
                    res.writeHead(401);
                    res.write(`Sorry you don't have the permission for this action`);
                    res.end();
                }
            }else {
                logger.eventEmitter.emit('errorEvents',"You didn't enter any values");
                res.writeHead(404);
                res.write(`You didn't enter any values`);
                res.end();
            } 
        });
    } else {
        logger.eventEmitter.emit('errorEvents', `url ${req.urlObj.path} not exists`);
        res.writeHead(404);
        res.write('Bad request - URL');
        res.end();
    }
}

const post = (req,res)=>{
    if(req.urlObj.pathname == '/insertNewData'){
        let body = "";
        req.on('data',chunk =>{
            body += chunk.toString();
        });
        req.on('end',()=>{
            let ticket;
            const newData = JSON.parse(body);
            let id = undefined;
            //check if newData.id value is already in other order
            try{
                id = order.orders[order.getOrderById(newData.id)];
            }catch(error){
                logger.eventEmitter.emit('log','Check if id is in the system');
            }
            if(id == undefined){ //if there is no user with this id
                try{
                    ticket = new order.Orders(newData.name,newData.id,newData.ticketsAmount);
                    order.tickets -= newData.ticketsAmount;
                    order.setTickets(order.tickets);
                    logger.eventEmitter.emit('ticketEvents','New ticket created');
                    order.orders.push(ticket);
                    logger.eventEmitter.emit('ticketEvents','Ticket pushed into orders array');
                    res.writeHead(200);
                    res.write(`Ticket succecfuly purchased`);
                    res.end();
                }
                catch(error){
                    logger.eventEmitter.emit('errorEvents',error);
                    res.writeHead(404);
                    res.write(`${error}`);
                    res.end();
                }
            }else {
                logger.eventEmitter.emit('errorEvents','This ID already in the system!');
                res.writeHead(404);
                res.write(`This ID already in the system!`);
                res.end();
            }
        });
    }
    else{
        logger.eventEmitter.emit('errorEvents',`url ${req.urlObj.path} not exist`);
        res.writeHead(404);
        res.write('Bad request - URL');
        res.end();
    }
}

const put = (req,res)=>{
    if(req.urlObj.pathname == '/updateOrder' && req.urlObj.query){
        const {id} = req.urlObj.query;
        let body = "";
        req.on('data',chunk =>{
            body += chunk.toString();
        });
        req.on('end',()=>{
            let ticket;
            const newData = JSON.parse(body);
            try{
                //delete old order
                if(newData.ticketsAmount <= order.tickets){
                    order.tickets += order.orders[order.getOrderById(id)].ticketsAmount;//retrieve the amount of tickets
                    order.setTickets(order.tickets);//set tickets on ticket class
                    order.orders.splice(order.getOrderById(id),1);//remove updated element
                    logger.eventEmitter.emit('ticketEvents',`order with ID:${id} has remvoed from orders`);
                
                    //make new order
                    ticket = new order.Orders(newData.name,newData.id,newData.ticketsAmount);
                    order.tickets -= newData.ticketsAmount;//Change amount of ticket
                    logger.eventEmitter.emit('ticketEvents','New ticket Created');
                    order.orders.push(ticket);
                    logger.eventEmitter.emit('ticketEvents','New ticket pushed into orders');

                    res.writeHead(200);
                    res.write(`Ticket updated succesfully`)
                    res.end();
                }
                else {
                    logger.eventEmitter.emit('errorEvents',"Sorry, we don't have that much tickets to sell");
                    res.writeHead(404);
                    res.write(`Sorry, we don't have that much tickets to sell\nYour order remains as it was before`);
                    res.end();                    
                }
            }
            catch(error){
                logger.eventEmitter.emit('errorEvents',error);
                res.writeHead(404);
                res.write(`${error}, therefore it can not be updated...`);
                res.end();
            }
        });
    }
    else {
        logger.eventEmitter.emit('errorEvents',`url ${req.urlObj.path} not exist`);
        res.writeHead(404);
        res.write('Bad request - URL');
        res.end();
    }
}

const del = (req,res)=>{
    if(req.urlObj.pathname === '/deleteAllOrders'){
        logger.eventEmitter.emit('log','Delete all orders called');
        let body = "";
        req.on("data",(chunk) =>{
            body += chunk.toString();
        });
        req.on('end',()=>{
            if (body !== ""){
                const newData = JSON.parse(body);
                if(newData.userName === 'admin' && newData.password === 'password'){
                    logger.eventEmitter.emit('ticketEvents','Delete all orders called - from admin');
                    res.writeHead(200);
                    if(order.orders.length > 0){
                        order.orders.splice(order.orders,order.orders.length);
                        order.setTickets(10);
                        logger.eventEmitter.emit('ticketEvents','All orders deleted from the system');
                        res.write(`All orders delete from the system`);
                        res.end();
                    }
                    else {
                        logger.eventEmitter.emit('errorEvents','No orders to delete from system');
                        res.writeHead(404);
                        res.write(`No orders to delete from system`);
                        res.end();
                    }
                }
                else {
                    logger.eventEmitter.emit('errorEvents',"Called to delete all orders not from admin, thus it won't be deleted");
                    res.writeHead(404);
                    res.write(`Called to delete all orders not from admin, thus it won't be deleted`);
                    res.end();
                }
            }else {
                logger.eventEmitter.emit('errorEvents',"You didn't enter any values in body");
                res.writeHead(404);
                res.write(`"You didn't enter any values...`);
                res.end();
            }
        });
    }
    else if(req.urlObj.pathname == '/deleteOrder' && req.urlObj.query){
        logger.eventEmitter.emit('log','deleteOrder called');
        const {id} = req.urlObj.query;
        try{
            order.tickets += order.orders[order.getOrderById(id)].ticketsAmount;//retrieve the amount of tickets
            order.setTickets(order.tickets);//set tickets on ticket class
            order.orders.splice(order.getOrderById(id),1);
            logger.eventEmitter.emit('ticketEvents','Ticket deleted succesfully');
            res.writeHead(200);
            res.write(`Ticket deleted succesfully`);
            res.end();
        }
        catch(error){
            logger.eventEmitter.emit('errorEvents',error);
            res.writeHead(404);
            res.write(`${error}`);
            res.end();
        }
    }
    else {
        logger.eventEmitter.emit('errorEvents',`url ${req.urlObj.path} not exist`);
        res.writeHead(404);
        res.write('Bad request - URL');
        res.end();
    }
}

module.exports = {
    get,
    post,
    put,
    del
}