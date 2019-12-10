const moment = require('moment');

let tickets = 10;
let orders = [];
const admin = {
    "userName":"admin",
    "password": "password"
}

class Orders {
    constructor(name,id,tcktAmnt){
        this.id = id;
        this.orderName = name;
        this.ticketsAmount = this.setTicketAmnt(tcktAmnt);//catch at handler
        if(tickets >= tcktAmnt){
            tickets = tickets - tcktAmnt;
        }
        else throw('Not enough tickets left to purchase');
        this.ticketPrice = 100;
        this.date = moment().format('MMMM Do YYYY, h:mm:ss a');
    }

    setTicketAmnt(tcktAmnt){
        if ( tcktAmnt <= 0){
            throw("You have to buy at least 1 ticket");
        }
        if(tcktAmnt <= 10){
            return tcktAmnt;
        }
        else throw("Can't by that much ticket");
    }
}

const setTickets = ticketsSetter => {
    tickets = ticketsSetter;
}

const getOrderById = id =>{
    for(i in orders){
        if(orders[i] == undefined){
            throw('No orders');
        }
        if(orders[i].id == id){
            return i;
        }
    }
    throw(`ID:${id} isn't in system orders`);
}

module.exports ={
    Orders,
    orders,
    getOrderById,
    tickets,
    setTickets,
    admin
};