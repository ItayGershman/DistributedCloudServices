const {Schema,model} = require('mongoose');

const accountSchema = new Schema ({
    id: {
        type:Number,
        required:true
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

accountSchema.statics.userExist = async function(id) {
    return this.find({ id: id }, (err, arr) => {
      if (err) { throw err; }
    });
  }

  accountSchema.statics.getUsers = async function() {
    return this.find({}, (err, arr) => {
      if (err) { throw err; }
    });
  }

const UserAcc = model('UserAcc',accountSchema,'users_account');
module.exports = UserAcc;