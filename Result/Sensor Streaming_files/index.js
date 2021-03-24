fetch('./JSON Files/agg_sensor_data.json')
  .then(res => res.json())
  .then(data => {
    const avgTemp = JSON.stringify(data["Avg Sensors Value of All Rooms"]['Temperature']);
    const avgHum = JSON.stringify(data["Avg Sensors Value of All Rooms"]['Humidity']);

    document.querySelector("#avg-temp").innerText = avgTemp;
    document.querySelector("#avg-hum").innerText = avgHum;

    // Room 1 
    const roomAR1 = data['roomArea1'][0]
    var rowTemp = 
      `<tr>
        <td>Temperature</td>
        <td>${roomAR1['Temperature']['Min']}</td>
        <td>${roomAR1['Temperature']['Max']}</td>
        <td>${roomAR1['Temperature']['Median']}</td>
        <td>${roomAR1['Temperature']['Average']}</td>
      </tr>` 
      var rowHum = 
      `<tr>
        <td>Humidity</td>
        <td>${roomAR1['Humidity']['Min']}</td>
        <td>${roomAR1['Humidity']['Max']}</td>
        <td>${roomAR1['Humidity']['Median']}</td>
        <td>${roomAR1['Humidity']['Average']}</td>
      </tr>` 

    document.querySelector("#tb_AR1").innerHTML += rowTemp
    document.querySelector("#tb_AR1").innerHTML += rowHum

    // Room 2 
    const roomAR2 = data['roomArea2'][0]
    var rowTemp = 
      `<tr>
        <td>Temperature</td>
        <td>${roomAR2['Temperature']['Min']}</td>
        <td>${roomAR2['Temperature']['Max']}</td>
        <td>${roomAR2['Temperature']['Median']}</td>
        <td>${roomAR2['Temperature']['Average']}</td>
      </tr>` 
      var rowHum = 
      `<tr>
        <td>Humidity</td>
        <td>${roomAR2['Humidity']['Min']}</td>
        <td>${roomAR2['Humidity']['Max']}</td>
        <td>${roomAR2['Humidity']['Median']}</td>
        <td>${roomAR1['Humidity']['Average']}</td>
      </tr>` 

    document.querySelector("#tb_AR2").innerHTML += rowTemp
    document.querySelector("#tb_AR2").innerHTML += rowHum

    // Room 3 
    const roomAR3 = data['roomArea3'][0]
    var rowTemp = 
      `<tr>
        <td>Temperature</td>
        <td>${roomAR3['Temperature']['Min']}</td>
        <td>${roomAR3['Temperature']['Max']}</td>
        <td>${roomAR3['Temperature']['Median']}</td>
        <td>${roomAR3['Temperature']['Average']}</td>
      </tr>` 
      var rowHum = 
      `<tr>
        <td>Humidity</td>
        <td>${roomAR3['Humidity']['Min']}</td>
        <td>${roomAR3['Humidity']['Max']}</td>
        <td>${roomAR3['Humidity']['Median']}</td>
        <td>${roomAR3['Humidity']['Average']}</td>
      </tr>` 

    document.querySelector("#tb_AR3").innerHTML += rowTemp
    document.querySelector("#tb_AR3").innerHTML += rowHum

    // Room 4
    const roomAR4 = data['roomArea4'][0]
    var rowTemp = 
      `<tr>
        <td>Temperature</td>
        <td>${roomAR4['Temperature']['Min']}</td>
        <td>${roomAR4['Temperature']['Max']}</td>
        <td>${roomAR4['Temperature']['Median']}</td>
        <td>${roomAR4['Temperature']['Average']}</td>
      </tr>` 
      var rowHum = 
      `<tr>
        <td>Humidity</td>
        <td>${roomAR4['Humidity']['Min']}</td>
        <td>${roomAR4['Humidity']['Max']}</td>
        <td>${roomAR4['Humidity']['Median']}</td>
        <td>${roomAR4['Humidity']['Average']}</td>
      </tr>` 

    document.querySelector("#tb_AR4").innerHTML += rowTemp
    document.querySelector("#tb_AR4").innerHTML += rowHum

    // Room 5
    const roomAR5 = data['roomArea5'][0]
    var rowTemp = 
      `<tr>
        <td>Temperature</td>
        <td>${roomAR5['Temperature']['Min']}</td>
        <td>${roomAR5['Temperature']['Max']}</td>
        <td>${roomAR5['Temperature']['Median']}</td>
        <td>${roomAR5['Temperature']['Average']}</td>
      </tr>` 
      var rowHum = 
      `<tr>
        <td>Humidity</td>
        <td>${roomAR5['Humidity']['Min']}</td>
        <td>${roomAR5['Humidity']['Max']}</td>
        <td>${roomAR5['Humidity']['Median']}</td>
        <td>${roomAR5['Humidity']['Average']}</td>
      </tr>` 

    document.querySelector("#tb_AR5").innerHTML += rowTemp
    document.querySelector("#tb_AR5").innerHTML += rowHum



        





  })