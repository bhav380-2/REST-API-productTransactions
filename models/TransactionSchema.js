
import mongoose from 'mongoose';
const transactionSchema = new mongoose.Schema({

    product:{
        type: Number,
        ref : 'Products',
        required:true
    },

    price : {
        type : Number,
        required:true
    },
    
    sold : {
        type: Boolean,
        required:true
    },

    dateOfSale:{
        type: Date,
        required:true
    }

})

const Transactions = mongoose.model('Transactions',transactionSchema);
export default Transactions;

