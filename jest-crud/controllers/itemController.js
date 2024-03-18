// controllers/itemController.js

const Item = require('../models/itemModel');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newItem = new Item({ name, description, price });
    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.status(200).json({ success: true, item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, description, price } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { name, description, price },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


exports.getItemByIdQuery = async()=>{
  try {
    let query
    
  } catch (error) {
    
  }
}