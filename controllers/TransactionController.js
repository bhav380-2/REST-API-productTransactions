import Transactions from "../models/TransactionSchema.js";
import axios from "axios";
// gets month name
const getMonthFromDate = (date) => date.getMonth() + 1; // getMonth() is 0-indexed

export default class TransactionController {

    async get(req, res) {
        try {
            const { page = 1, month } = req.query;
            const search = req.query.search != undefined ? req.query.search : '';
            const pageSize = 10;
            let query = {};

            const monthNumber = parseInt(month);
            const transactions = await Transactions.find().populate({
                path: 'product',
                select: '-__v',
                populate: {
                    path: 'category',
                    select: '-products -__v'
                }
            }).select('-__v');

            const filteredTransactions = transactions.filter(transaction => getMonthFromDate(transaction.dateOfSale) === monthNumber);
            let result = filteredTransactions;
            console.log(result);
            if (search) {
                result = result.filter(transaction =>
                    transaction.product.title.toLowerCase().includes(search.toLowerCase()) ||
                    transaction.product.description.toLowerCase().includes(search.toLowerCase()) ||
                    transaction.price.toString().includes(search)
                );
            }

            const paginatedResult = result.slice((page - 1) * pageSize, page * pageSize);
            return res.status(200).json({
                "success": true,
                "content": {
                    "data": paginatedResult,
                }
            });
        } catch (error) {
            res.status(500).send('Error fetching transactions: ' + error.message);
        }
    }

    async stats(req, res) {
        const { month } = req.query;
        const monthNumber = parseInt(month);

        try {
            const transactions = await Transactions.find();
            const filteredData = transactions.filter(transaction => getMonthFromDate(transaction.dateOfSale) === monthNumber);
            const totalSales = filteredData.reduce((acc, transaction) => acc + transaction.price, 0);
            const soldItems = filteredData.filter(transaction => transaction.sold).length;
            const unSoldItems = filteredData.length - soldItems;

            res.status(200).json({

                "success": true,
                "content": {
                    "data": {
                        "totalSales": totalSales,
                        "soldItems": soldItems,
                        "unsoldItems": unSoldItems
                    }
                }
            });
        } catch (error) {
            res.status(500).send('Error fetching statistics: ' + error.message);
        }
    }

    async barChart(req, res) {
        const { month } = req.query;
        const monthNumber = parseInt(month);

        try {
            const transactions = await Transactions.find();
            const filteredData = transactions.filter(transaction => getMonthFromDate(transaction.dateOfSale) === monthNumber);

            const priceRanges = [
                { range: '0-100', count: 0 },
                { range: '101-200', count: 0 },
                { range: '201-300', count: 0 },
                { range: '301-400', count: 0 },
                { range: '401-500', count: 0 },
                { range: '501-600', count: 0 },
                { range: '601-700', count: 0 },
                { range: '701-800', count: 0 },
                { range: '801-900', count: 0 },
                { range: '901-above', count: 0 }
            ];

            let rangeSize = 100;

            filteredData.forEach(transaction => {
                let index = Math.ceil(transaction.price * 1.0 / rangeSize) - 1;
                if (index > 9) {
                    index = 9
                }
                priceRanges[index].count += 1;
            });

            res.status(200).json({
                "success": true,
                "content": {
                    "data": {
                        priceRanges
                    }
                }
            });
        } catch (error) {
            res.status(500).send('Error fetching bar chart data: ' + error.message);
        }
    }

    async pieChart(req, res) {

        const { month } = req.query;
        const monthNumber = parseInt(month);

        try {
            const transactions = await Transactions.find().populate({ path: 'product', populate: { path: 'category' } });
            const filteredData = transactions.filter(transaction => getMonthFromDate(transaction.dateOfSale) === monthNumber);
            const categories = {};

            filteredData.forEach(transaction => {
                const category = transaction.product.category.name;
                if (!categories[category]) {
                    categories[category] = 0;
                }
                categories[category] += 1;
            });

            const data = Object.keys(categories).map(category => ({
                category,
                count: categories[category]
            }));

            // console.log(categories)
            // console.log(categoryData);
            res.status(200).json({
                "success": true,
                "content": {
                    "data": data
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error fetching pie chart data: ' + error.message);
        }
    }

    async combine(req, res) {

        const { month } = req.query;

        try {
            const stats = await (await axios.get(`http://localhost:8000/transactions/stats?month=${month}`)).data;
            const barChart = await (await axios.get(`http://localhost:8000/transactions/barchart?month=${month}`)).data;
            const pieChart = await (await axios.get(`http://localhost:8000/transactions/piechart?month=${month}`)).data;

            res.status(200).json({
                "success": true,
                "content": {
                    "data": {
                        "stats": stats.content.data,
                        "barChartData": barChart.content.data,
                        "pieChartData": pieChart.content.data
                    }
                }
            });
        } catch (error) {
            console.log(error)
            res.status(500).send('Error fetching combined data: ' + error.message);
        }
    }
}





// categories.forEach((category)=>{
//     let curr = {};
//     console.log(category);
//     curr['category'] = category.get(0);
//     curr['count'] = category.count;
//     data.push(curr);

// })

// categories.reduce((obj,category)=>{

//     console.log(category);
//     let curr = {};
//     curr['category'] = category.get(0);
//     curr['count'] = category.count;
//     data.push(curr);



// },{})