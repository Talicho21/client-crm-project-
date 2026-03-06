const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Lead = require('../models/Lead');
const { body, validationResult } = require('express-validator');

// @route   GET api/leads
// @desc    Get all leads
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const leads = await Lead.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET api/leads/:id
// @desc    Get single lead
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }

    if (lead.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    res.json({
      success: true,
      lead
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   POST api/leads
// @desc    Create a lead
// @access  Private
router.post('/', [
  auth,
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const newLead = new Lead({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      source: req.body.source || 'website',
      status: req.body.status || 'new',
      createdBy: req.user.id
    });

    const lead = await newLead.save();

    res.json({
      success: true,
      lead
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT api/leads/:id
// @desc    Update a lead
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }

    if (lead.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    const { name, email, phone, source, status } = req.body;
    
    if (name) lead.name = name;
    if (email) lead.email = email;
    if (phone !== undefined) lead.phone = phone;
    if (source) lead.source = source;
    if (status) lead.status = status;

    lead = await lead.save();

    res.json({
      success: true,
      lead
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   DELETE api/leads/:id
// @desc    Delete a lead
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }

    if (lead.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    await lead.deleteOne();

    res.json({
      success: true,
      message: 'Lead removed successfully'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   POST api/leads/:id/notes
// @desc    Add note to lead
// @access  Private
router.post('/:id/notes', [
  auth,
  body('content').notEmpty().withMessage('Note content is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const lead = await Lead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }

    if (lead.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    const newNote = {
      content: req.body.content,
      createdBy: req.user.id
    };

    lead.notes.push(newNote);
    await lead.save();

    res.json({
      success: true,
      notes: lead.notes
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        message: 'Lead not found' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;