// ========================================
// FEEDBACK DATA
// ========================================

let feedbackRecords = [
{
    id: 1,
    employee: "Mayank",
    feedback: "Need more training sessions",
    status: "Pending"
}
];

// ========================================
// ADD FEEDBACK
// ========================================

function addFeedback(){

    const employee =
    document.getElementById(
    "feedbackEmployee"
    ).value;

    const feedback =
    document.getElementById(
    "feedbackText"
    ).value;

    if(
        employee === "" ||
        feedback === ""
    ){

        alert(
        "Please fill all fields"
        );

        return;
    }

    feedbackRecords.push({

        id: Date.now(),

        employee,

        feedback,

        status: "Pending"

    });

    loadFeedback();

    document.getElementById(
    "feedbackEmployee"
    ).value = "";

    document.getElementById(
    "feedbackText"
    ).value = "";

}

// ========================================
// LOAD FEEDBACK
// ========================================

function loadFeedback(){

    const tbody =
    document.querySelector(
    "#feedbackTable tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    feedbackRecords.forEach(record=>{

        tbody.innerHTML += `

        <tr>

            <td>${record.id}</td>

            <td>${record.employee}</td>

            <td>${record.feedback}</td>

           <td>

<span class="
status-${record.status.toLowerCase()}
">

${record.status}

</span>

</td>

            <td>

                <button
                onclick="resolveFeedback(${record.id})">

                Resolve

                </button>

            </td>

        </tr>

        `;

    });

}

// ========================================
// RESOLVE FEEDBACK
// ========================================

function resolveFeedback(id){

    feedbackRecords.forEach(record=>{

        if(record.id === id){

            record.status =
            "Resolved";

        }

    });

    loadFeedback();

}