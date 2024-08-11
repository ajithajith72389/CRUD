

const express = require("express");
const sampleUser = require("./sampleUser.json");
//const users_100 = require("./users_100.json");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(express.json());
const port = 8000
app.use(cors(
//     {
//     origin: "http://localhost:5173/",
//     methods: ["GET", "POST", "PATCH", "DELETE"]
// }
))

app.get("/user", (req, res)=>{
    return res.json(sampleUser)
})


app.delete("/user/:id", (req, res)=>{
    let id = Number(req.params.id)
    let filterdUser = sampleUser.filter((user)=> user.id !== id)
    fs.writeFile("./sampleUser.json", JSON.stringify(filterdUser), (err, data)=>{
        return res.json(filterdUser)
    })
})


app.post("/user", (req, res)=>{
    let {name, age, city} = req.body
    if( !name || !age || !city ) {
        res.status(400).send("Required all the field")
    }
    let id = Date.now()
    sampleUser.push({id, name, age, city})
    fs.writeFile("./sampleUser.json", JSON.stringify(sampleUser), (err, data)=>{
        return res.json({"Messages": "User Details add Successfully"})
    })

})


app.patch("/user/:id", (req, res) => {
    let id = Number(req.params.id)
    let {name, age, city} = req.body
    if (!name || !age || !city) {
        res.status(400).send("Required all the field")
    }
    let index = sampleUser.findIndex((user)=> user.id === id)
    sampleUser.splice(index, 1, {...req.body})
    fs.writeFile("./sampleUser.json", JSON.stringify(sampleUser), (err, data) => {
        return res.json({ "Messages": "User Details updated Successfully" })
    })

})



app.listen(port, (err)=>{
    console.log(`App is running port ${port}`);
});