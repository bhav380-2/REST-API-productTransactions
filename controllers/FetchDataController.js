import axios from 'axios';
import Category from '../models/CategorySchema.js';
import Products from '../models/ProductSchema.js';
import Transactions from '../models/TransactionSchema.js';

// ____________controller to initialize database_________________________________
export default class FetchDataController{

    async get(req,res){

        try {

            const api_url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
            const response = await axios.get(api_url);
            const data = response.data;
            const categoriesMap = new Map();

            data.forEach(item => {
                if (!categoriesMap.has(item.category)) {
                    categoriesMap.set(item.category, {
                        // categoryId: categoriesMap.size + 1,
                        name: item.category,
                        products: []
                    });
                }

                categoriesMap.get(item.category).products.push(item.id);
            });

            const categoryRecords = await Category.insertMany(Array.from(categoriesMap.values()));
            const products = data.map(item => ({
                _id : item.id,
                title: item.title,
                description: item.description,
                category: categoryRecords.find(category => category.name === item.category)._id,
                image: item.image
            }));

            // console.log("Hiiii");
            // console.log(products.length);
    
            const productRecords = await Products.insertMany(products);
            const transactions = data.map(item => ({
                // transactionId: item.id,
                product: productRecords.find(product => product._id === item.id)._id,
                price: item.price,
                sold: item.sold,
                dateOfSale: item.dateOfSale
            }));

            await Transactions.insertMany(transactions);
            res.status(200).send('Database initialized with seed data.');
        } catch (error) {
            console.log(error);
            res.status(500).send('Error initializing database: ' + error.message);
        }
    }
}