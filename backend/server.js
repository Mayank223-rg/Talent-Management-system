console.log("MY SERVER FILE IS RUNNING");
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.send("Server Working");

});

// =========================
// GET EMPLOYEES
// =========================

app.get("/api/employees", (req, res) => {

    const query = `
        SELECT *
        FROM employees
    `;

    db.query(query, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json(err);

        }

        res.json(result);

    });

});

// =========================
// ADD EMPLOYEE
// =========================
app.post("/api/employees", (req, res) => {

    console.log("POST ROUTE HIT");

    const {
        name,
        email,
        department,
        designation,
        salary
    } = req.body;

    const query = `
        INSERT INTO employees
        (
            emp_name,
            email,
            department,
            designation,
            salary
        )
        VALUES
        (?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            name,
            email,
            department,
            designation,
            salary
        ],
        (err, result) => {

            if(err){

                console.log(err);

                return res.status(500).json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }
    );

});
app.post("/testpost", (req, res) => {

    console.log("TEST POST WORKING");

    res.json({
        success: true
    });

});
// =========================
// DELETE EMPLOYEE
// =========================

app.delete("/api/employees/:id",

(req,res)=>{

    const id =
    req.params.id;

    const query =
    `
    DELETE FROM employees
    WHERE emp_id=?
    `;

    db.query(

        query,

        [id],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
// =========================
// GET CANDIDATES
// =========================

app.get("/api/candidates", (req, res) => {

    const query = `
        SELECT *
        FROM candidates
    `;

    db.query(query, (err, result) => {

        if(err){

            console.log(err);

            return res.status(500).json(err);

        }

        res.json(result);

    });

});
// =========================
// ADD CANDIDATE
// =========================

app.post("/api/candidates", (req, res) => {

    const {

        name,
        email,
        department,
        designation

    } = req.body;

    const query = `
        INSERT INTO candidates
        (
            candidate_name,
            email,
            department,
            designation,
            status
        )
        VALUES
        (?, ?, ?, ?, ?)
    `;

    db.query(

        query,

        [
            name,
            email,
            department,
            designation,
            "Pending"
        ],

        (err, result) => {

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
// =========================
// DELETE CANDIDATE
// =========================

app.delete("/api/candidates/:id",

(req,res)=>{

    const id =
    req.params.id;

    const query =
    `
    DELETE FROM candidates
    WHERE candidate_id=?
    `;

    db.query(

        query,

        [id],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
// =========================
// ACCEPT CANDIDATE
// =========================

app.put("/api/candidates/accept/:id",

(req,res)=>{

    const id =
    req.params.id;

    const getCandidateQuery = `
        SELECT *
        FROM candidates
        WHERE candidate_id = ?
    `;

    db.query(

        getCandidateQuery,

        [id],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            if(result.length===0){

                return res.json({
                    success:false
                });

            }

            const candidate =
            result[0];

            const insertEmployeeQuery = `
                INSERT INTO employees
                (
                    emp_name,
                    email,
                    department,
                    designation,
                    salary
                )
                VALUES
                (?, ?, ?, ?, ?)
            `;

            db.query(

                insertEmployeeQuery,

                [

                    candidate.candidate_name,
                    candidate.email,
                    candidate.department,
                    candidate.designation,
                    30000

                ],

                (err2)=>{

                    if(err2){

                        console.log(err2);

                        return res.json({
                            success:false
                        });

                    }

                    const updateStatusQuery = `
                        UPDATE candidates
                        SET status='Accepted'
                        WHERE candidate_id=?
                    `;

                    db.query(

                        updateStatusQuery,

                        [id],

                        ()=>{

                            res.json({
                                success:true
                            });

                        }

                    );

                }

            );

        }

    );

});
// =========================
// DASHBOARD STATS
// =========================

app.get("/api/dashboard-stats",

(req,res)=>{

    const stats = {};

    db.query(

        "SELECT COUNT(*) AS totalEmployees FROM employees",

        (err,result)=>{

            stats.totalEmployees =
            result[0].totalEmployees;

            db.query(

                "SELECT COUNT(*) AS totalCandidates FROM candidates",

                (err2,result2)=>{

                    stats.totalCandidates =
                    result2[0].totalCandidates;

                    db.query(

                        "SELECT COUNT(*) AS totalAttendance FROM attendance",

                        (err3,result3)=>{

                            stats.totalAttendance =
                            result3[0].totalAttendance;

                            db.query(

                                "SELECT COUNT(*) AS totalPayroll FROM payroll",

                                (err4,result4)=>{

                                    stats.totalPayroll =
                                    result4[0].totalPayroll;

                                    db.query(

                                        "SELECT COUNT(*) AS totalLeaves FROM leaves",

                                        (err5,result5)=>{

                                            stats.totalLeaves =
                                            result5[0].totalLeaves;

                                            db.query(

                                                `
                                                SELECT COUNT(*) AS accepted
                                                FROM candidates
                                                WHERE status='Accepted'
                                                `,

                                                (err6,result6)=>{

                                                    stats.accepted =
                                                    result6[0].accepted;

                                                    db.query(

                                                        `
                                                        SELECT COUNT(*) AS pending
                                                        FROM candidates
                                                        WHERE status='Pending'
                                                        `,

                                                        (err7,result7)=>{

                                                            stats.pending =
                                                            result7[0].pending;

                                                            res.json(stats);

                                                        }

                                                    );

                                                }

                                            );

                                        }

                                    );

                                }

                            );

                        }

                    );

                }

            );

        }

    );

});
// =========================
// GET ATTENDANCE
// =========================

app.get("/api/attendance",

(req,res)=>{

    db.query(

        "SELECT * FROM attendance",

        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

});
// =========================
// ADD ATTENDANCE
// =========================

app.post("/api/attendance",

(req,res)=>{

    const {

        employee,
        date,
        status

    } = req.body;

    const query = `
        INSERT INTO attendance
        (
            employee_name,
            attendance_date,
            status
        )
        VALUES
        (?, ?, ?)
    `;

    db.query(

        query,

        [
            employee,
            date,
            status
        ],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
// =========================
// DELETE ATTENDANCE
// =========================

app.delete("/api/attendance/:id",

(req,res)=>{

    const id =
    req.params.id;

    db.query(

        `
        DELETE FROM attendance
        WHERE attendance_id=?
        `,

        [id],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
// =========================
// GET PAYROLL
// =========================

app.get("/api/payroll",

(req,res)=>{

    db.query(

        "SELECT * FROM payroll",

        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

});
// =========================
// GENERATE PAYROLL
// =========================

app.post("/api/payroll",

(req,res)=>{

    const {

        employee,
        basicSalary

    } = req.body;

    db.query(

        `
        SELECT *
        FROM attendance
        WHERE employee_name=?
        `,

        [employee],

        (err,attendance)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            const presentDays =

            attendance.filter(

                record=>

                record.status ===
                "Present"

            ).length;

            const absentDays =

            attendance.filter(

                record=>

                record.status ===
                "Absent"

            ).length;

            const totalDays =

            presentDays +
            absentDays;

            let netSalary =
            basicSalary;

            if(totalDays>0){

                netSalary =

                (
                basicSalary /
                totalDays
                )
                *
                presentDays;

            }

            db.query(

                `
                INSERT INTO payroll
                (
                    employee_name,
                    basic_salary,
                    present_days,
                    absent_days,
                    net_salary
                )
                VALUES
                (?, ?, ?, ?, ?)
                `,

                [

                    employee,

                    basicSalary,

                    presentDays,

                    absentDays,

                    netSalary

                ],

                (err2)=>{

                    if(err2){

                        console.log(err2);

                        return res.json({
                            success:false
                        });

                    }

                    res.json({
                        success:true
                    });

                }

            );

        }

    );

});
// =========================
// DELETE PAYROLL
// =========================

app.delete("/api/payroll/:id",

(req,res)=>{

    db.query(

        `
        DELETE FROM payroll
        WHERE payroll_id=?
        `,

        [req.params.id],

        (err)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
app.get("/api/leaves",

(req,res)=>{

    db.query(

        "SELECT * FROM leaves",

        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

});
app.post("/api/leaves",

(req,res)=>{

    const {

        employee,
        leaveType,
        startDate,
        endDate

    } = req.body;

    const query = `

        INSERT INTO leaves

        (

            employee_name,
            leave_type,
            start_date,
            end_date,
            status

        )

        VALUES

        (?, ?, ?, ?, 'Pending')

    `;

    db.query(

        query,

        [

            employee,
            leaveType,
            startDate,
            endDate

        ],

        (err)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
app.delete("/api/leaves/:id",

(req,res)=>{

    db.query(

        `

        DELETE FROM leaves

        WHERE leave_id=?

        `,

        [req.params.id],

        (err)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
// =========================
// UPDATE EMPLOYEE
// =========================

app.put("/api/employees/:id",

(req,res)=>{

    const id =
    req.params.id;

    const {

        name,
        email,
        department,
        designation,
        salary

    } = req.body;

    const query = `

        UPDATE employees

        SET

        emp_name=?,
        email=?,
        department=?,
        designation=?,
        salary=?

        WHERE emp_id=?

    `;

    db.query(

        query,

        [

            name,
            email,
            department,
            designation,
            salary,
            id

        ],

        (err)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
// =========================
// UPDATE CANDIDATE
// =========================

app.put("/api/candidates/:id",

(req,res)=>{

    const id =
    req.params.id;

    const {

        name,
        email,
        department,
        designation

    } = req.body;

    const query = `

        UPDATE candidates

        SET

        candidate_name=?,
        email=?,
        department=?,
        designation=?

        WHERE candidate_id=?

    `;

    db.query(

        query,

        [

            name,
            email,
            department,
            designation,
            id

        ],

        (err)=>{

            if(err){

                console.log(err);

                return res.json({
                    success:false
                });

            }

            res.json({
                success:true
            });

        }

    );

});
app.listen(5000, () => {

    console.log(
        "Server Running On Port 5000"
    );

});