import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    _id:{
        type:Number,
        requried:true,
        unique:true
    },

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },

    image :{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const Products = mongoose.model('Products',productSchema);
export default Products;