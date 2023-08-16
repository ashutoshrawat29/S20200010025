const express = require('express');
const app = express();
const port = 5000;
const axios = require('axios');

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/getTrains',async (req,res)=>{
    const data = await axios.post('http://20.244.56.144/train/auth',
        {
            "companyName": "Train Central",
            "clientID": "551633ae-5494-4bd5-9687-b4168934c7a4",
            "clientSecret": "OkBMjggSxegnFqOF",
            "ownerName": "Ashutosh Rawat",
            "ownerEmail": "ashutosh.r20@iiits.in",
            "rollNo": "S20200010025"
        }
    )
    console.log(data.data);
    axios.get('http://20.244.56.144/train/trains',{
        headers: {
            'Authorization': `Bearer ${data.data.access_token}`
        }}).then(response => {
    console.log('Fetched data:', response.data);
    return res.send(response.data)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

})
app.get('/getTrains/:id',async (req,res)=>{
    const data = await axios.post('http://20.244.56.144/train/auth',
        {
            "companyName": "Train Central",
            "clientID": "551633ae-5494-4bd5-9687-b4168934c7a4",
            "clientSecret": "OkBMjggSxegnFqOF",
            "ownerName": "Ashutosh Rawat",
            "ownerEmail": "ashutosh.r20@iiits.in",
            "rollNo": "S20200010025"
        }
    )
    console.log(data.data);
    axios.get('http://20.244.56.144/train/trains/' + req.params.id,{
        headers: {
            'Authorization': `Bearer ${data.data.access_token}`
        }}).then(response => {
    console.log('Fetched data:', response.data);
    return res.send(response.data)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
