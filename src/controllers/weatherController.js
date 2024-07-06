// src/controllers/weatherControllers.js
const fs = require('fs');
const path = require('path');

// Helper functions to read and write from 'data.json'
async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../data/data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading data.json: ${err.message}`);
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (parseError) {
          console.error(`Error parsing data.json: ${parseError.message}`);
          reject(parseError);
        }
      }
    });
  });
}

async function saveDataToDatabase(data) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../data/data.json');
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing to data.json: ${err.message}`);
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
    console.error(`Error saving weather alert: ${error.message}`);
    return { status: 'error', message: 'Failed to save weather alert', error: error.message };
  }
}

module.exports = {
  saveWeatherAlert
};
