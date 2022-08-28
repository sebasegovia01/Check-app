const express = require('express');
require('dotenv').config();

const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/frontend'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/frontend/index.html'));});
app.listen(process.env.PORT || 8080, () => {
  console.log(`Listen on port: ${process.env.PORT}`);
});