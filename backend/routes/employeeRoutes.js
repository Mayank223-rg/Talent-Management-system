const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{

    res.send("Server Working");

});

app.get("/api/employees",(req,res)=>{

    const query =
    `
    SELECT *
    FROM employees
    `;

    db.query(

        query,

        (err,result)=>{

            if(err){

                return res
                .status(500)
                .json(err);

            }

            res.json(result);

        }

    );

});

app.listen(5000,()=>{

    console.log(
    "Server Running On Port 5000"
    );

});