const express = require("express");
const app = express()

require("dotenv").config();
const cors = require("cors");

const PORT = 3000

app.use(express.json())


const boards = require("./routes/routes.js");

app.use(cors());
app.use(express.json());
app.use("/boards", boards);

app.get('/', (req, res)=>{
    res.send('Welcome to the app')

})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})





