let attendanceRecords = [];

// ==============================
// LOAD ATTENDANCE
// ==============================

async function fetchAttendance(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/attendance"
        );

        attendanceRecords =
        await response.json();

        loadAttendance();

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// ADD ATTENDANCE
// ==============================

async function addAttendance(){

    const attendance = {

        employee:
        document.getElementById(
        "attendanceEmployee"
        ).value,

        date:
        document.getElementById(
        "attendanceDate"
        ).value,

        status:
        document.getElementById(
        "attendanceStatus"
        ).value

    };

    try{

        const response = await fetch(

            "http://localhost:5000/api/attendance",

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify(
                    attendance
                )

            }

        );

        const result =
        await response.json();

        if(result.success){

            alert(
                "Attendance Added"
            );

            fetchAttendance();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// DELETE ATTENDANCE
// ==============================

async function deleteAttendance(id){

    if(
        !confirm(
        "Delete Attendance?"
        )
    ) return;

    try{

        const response = await fetch(

            `http://localhost:5000/api/attendance/${id}`,

            {

                method:"DELETE"

            }

        );

        const result =
        await response.json();

        if(result.success){

            fetchAttendance();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// DISPLAY ATTENDANCE
// ==============================

function loadAttendance(){

    const tbody =

    document.querySelector(
    "#attendanceTable tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    attendanceRecords.forEach(record=>{

        tbody.innerHTML += `

        <tr>

            <td>
                ${record.attendance_id}
            </td>

            <td>
                ${record.employee_name}
            </td>

            <td>
                ${record.attendance_date}
            </td>

            <td>
                ${record.status}
            </td>

            <td>

                <button

                onclick=
                "deleteAttendance(
                ${record.attendance_id}
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

fetchAttendance();