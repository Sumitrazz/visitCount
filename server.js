const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();


const app = express();
const port = 2222;

app.use(cors()); 
app.use(express.json()); 


mongoose.connect(process.env.mongoDB);


const counterSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
});


const Counter = mongoose.model('Counter', counterSchema);


app.get('/api/visitCount', async (req, res) => {
  const counter = await Counter.findOne();
  if (!counter) {
    const newCounter = new Counter({ count: 0 });
    await newCounter.save();
    return res.json({ visitCount: 0 });
  }
  res.json({ visitCount: counter.count });
});


app.post('/api/incrementVisit', async (req, res) => {
  const counter = await Counter.findOne();
  if (!counter) {
    const newCounter = new Counter({ count: 1 });
    await newCounter.save();
    return res.status(200).json({ visitCount: 1 });
  }
  counter.count += 1;
  await counter.save();
  res.status(200).json({ visitCount: counter.count });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
