const express = require("express")
const app = express()

let halls =[];
//middleware
app.use(express.json())

app.post("/hall",function(req,res){
    req.body.id=halls.length+1;
    halls.push(req.body);
    res.json("hall created successfully");
});

app.get("/halls",function(req,res){
    res.json(halls)
    console.log(halls)
})






app.listen(3001)


