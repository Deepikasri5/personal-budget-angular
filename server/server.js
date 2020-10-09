const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const cors = require('cors');

var budgetData = fs.readFileSync("budget.json", "utf-8");
var budgetjson = JSON.parse(budgetData);

app.use(cors());


app.get('/budget', (req, res) => {
    res.json(budgetjson);
});


app.listen(port, () => {
console.log(`Server Running on Port: http://localhost:${port}`);
});