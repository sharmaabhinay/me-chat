const mongoose = require('mongoose');
export let userSchema = async() => {
    try{
        let connect = await mongoose.connect('mongodb://localhost:27017/chatzy')
        if(connect){
            console.log('connected')

        }else{
            console.log('something went wrong',connect)
        }
    }catch(err){
        console.log(err)
    }
}
