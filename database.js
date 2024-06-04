const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://s223838921:cluster1@cluster1.8rn8qjg.mongodb.net/';
const client = new MongoClient(uri, { serverApi: ServerApiVersion.latest });
let database;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        database = client.db();
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = { connectToDatabase, getDatabase };

// connect to the socket
let socket = io();
socket.on('number', (msg) => {
    console.log('Random number: ' + msg);
})
