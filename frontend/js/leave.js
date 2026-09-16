let leaveRecords = [];

// ==============================
// LOAD LEAVES
// ==============================

async function fetchLeaves(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/leaves"
        );

        leaveRecords =
        await response.json();

        loadLeaves();

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// APPLY LEAVE
// ==============================

async function applyLeave(){

    const leave = {

        employee:
        document.getElementById(
        "leaveEmployee"
        ).value,

        leaveType:
        document.getElementById(
        "leaveType"
        ).value,

        startDate:
        document.getElementById(
        "leaveStartDate"
        ).value,

        endDate:
        document.getElementById(
        "leaveEndDate"
        ).value

    };

    try{

        const response = await fetch(

            "http://localhost:5000/api/leaves",

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify(
                    leave
                )

            }

        );

        const result =
        await response.json();

        if(result.success){

            alert(
                "Leave Applied"
            );

            fetchLeaves();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// APPROVE LEAVE
// ==============================

async function approveLeave(id){

    try{

        const response = await fetch(

            `http://localhost:5000/api/leaves/approve/${id}`,

            {

                method:"PUT"

            }

        );

        const result =
        await response.json();

        if(result.success){

            fetchLeaves();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// DELETE LEAVE
// ==============================

async function deleteLeave(id){

    if(
        !confirm(
        "Delete Leave?"
        )
    ) return;

    try{

        const response = await fetch(

            `http://localhost:5000/api/leaves/${id}`,

            {

                method:"DELETE"

            }

        );

        const result =
        await response.json();

        if(result.success){

            fetchLeaves();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// DISPLAY LEAVES
// ==============================

function loadLeaves(){

    const tbody =
    document.querySelector(
    "#leaveTable tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    leaveRecords.forEach(record=>{

        tbody.innerHTML += `

        <tr>

            <td>${record.leave_id}</td>

            <td>${record.employee_name}</td>

            <td>${record.leave_type}</td>

            <td>${record.start_date}</td>

            <td>${record.end_date}</td>

            <td>${record.status}</td>

            <td>

                <button

                onclick=
                "approveLeave(
                ${record.leave_id}
                )"

                style="
                background:#10b981;
                color:white;
                border:none;
                padding:8px 12px;
                border-radius:8px;
                margin-right:5px;
                ">

                Approve

                </button>

                <button

                onclick=
                "deleteLeave(
                ${record.leave_id}
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

fetchLeaves();