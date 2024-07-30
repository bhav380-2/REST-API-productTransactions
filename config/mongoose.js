import mongoose from 'mongoose';

const connectToDB = async()=>{
    try{
        let url = 'mongodb://127.0.0.1:27017/productsDB';
        await mongoose.connect(url);
        console.log("connected to mongoddb")

    }catch(err){
        console.log("Error while connecting to mongodb ::: ",err);
        return;
    }
}

export default connectToDB;