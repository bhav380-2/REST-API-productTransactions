import express from 'express'
import router from './routes/index.js';
import connectToDB from './config/mongoose.js';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use('/api',router);

app.listen(PORT,(err)=>{
    if(err){
        console.log("Error while connecting to port number",PORT);
        return;
    }
    console.log("server is running on port",PORT);
    connectToDB();
})
