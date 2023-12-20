// server.js
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { data } = require('autoprefixer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://lolVault:L6CQlFwNcnijYHSF@vaultcluster.rxmzhoh.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToMongo();

app.get('/api/data', async (req, res) => {
  const database = client.db('Vault');
  const collection = database.collection('g_accs');

  try {
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});