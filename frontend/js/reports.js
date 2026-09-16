// ==============================
// CSV EXPORT FUNCTION
// ==============================

function downloadCSV(filename, data){

    let csv = "";

    data.forEach(row => {

        csv += row.join(",") + "\n";

    });

    const blob = new Blob(
        [csv],
        {type:"text/csv"}
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    filename;

    link.click();

}

// ==============================
// EMPLOYEE REPORT
// ==============================

function exportEmployees(){

    const data = [

        [
            "ID",
            "Name",
            "Email",
            "Department",
            "Designation",
            "Salary"
        ]

    ];

   employees.forEach(emp=>{

    data.push([

        emp.emp_id,
        emp.emp_name,
        emp.email,
        emp.department,
        emp.designation,
        emp.salary

    ]);

});

    downloadCSV(
    "employees.csv",
    data
    );

}

// ==============================
// ATTENDANCE REPORT
// ==============================

function exportAttendance(){

    const data = [

        [
            "ID",
            "Employee",
            "Date",
            "Status"
        ]

    ];

    attendanceRecords.forEach(record=>{

        data.push([

            record.id,
            record.employee,
            record.date,
            record.status

        ]);

    });

    downloadCSV(
    "attendance.csv",
    data
    );

}

// ==============================
// PAYROLL REPORT
// ==============================

function exportPayroll(){

    const data = [

        [
            "ID",
            "Employee",
            "Basic Salary",
            "Bonus",
            "Deduction",
            "Net Salary"
        ]

    ];

    payrollRecords.forEach(record=>{

        data.push([

            record.id,
            record.employee,
            record.basicSalary,
            record.bonus,
            record.deduction,
            record.netSalary

        ]);

    });

    downloadCSV(
    "payroll.csv",
    data
    );

}