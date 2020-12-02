const path = require('path')
const express = require('express');


const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath)
// app.use(esxpress.JSON());
app.use(express.static(publicDirectoryPath));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
