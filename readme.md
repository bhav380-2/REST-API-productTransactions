
# Product_Transactions API

This project is a RESTful API for managing product transactions, including listing transactions, getting statistics, and generating charts based on transaction data.

## Table of Contents
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)

## Installation

1. Clone the repository:
    ```sh
     https://github.com/bhav380-2/REST-API-productTransactions.git
    ```

2. Navigate to the project directory:
    ```sh
    cd REST-API-productTransactions
    ```

3. Install dependencies:
    ```sh
    npm install
    ```


2. Ensure MongoDB is running and accessible using the connection string provided.

## Running the Server

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running on `http://localhost:8000`.

## API Endpoints

### Initialize Database
- **GET /api/init**
    - Fetches data from the third-party API and seeds the database with the data.

### List Transactions
- **GET /api/transactions**
    - List all transactions with support for search and pagination.
    - Query Parameters:
        - `month` (required): Month to filter transactions.
        - `search` (optional): Search text to filter by title, description, or price.
        - `page` (optional): Page number for pagination (default: 1).

### Get Statistics
- **GET /api/transactions/stats**
    - Get statistics for total sale amount, sold items, and unsold items for the selected month.
    - Query Parameters:
        - `month` (required): Month to filter transactions.

### Bar Chart Data
- **GET /api/transactions/barchart**
    - Get data for bar chart showing the price range and number of items in that range for the selected month.
    - Query Parameters:
        - `month` (required): Month to filter transactions.

### Pie Chart Data
- **GET /api/transactions/piechart**
    - Get data for pie chart showing unique categories and the number of items in each category for the selected month.
    - Query Parameters:
        - `month` (required): Month to filter transactions.

### Combined Data
- **GET /api/transactions/combined**
    - Fetches data from the statistics, bar chart, and pie chart APIs and combines the response.
    - Query Parameters:
        - `month` (required): Month to filter transactions.
