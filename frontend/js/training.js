// ========================================
// TRAINING DATA
// ========================================

let trainingRecords = [
{
    id: 1,
    employee: "Mayank",
    training: "Leadership Training",
    status: "Completed"
}
];

// ========================================
// ADD TRAINING
// ========================================

function addTraining(){

    const employee =
    document.getElementById(
    "trainingEmployee"
    ).value;

    const training =
    document.getElementById(
    "trainingName"
    ).value;

    const status =
    document.getElementById(
    "trainingStatus"
    ).value;

    if(
        employee === "" ||
        training === ""
    ){
        alert(
        "Please fill all fields"
        );
        return;
    }

    trainingRecords.push({

        id: Date.now(),

        employee,

        training,

        status

    });

    loadTraining();

}

function loadTraining(){

    const tbody =
    document.querySelector(
    "#trainingTable tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    trainingRecords.forEach(record=>{

        tbody.innerHTML += `

        <tr>

            <td>${record.id}</td>

            <td>${record.employee}</td>

            <td>${record.training}</td>

            <td>${record.status}</td>

            <td>

                <button
                onclick="deleteTraining(${record.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

function deleteTraining(id){

    trainingRecords =
    trainingRecords.filter(
    record => record.id !== id
    );

    loadTraining();

}