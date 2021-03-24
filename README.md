# CAD-IT CODE Test IoT Application Engineer
> by Tommy Asni

## Explanation!!
### General
- Three applications required from the Code Test are built using JavaScript.
- To ease the checking for the result and code, kindly refer to the explanation of each application in below.

### Salary Conversion and Sensor Aggregation
- These two application were built following the MVC method using NodeJS, Express, etc. Therefore require installation of NodeJs and npm to run the application.
- To start the application:
  1. in terminal, cd to ..../CAD-IT Iot Centre/SalConv and SenAgg/
  2. npm install
  3. npm start

- For the output of Salary Conversion: 'http://localhost:5000/user/'

- For the output of Sensor Aggregation: 'http://localhost:5000/sensor/agg'

- For the algorithm/code can be found in the 'controllers' folder in each controller file.

- To ease the view, the output of both apps also saved in the folder 'Result' as json file.

### Sensor Streaming
- Refer to folder 'SenStream', run npm install
- First program file : 'streamSensorData.js'.
- the data is logged in '/SenStream/JSON Files/stream_sensor_data.json'

- Second program file : 'aggSensorData.js'.

- A combined file of the first and second program also created: 'StreamAndAgg.js'.

- Data visualization through html file ('index.html'), kindly use Live Server VS Code extension for dynamic visualization.

- the output of the html file is also saved in the folder 'Result'.
