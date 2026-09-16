let payrollRecords = [];

// ==============================
// LOAD PAYROLL
// ==============================

async function fetchPayroll(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/payroll"
        );

        payrollRecords =
        await response.json();

        loadPayroll();

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// GENERATE PAYROLL
// ==============================

async function addPayroll(){

    const payroll = {

        employee:
        document.getElementById(
        "payrollEmployee"
        ).value,

        basicSalary:
        Number(
        document.getElementById(
        "basicSalary"
        ).value
        )

    };

    try{

        const response = await fetch(

            "http://localhost:5000/api/payroll",

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify(
                    payroll
                )

            }

        );

        const result =
        await response.json();

        if(result.success){

            alert(
                "Payroll Generated"
            );

            fetchPayroll();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// DELETE PAYROLL
// ==============================

async function deletePayroll(id){

    if(
        !confirm(
        "Delete Payroll?"
        )
    ) return;

    try{

        const response = await fetch(

            `http://localhost:5000/api/payroll/${id}`,

            {

                method:"DELETE"

            }

        );

        const result =
        await response.json();

        if(result.success){

            fetchPayroll();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// DISPLAY PAYROLL
// ==============================

function loadPayroll(){

    const tbody =

    document.querySelector(
    "#payrollTable tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    payrollRecords.forEach(record=>{

        tbody.innerHTML += `

        <tr>

            <td>
                ${record.payroll_id}
            </td>

            <td>
                ${record.employee_name}
            </td>

            <td>
                ₹${record.basic_salary}
            </td>

            <td>
                ${record.present_days}
            </td>

            <td>
                ${record.absent_days}
            </td>

            <td>
                ₹${Number(
                    record.net_salary
                ).toFixed(2)}
            </td>

            <td>

                <button

                onclick=
                "deletePayroll(
                ${record.payroll_id}
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
// INITIAL LOAD
// ==============================

fetchPayroll();