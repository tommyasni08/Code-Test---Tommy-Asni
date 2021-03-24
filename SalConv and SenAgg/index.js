// Import Modules
const express = require('express');

const app = express(); 

// Local host port number
const PORT = process.env.PORT || 5000; 

// // Test to make sure the localhost route running
// app.get('/', (req,res) => {
//   res.send('Test')
// });

const salConRoutes = require('./routes/salConRoutes.js')
const senAggRoutes = require('./routes/senAggRoutes.js')

app.use('/user', salConRoutes);
app.use('/sensor/agg', senAggRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost: ${PORT}/`));

