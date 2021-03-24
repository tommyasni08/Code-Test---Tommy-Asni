const _ = require('lodash');

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


class SenAggController{

  async getAll(req,res) {

        // Fetching sensor data from 'JSON Files' folder, which the file already moved to folder data
        let sensorRawData = require('../../JSON Files/sensor_data.json').array

        // Convert timestamp to day value :
        // Sunday - Saturday : 0 - 6
        for (let i=0; i< sensorRawData.length; i++) {
          sensorRawData[i].timestamp = new Date(sensorRawData[i].timestamp).getDay()
        }

        // Groupby data based on roomArea
        sensorRawData = (_.groupBy(sensorRawData, "roomArea"))

        // Check the variety of Room Area
        // console.log(Object.keys(sensorRawData))

        // Groupby data based on the timestamp for each roomArea
        const sensorRD_RA1 = (_.groupBy(sensorRawData.roomArea1, "timestamp"))
        const sensorRD_RA2 = (_.groupBy(sensorRawData.roomArea2, "timestamp"))
        const sensorRD_RA3 = (_.groupBy(sensorRawData.roomArea3, "timestamp"))

        // Check the amount of data for different RoomArea and timestamp
        // Make sure the total of data is equal the total raw data
        let counter = 0
        // Save the total data of each timestamp(day)
        let countTS = [];

        for (let i =0 ; i < 7 ; i++) {
          counter += sensorRD_RA1[i].length;
          // console.log('Sensor Room 1 timestamp '+i+' :'+sensorRD_RA1[i].length)
          counter += sensorRD_RA2[i].length;
          // console.log('Sensor Room 2 timestamp '+i+' :'+sensorRD_RA1[i].length)
          counter += sensorRD_RA3[i].length;
          // console.log('Sensor Room 3 timestamp '+i+' :'+sensorRD_RA1[i].length)

          countTS.push(sensorRD_RA1[i].length)
        }

        const dayInWeek = [
          "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ]

        // Create empty object that matches the structure of the aggregate date result
        let senAggData = {
          'RoomArea1' : {
            'Sunday': [],
            'Monday' : [],
            'Tuesday': [],
            'Wednesday': [],
            'Thursday': [],
            'Friday': [],
            'Saturday': []
          },
          'RoomArea2' : {
            'Sunday': [],
            'Monday' : [],
            'Tuesday': [],
            'Wednesday': [],
            'Thursday': [],
            'Friday': [],
            'Saturday': []
          },
          'RoomArea3' : {
            'Sunday': [],
            'Monday' : [],
            'Tuesday': [],
            'Wednesday': [],
            'Thursday': [],
            'Friday': [],
            'Saturday': []
          }
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
        for (let i=0; i < countTS.length; i++ ) {
          tempAndHumData.Temperature.Min = minArr(sensorRD_RA1[i].map((x) => x.temperature));
          tempAndHumData.Temperature.Max = maxArr(sensorRD_RA1[i].map((x) => x.temperature));
          tempAndHumData.Temperature.Median = medianArr(sensorRD_RA1[i].map((x) => x.temperature));
          tempAndHumData.Temperature.Average = avgArr(sensorRD_RA1[i].map((x) => x.temperature));

          tempAndHumData.Humidity.Min = minArr(sensorRD_RA1[i].map((x) => x.humidity));
          tempAndHumData.Humidity.Max = maxArr(sensorRD_RA1[i].map((x) => x.humidity));
          tempAndHumData.Humidity.Median = medianArr(sensorRD_RA1[i].map((x) => x.humidity));
          tempAndHumData.Humidity.Average = avgArr(sensorRD_RA1[i].map((x) => x.humidity));

          senAggData.RoomArea1[dayInWeek[i]].push(tempAndHumData)

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

        // Loop for calculating the min, max, mediam, and average of RoomArea2
        for (let i=0; i < countTS.length; i++ ) {
          tempAndHumData.Temperature.Min = minArr(sensorRD_RA2[i].map((x) => x.temperature));
          tempAndHumData.Temperature.Max = maxArr(sensorRD_RA2[i].map((x) => x.temperature));
          tempAndHumData.Temperature.Median = medianArr(sensorRD_RA2[i].map((x) => x.temperature));
          tempAndHumData.Temperature.Average = avgArr(sensorRD_RA2[i].map((x) => x.temperature));

          tempAndHumData.Humidity.Min = minArr(sensorRD_RA2[i].map((x) => x.humidity));
          tempAndHumData.Humidity.Max = maxArr(sensorRD_RA2[i].map((x) => x.humidity));
          tempAndHumData.Humidity.Median = medianArr(sensorRD_RA2[i].map((x) => x.humidity));
          tempAndHumData.Humidity.Average = avgArr(sensorRD_RA2[i].map((x) => x.humidity));

          senAggData.RoomArea2[dayInWeek[i]].push(tempAndHumData)

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
  
        // Loop for calculating the min, max, mediam, and average of RoomArea3
        for (let i=0; i < countTS.length; i++ ) {
          tempAndHumData.Temperature.Min = minArr(sensorRD_RA3[i].map((x) => x.temperature));
          tempAndHumData.Temperature.Max = maxArr(sensorRD_RA3[i].map((x) => x.temperature));
          tempAndHumData.Temperature.Median = medianArr(sensorRD_RA3[i].map((x) => x.temperature));
          tempAndHumData.Temperature.Average = avgArr(sensorRD_RA3[i].map((x) => x.temperature));

          tempAndHumData.Humidity.Min = minArr(sensorRD_RA3[i].map((x) => x.humidity));
          tempAndHumData.Humidity.Max = maxArr(sensorRD_RA3[i].map((x) => x.humidity));
          tempAndHumData.Humidity.Median = medianArr(sensorRD_RA3[i].map((x) => x.humidity));
          tempAndHumData.Humidity.Average = avgArr(sensorRD_RA3[i].map((x) => x.humidity));

          senAggData.RoomArea3[dayInWeek[i]].push(tempAndHumData)

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

        res.json({
          'Sensor Aggregation Data' : senAggData
        })
  }

}

module.exports = new SenAggController;