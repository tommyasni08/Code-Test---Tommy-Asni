const fs = require('fs');
const cron = require('node-cron');

async function streamSen() {
  // Random Data Generation Purpose

  // Mininum and Maximum value of Temperature and Humidity
  const minTemp = 17.000000000000000;
  const maxTemp = 27.000000000000000;
  const minHum = 87.000000000000000;
  const maxHum = 97.000000000000000;

  // Random Number Generation Function Based on Two Number
  function randIntFromInterval(min,max) {
    return (Math.random() * (max - min + 1) + min);
  }

  // Array for diff roomArea (1-5)
  const roomAreaArr = [
    'roomArea1', 'roomArea2', 'roomArea3', 'roomArea4', 'roomArea5'
  ]

  // Empty Object Frame
  let emptyObj = {
    "temperature" : 0,
    'humidity': 0,
    'roomArea': '',
    'id' : 0,
    'timestamp': 0
  }

  // Fetch JSON file from the local
  let sensorRawData = require('./JSON Files/stream_sensor_data.json')

  // Current Timestamp
  const ts1 = new Date();

  // Generate random data for 5 different roomArea and Write it in JSON file
  for(let i=0; i< roomAreaArr.length; i++) {
    emptyObj.temperature = randIntFromInterval(minTemp,maxTemp)
    emptyObj.humidity = randIntFromInterval(minHum,maxHum)
    emptyObj.roomArea = roomAreaArr[i]
    emptyObj.timestamp = ts1.getTime()
    emptyObj.id = sensorRawData.array.length +1

    sensorRawData.array.push(emptyObj)

    emptyObj = {
      "temperature" : 0,
      'humidity': 0,
      'roomArea': '',
      'timestamp': 0
    }
  }

  // Write the generated data to the JSON file
  fs.writeFile('./JSON Files/stream_sensor_data.json', JSON.stringify(sensorRawData,null,2), err => {
    if (err) {
      console.log(err);
    } else {
      console.log('File succesfully written!');
    }
  })



}

async function clearJSON() {
  // Fetch JSON file from the local
  let sensorRawData = require('./JSON Files/stream_sensor_data.json')

  const emptyData = {
    "array": []
  }

  // Return the JSON files to initial state
  fs.writeFile('./JSON Files/stream_sensor_data.json', JSON.stringify(emptyData,null,2), err => {
    if (err) {
      console.log(err);
    } else {
      console.log('File succesfully written!');
    }
  })
}


cron.schedule('0 */2 * * * *', async () => {
  streamSen()
  }
)

// streamSen()
// clearJSON()
