const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Owner = require('./models/Owner');
const Admin = require('./models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/goldBilling', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ success: false, message: 'Admin not found' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, 'secretKey');
  res.json({ success: true, token });
});

app.get('/owners', async (req, res) => {
  const owners = await Owner.find();
  res.json(owners);
});

app.put('/owners/:id/add-weight', async (req, res) => {
  const { id } = req.params;
  const { weight } = req.body;
  const owner = await Owner.findById(id);
  if (!owner) return res.status(404).json({ success: false, message: 'Owner not found' });

  owner.balance += Number(weight);
  await owner.save();
  res.json({ success: true, message: 'Weight added', owner });
});

app.listen(5000, () => console.log('Server running on port 5000'));
