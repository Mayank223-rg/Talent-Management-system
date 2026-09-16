let employees = [];

// ==============================
// LOAD EMPLOYEES
// ==============================

async function fetchEmployees(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/employees"
        );

        employees = await response.json();

        loadEmployees();

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// ADD EMPLOYEE
// ==============================

async function addEmployee(){

    const employee = {

        name:
        document.getElementById("name").value,

        email:
        document.getElementById("email").value,

        department:
        document.getElementById("department").value,

        designation:
        document.getElementById("designation").value,

        salary:
        document.getElementById("salary").value

    };

    try{

        const response = await fetch(

            "http://localhost:5000/api/employees",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(employee)

            }

        );

        const result =
        await response.json();

        if(result.success){

            alert(
                "Employee Added Successfully"
            );

            fetchEmployees();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// DELETE EMPLOYEE
// ==============================

async function deleteEmployee(id){

    const confirmDelete =
    confirm(
        "Delete this employee?"
    );

    if(!confirmDelete) return;

    try{

        const response = await fetch(

            `http://localhost:5000/api/employees/${id}`,

            {

                method:"DELETE"

            }

        );

        const result =
        await response.json();

        if(result.success){

            fetchEmployees();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// DISPLAY EMPLOYEES
// ==============================

function loadEmployees(){

    const tbody =
    document.querySelector(
    "#employeeTable tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    employees.forEach(emp=>{

        tbody.innerHTML += `

        <tr>

            <td>${emp.emp_id}</td>

            <td>

                <div class="employee-info">

                    <img
                    src="https://i.pravatar.cc/40?u=${emp.email}"
                    class="employee-avatar">

                    <span>

                        ${emp.emp_name}

                    </span>

                </div>

            </td>

            <td>${emp.email}</td>

            <td>${emp.department}</td>

            <td>${emp.designation}</td>

            <td>${emp.salary}</td>

            <td>

    <button

    onclick=
    "editEmployee(
    ${emp.emp_id}
    )"

    style="
    background:#3b82f6;
    color:white;
    border:none;
    padding:8px 12px;
    border-radius:8px;
    margin-right:5px;
    ">

    Edit

    </button>

    <button

    onclick=
    "deleteEmployee(
    ${emp.emp_id}
    )"

    class="delete-btn">

    Delete

    </button>

</td>

        </tr>

        `;

    });

}

// ==============================
// SEARCH
// ==============================

function searchEmployee(){

    const keyword =

    document
    .getElementById(
    "searchEmployee"
    )
    .value
    .toLowerCase();

    const rows =

    document.querySelectorAll(
    "#employeeTable tbody tr"
    );

    rows.forEach(row=>{

        const text =
        row.innerText.toLowerCase();

        row.style.display =

        text.includes(keyword)

        ? ""

        : "none";

    });

}

fetchEmployees();
async function editEmployee(id){

    const employee =

    employees.find(

        emp=>emp.emp_id==id

    );

    const name =
    prompt(
    "Employee Name",
    employee.emp_name
    );

    const email =
    prompt(
    "Email",
    employee.email
    );

    const department =
    prompt(
    "Department",
    employee.department
    );

    const designation =
    prompt(
    "Designation",
    employee.designation
    );

    const salary =
    prompt(
    "Salary",
    employee.salary
    );

    try{

        const response =
        await fetch(

        `http://localhost:5000/api/employees/${id}`,

        {

            method:"PUT",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:JSON.stringify({

                name,
                email,
                department,
                designation,
                salary

            })

        }

        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Employee Updated"
            );

            fetchEmployees();

        }

    }

    catch(error){

        console.log(error);

    }

}