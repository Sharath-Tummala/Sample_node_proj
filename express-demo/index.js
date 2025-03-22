const express = require('express');
const app = express();

app.use(express.json());

const sensors = [
    {id:1, name:'Engine Temperature'},
    {id:2, name:'Speed'},
    {id:3, name:'Tyre Pressure'}
];

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.get('/api/sensors' , (req,res)=>{
    res.send(sensors);
})

app.get('/api/sensors/:id' , (req,res)=>{
    const sensor = sensors.find(s=>s.id === parseInt(req.params.id));
    if(!sensor) res.status(404).send('The sensor with the given ID was not found');
    res.send(sensor);
})

app.post('/api/sensors/' , (req,res)=>{
    const sensor ={
        id: sensors.length+1,
        name: req.body.name
    };
    sensors.push(sensor);
    res.send(sensor);
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`);
})