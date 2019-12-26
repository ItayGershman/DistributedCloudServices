const UserAcc = require('../config/users');
const isEmpty = require('lodash/isempty');

exports.userController = {

    async currMoney(req,res){
        const id = req.params.id;
        try {
            const user = await UserAcc.userExist(id);
            if(user.length === 0){
                res.status(400).send(`This ID isn't in the system`);
            }
            else if(user.length === 1){
                res.status(200).send(`
                    Balance: ${user[0].balance}
                `);
            }
            else {
                res.status(500).send(`Server error`);
            }
        }catch(err){
            res.status(400).send(`${err}`);
        }
        
    },
    
    async createUser(req,res){
        if(!(isEmpty(req.body))){
            const {id,firstName,lastName,age,balance} = req.body;
            try{
                const user = await UserAcc.userExist(id);
                if(user.length === 0){// if there is no user with the same id
                    if(age < 18){
                        return res.status(400).send(`User isn't old enough to open account`);
                    }
                    if(id < 0){
                        return res.status(400).send(`Non valid ID`);
                    }
                    const newUser = new UserAcc({
                        id:id,
                        firstName:firstName,
                        lastName:lastName,
                        age:age,
                        balance:balance
                    });
                    newUser.save((err, newUser) =>{
                        if (err) return res.status(500).send(`Couldn't save new user`);
                        res.status(200).send(`${newUser.firstName} ${newUser.lastName}'s account created succesfully`);
                      });
                }
                else {
                    res.status(403).send(`This ID i already user in the system`);
                }
            } catch(err){
                console.log("err:",err);
            }
        }
        else {
            res.status(400).send(`Non valid input`);
        }
    },

    async deposit(req,res){
        const id = req.params.id;
        try{
            const user = await UserAcc.userExist(id);
            if(user.langth === 0){
                res.status(400).send(`This ID isn't in the system`)
            }
            else {
                if(!isEmpty(req.body)){
                    const {amount} = req.body;
                    
                    if(amount > 0){
                        let balance = user[0].balance;
                        balance += amount;
                        const update = await UserAcc.updateOne({id:id}, {balance:balance});
                        const updatedUser = await UserAcc.userExist(id);//To display current balance
                        res.status(200)
                           .send(`Action completed succesfully\n Current balance: ${updatedUser[0].balance}`);
                    }
                    else{
                        res.status(400).send(`amount should be above 0...`);
                    }
                }
                else {
                    res.status(400).send(`No input received`);
                }
            }
        }catch(err){
            res.status(400).send(`${err}`);
        }
    },

    async withdraw(req,res){
        const id = req.params.id;
        try {
            const user = await UserAcc.userExist(id);
            if(user.langth === 0){
                res.status(400).send(`This ID isn't in the system`)
            }
            else if(user.length === 1){
                if(!isEmpty(req.body)){
                    const {amount} = req.body;
                    if(amount > 0){
                        let balance = user[0].balance;
                        if(amount > balance){
                            res.status(400).send(`Amount requested is higher than balance`);
                        }
                        else {
                            balance -= amount;
                            await UserAcc.updateOne({id:id}, {balance:balance});
                            const updatedUser = await UserAcc.userExist(id);
                            res.status(200).send(`Action completed succesfully\nCurrent balance: ${updatedUser[0].balance}`);
                        }
                    }
                }
                else {
                    res.status(400).send(`No input received`)
                }
            }
            else {
                res.status(500).send(`Server error`);
            }
        }catch(err){
            res.status(400).send(`error: ${err}`);
        }
    },

    // async personalDetails(req,res){
    //     //get id from req
    // },
}

exports.adminController = {

    async users(req,res){
        if(!isEmpty(req.body)){
            const {userName,password} = req.body;
            if(userName === 'admin' && password === 'admin'){
                try{
                    const users = await UserAcc.getUsers();
                    users.sort(function(a, b){ return a.id - b.id });
                    let usersArr = [];
                    for(let i=0;i<users.length;++i){
                        usersArr.push(users[i]);
                    }
                    return res.status(200).send(`${usersArr}`);
                }catch(err){
                    res.status(400).send(`${err}`);
                }
            }
            else {
                res.status(400).send(`You don't have the permission for this action`);
            }
        }
        else {
            res.status(400).send(`No input received`)
        }
    },

    async user(req,res){
        const id = req.params.id;
        if(!isEmpty(req.body)){
            const {userName,password} = req.body;
            if(userName === 'admin' && password === 'admin'){
                try{
                    const user = await UserAcc.userExist(id);
                    if(user.length === 0){
                        res.status(400).send(`This ID isn't in the system`);
                    }
                    else if(user.length === 1){
                        res.status(200).send(`
                        ID: ${user[0].id}
                        First name: ${user[0].firstName}
                        Last name: ${user[0].lastName}
                        Age: ${user[0].age}
                        Balance: ${user[0].balance}`);
                    }
                }catch(err){
                    res.status(400).send(`err:${err}`);
                }
            }
            else {
                res.status(400).send(`You don't have the permission for this action`);
            }
        }
        else {
            res.status(400).send(`No input received`)
        }
    },

    async deleteUser(req,res){
        const id = req.params.id;
        try{
            const user = await UserAcc.userExist(id);
            if(user.length === 0){
                res.status(400).send(`This ID isn't in the system`)
            }
            else if(user.length === 1){
                await UserAcc.deleteOne({ id: id }, (err) => {
                    if (err) {
                      res.status(500).send(`Server Error: ${err}`);
                    } else {
                      res.status(200).send(`${user[0].firstName} ${user[0].lastName} has been removed from the system`);
                    }
                  });
            }
            else {
                res.status(500).send(`Server Error`);
            }
        }
        catch(err){
            res.status(400).send(`${err}`);
        }
    },
}