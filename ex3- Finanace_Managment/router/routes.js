const {Router} = require('express');

const {
    userController,
    adminController
} = require('../controller/controller');

userRouter = new Router();
adminRouter = new Router();

//User
userRouter.get('/displayCurrentMoney/:id',(req,res)=>{
    userController.currMoney(req,res);
});

userRouter.post('/createUser',(req,res)=>{
    userController.createUser(req,res);
})

userRouter.put('/deposit/:id',(req,res)=>{//:id is the user account
    userController.deposit(req,res);
});
userRouter.put('/withdraw/:id',(req,res)=>{
    userController.withdraw(req,res)
});

//Admin
adminRouter.get('/displayAllUsers',(req,res)=>{
    adminController.users(req,res);
});
adminRouter.get('/displayUser/:id',(req,res)=>{
    adminController.user(req,res);
});

adminRouter.delete('/deleteUser/:id',(req,res)=>{//cancel specific action
    adminController.deleteUser(req,res);
});

module.exports = {
    userRouter,
    adminRouter
}