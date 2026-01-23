// Script to drop old date_1 index from tokenusages collection
// Run with: node scripts/drop-old-index.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function dropOldIndex() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const db = mongoose.connection.db;
    const collection = db.collection('tokenusages');

    // List current indexes
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map(i => i.name));

    // Drop old date_1 index if it exists
    const hasOldIndex = indexes.some(i => i.name === 'date_1');
    if (hasOldIndex) {
      console.log('Dropping old date_1 index...');
      await collection.dropIndex('date_1');
      console.log('Old index dropped!');
    } else {
      console.log('Old date_1 index not found, nothing to drop.');
    }

    // Show final indexes
    const finalIndexes = await collection.indexes();
    console.log('Final indexes:', finalIndexes.map(i => i.name));

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

dropOldIndex();
