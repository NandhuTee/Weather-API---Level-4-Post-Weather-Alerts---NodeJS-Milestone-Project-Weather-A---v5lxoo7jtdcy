// src/controllers/weatherControllers.js
const fs = require('fs');
const path = require('path');

// Helper functions to read and write from 'data.json'
async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../data/data.json'), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(path.join(__dirname, '../data/data.json'), jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Function to save weather alerts
async function saveWeatherAlert(alertDetails) {
  try {
    const data = await getDataFromDatabase();
    
    // Append the new alert
    data.alerts = data.alerts || []; // Ensure alerts is an array
    data.alerts.push(alertDetails);

    // Save the updated data back to the file
    await saveDataToDatabase(data);
    
    return { status: 'success', message: 'Weather alert saved successfully' };
  } catch (error) {
    return { status: 'error', message: 'Failed to save weather alert', error: error.message };
  }
}

module.exports = {
  saveWeatherAlert
};
