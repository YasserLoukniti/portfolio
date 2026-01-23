// Update fallback order in MongoDB
// Run with: node scripts/update-fallback-order.js

require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const NEW_ORDER = ['gemini', 'mistral', 'groq-70b', 'cerebras', 'groq-8b', 'openrouter'];

async function updateFallbackOrder() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const db = mongoose.connection.db;
    const result = await db.collection('settings').updateOne(
      {},
      { $set: { fallbackOrder: NEW_ORDER } }
    );

    if (result.matchedCount > 0) {
      console.log('Fallback order updated:', NEW_ORDER);
    } else {
      console.log('No settings found, will use default on next request');
    }

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

updateFallbackOrder();
