const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/frontend'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/frontend/index.html'));});
app.listen(8080 || process.env.PORT, () => {
  console.log(`Listen on port: ${process.env.PORT}`);
});