// src/routes/weatherRoutes.js
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherControllers');

// POST /alerts to save a new weather alert
router.post('/alerts', async (req, res) => {
  try {
    const { city, date, humidity } = req.body;
    
    // Validate input
    if (!city || !date || typeof humidity !== 'number') {
      return res.status(400).json({ status: 'error', message: 'Invalid input' });
    }

    // Save the weather alert
    const alertDetails = { city, date, humidity };
    const result = await weatherController.saveWeatherAlert(alertDetails);
    
    if (result.status === 'success') {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Failed to save weather alert', error: error.message });
  }
});

module.exports = router;
