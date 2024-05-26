const fs = require('fs');

async function getDataFromDatabase() {
  return new Promise((resolve, reject) => {
    fs.readFile('src/data/data.json', (err, data) => {
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
    const jsonData = JSON.stringify(data);
    fs.writeFile('src/data/data.json', jsonData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/*
  Instructions for students:
  Implement the function to save weather alerts.

  Function:
    saveWeatherAlert(alertDetails)

  Input:
    - alertDetails (object): The details of the weather alert to be saved.


  Tips:
    - Use the provided functions getDataFromDatabase() and saveDataToDatabase() to read and write data from the 'data.json' file.
    - Read the existing data from the 'data.json' file using getDataFromDatabase().
    - Write the data to the 'data.json' file using saveDataToDatabase().    
*/



// Level 4: Post Weather Alerts
async function saveWeatherAlert(alertDetails) {
   // TODO: Implement this function
}

module.exports = {
  saveWeatherAlert
};
