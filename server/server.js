const path = require('path');
const express = require('express');

var publicPath = path.join(__dirname,'../public');
var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.get('/',(req,res)=>{
    res.send('/index.html');
});

app.listen(port,()=>{
    console.log(`Server is starten on port: ${port}`);
});