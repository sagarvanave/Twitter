const express = require('express');
const app = express();
const port = 3000;

//Starting Server
const server = app.listen(port, () => console.log("Server listening on port " + port));

app.get("/",(req, res) => {
    res.send("Hello there, <br> This is simple twitter app");
});