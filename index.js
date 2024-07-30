import express from 'express'
import router from './routes/index.js';
import connectToDB from './config/mongoose.js';

const app = express();
const PORT = 8000;

app.use(express.json());



app.use('/',router);


app.listen(PORT,(err)=>{
    if(err){
        console.log("Error while connecting to port number",PORT);
        return;
    }
    console.log("server is running on port",PORT);
    connectToDB();
})
