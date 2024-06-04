const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const env = require('./env'); // Import the env.js file
const port = 3002;

// Middleware setup
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const uri = 'mongodb+srv://s223838921:cluster1@cluster1.8rn8qjg.mongodb.net/';
const client = new MongoClient(uri, { serverApi: ServerApiVersion.latest });

let collection;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db();
        collection = database.collection('Cat');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectToDatabase();

// Defining Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/cards', async (req, res) => {
    try {
        const cards = await getAllCards();
        res.json(cards);
    } catch (err) {
        console.error('Error fetching cards:', err);
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
});

app.post('/api/cards', async (req, res) => {
    const card = req.body;
    try {
        await postCard(card);
        res.status(201).json({ message: 'Card added successfully' });
    } catch (err) {
        console.error('Error adding card:', err);
        res.status(500).json({ error: 'Failed to add card' });
    }
});

// Database Operations Functions
async function postCard(card) {
    try {
        await collection.insertOne(card);
    } catch (err) {
        console.error('Error posting card:', err);
        throw err;
    }
}

async function getAllCards() {
    try {
        const cards = await collection.find({}).toArray();
        return cards;
    } catch (err) {
        console.error('Error fetching cards:', err);
        throw err;
    }
}

env(io);

// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});