const fetch = require('node-fetch');

class SalConController{

  async getAll(req,res) { 

    // Fetching user data from 'http://jsonplaceholder.typicode.com/users'
    const url = 'http://jsonplaceholder.typicode.com/users';

    // Create Variable to store the fetched data
    const response = await fetch(url);
    const userData = await response.json();


    // Fetching salary data from 'JSON Files' folder, which the file already moved to folder data
    const salary = require('../../JSON Files/salary_data.json').array

    // Check the length of the user data info
    const len = Object.keys(userData).length

    // Get all the IDs into an array
    let salaryIDs = []
    Object.keys(salary).map((key,index) => {
      salaryIDs.push(salary[key].id)
    })

    // Empty array to combine the two data
    let userSalData = [];

    // Empty salary in case there is user data which dont have the salary information
    let emptySalary = {
      "salaryInIDR" : '-'
    }

    // Loop through the userData to combine two data
    for (let i=0; i<len; i++) {
      if (salaryIDs.includes(userData[i].id)) {
        let objContainer = salary.filter((x) => x.id == userData[i].id)
        userSalData.push(Object.assign(userData[i],objContainer[0]))
      } else {
        userSalData.push(Object.assign(userData[i],emptySalary))
      }
    }
   
    // Removing keys : 'website' and 'company' as not required
    for (let i=0;i<userSalData.length;i++) {
      delete userSalData[i].website
      delete userSalData[i].company
    }

    // Fetch Currency Converter API
    const responseCurr = await fetch('https://free.currconv.com/api/v7/convert?q=IDR_USD&compact=ultra&apiKey=2fc300338a9a4ca48281')
    const jsonCurr = await responseCurr.json()
    const curr = Object.values(jsonCurr)[0]

    // Add new properties 'salaryInUSD' to the data
    userSalData.map((x) => x.salaryInUSD = x.salaryInIDR * curr)

    // Incase want to round the salary value in the data
    // userSalData.map((x) => {x.salaryInIDR = Math.round(x.salaryInIDR); x.salaryInUSD = Math.round(x.salaryInUSD)})

    res.json({
      'Salary Conversion Data': userSalData
    })
  }
  
  async getOne(req,res) {
    // Fetch the endpoint from getAll 
    const response = await fetch('http://localhost:5000/user/')
    const userSalData = await response.json();

    // Save the req.params.id as a variable
    const ID = req.params.id

    // Filter the data where the id equal the req.params.id
    const result = userSalData['Salary Conversion Data'].filter((x) => x.id == ID)
    
    res.json({
      'Salary Conversion Data': result
    })

  }

}

module.exports = new SalConController;


