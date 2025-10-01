// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json({ limit: '10mb' }));

// mongoose.connect('mongodb://localhost:27017/findly', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// const itemSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   location: String,
//   contact: String,
//   image: String,
// });

// const Item = mongoose.model('Item', itemSchema);

// app.get('/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.post('/items', async (req, res) => {
//   const newItem = new Item(req.body);
//   try {
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.delete('/items/:id', async (req, res) => {
//   try {
//     await Item.findByIdAndDelete(req.params.id);
//     res.status(204).send();
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

mongoose.connect('mongodb://localhost:27017/findly', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const claimSchema = new mongoose.Schema({
  claimerName: { type: String, required: true },
  claimerContact: { type: String, required: true },
  message: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  contact: String,   // poster’s contact
  image: String,
  claims: [claimSchema],
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

/* Items */
app.get('/items', async (_req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* Claims */
app.post('/items/:id/claim', async (req, res) => {
  const { claimerName, claimerContact, message } = req.body || {};
  if (!claimerName || !claimerContact) {
    return res.status(400).json({ message: 'claimerName and claimerContact are required' });
  }
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.claims.push({ claimerName, claimerContact, message });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/items/:id/claims', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).select('claims name');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item.claims);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.patch('/items/:itemId/claims/:claimId', async (req, res) => {
  const { status } = req.body || {};
  if (!['approved','declined','pending'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    const claim = item.claims.id(req.params.claimId);
    if (!claim) return res.status(404).json({ message: 'Claim not found' });
    claim.status = status;
    await item.save();
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
