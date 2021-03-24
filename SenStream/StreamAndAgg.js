const fs = require('fs');
const cron = require('node-cron');
const _ = require('lodash');

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


// Function to find the unique value of an array
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// Function to find the minimum value of an array
function minArr(arr) {
  return Math.min(...arr);
}

// Function to find the maximum value of an array
function maxArr(arr) {
  return Math.max(...arr);
}

// Function to find the median value of an array
function medianArr(arr){
  if(arr.length ===0) return 0;

  arr.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(arr.length / 2);

  if (arr.length % 2)
    return arr[half];

  return (arr[half - 1] + arr[half]) / 2.0;
}

// Function to find the average value of an array
function avgArr(arr) {
  return arr.reduce((a,b) => a+b,0)/arr.length;
}

async function aggSen() {

  // Fetching sensor data from 'JSON Files' folder, which the file already moved to folder data
  let sensorRawDataIni = require('./JSON Files/stream_sensor_data.json').array

  // Groupby data based on roomArea
  sensorRawData = (_.groupBy(sensorRawDataIni, "roomArea"))

  // Array of the different Room Area
  const roomAreaArr = Object.keys(sensorRawData);

  let senRD_RA = [];

  for(let i=0; i<roomAreaArr.length; i++) {
    senRD_RA[i] = sensorRawData[roomAreaArr[i]]
  }

  // Create empty object that matches the structure of the aggregate date result
  let senAggData = {};

  senAggData['Avg Sensors Value of All Rooms'] = {
    'Temperature': 0,
    'Humidity': 0
  }

  for(let i=0; i<roomAreaArr.length; i++) {
    senAggData[roomAreaArr[i]] = [];
  }

  let tempAndHumData = {
    'Temperature' : {
      'Min' : 0,
      'Max' : 0,
      'Median' : 0,
      'Average' : 0
    },
    'Humidity' : {
      'Min' : 0,
      'Max' : 0,
      'Median' : 0,
      'Average' : 0
    }
  }

  // Loop for calculating the min, max, mediam, and average of RoomArea1
  for (let i=0; i<roomAreaArr.length; i++) {
    tempAndHumData.Temperature.Min = minArr(senRD_RA[i].map((x) => x.temperature));
    tempAndHumData.Temperature.Max = maxArr(senRD_RA[i].map((x) => x.temperature));
    tempAndHumData.Temperature.Median = medianArr(senRD_RA[i].map((x) => x.temperature));
    tempAndHumData.Temperature.Average = avgArr(senRD_RA[i].map((x) => x.temperature));

    tempAndHumData.Humidity.Min = minArr(senRD_RA[i].map((x) => x.humidity));
    tempAndHumData.Humidity.Max = maxArr(senRD_RA[i].map((x) => x.humidity));
    tempAndHumData.Humidity.Median = medianArr(senRD_RA[i].map((x) => x.humidity));
    tempAndHumData.Humidity.Average = avgArr(senRD_RA[i].map((x) => x.humidity));

    senAggData[roomAreaArr[i]].push(tempAndHumData)

    tempAndHumData = {
      'Temperature' : {
        'Min' : 0,
        'Max' : 0,
        'Median' : 0,
        'Average' : 0
      },
      'Humidity' : {
        'Min' : 0,
        'Max' : 0,
        'Median' : 0,
        'Average' : 0
      }
    }
  }

  senAggData['Avg Sensors Value of All Rooms'] = {
    'Temperature': avgArr(sensorRawDataIni.map((x)=> x.temperature)),
    'Humidity': avgArr(sensorRawDataIni.map((x)=> x.humidity))
  }

  fs.writeFile('./JSON Files/agg_sensor_data.json', JSON.stringify(senAggData,null,2), err => {
    if (err) {
      console.log(err);
    } else {
      console.log('File succesfully written!');
    }
  })

}

cron.schedule('0 */15 * * * *', async () => {
  aggSen()
  }
)
cron.schedule('0 */2 * * * *', async () => {
  streamSen()
  }
)

