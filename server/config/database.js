const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            userUnifiedTopology: true,
            userNewUrlParser: true
        });
    } catch (error){
        console.log(error)
    }
}



module.exports = connect
