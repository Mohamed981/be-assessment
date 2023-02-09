const create = require("./create-user")

module.exports={
    paths:{
        '/auth/register':{
            ...create
        }
    }
}