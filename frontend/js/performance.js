// ========================================
// PERFORMANCE DATA
// ========================================

let performanceRecords = [
{
    id: 1,
    employee: "Mayank",
    rating: 8,
    kpi: 85,
    comments: "Excellent Performance"
}
];

// ========================================
// ADD PERFORMANCE
// ========================================

function addPerformance(){

    const employee =
    document.getElementById(
    "performanceEmployee"
    ).value;

    const rating =
    document.getElementById(
    "performanceRating"
    ).value;

    const kpi =
    document.getElementById(
    "performanceKPI"
    ).value;

    const comments =
    document.getElementById(
    "performanceComments"
    ).value;

    if(
        employee === "" ||
        rating === "" ||
        kpi === ""
    ){

        alert(
        "Please fill all fields"
        );

        return;
    }

    performanceRecords.push({

        id: Date.now(),

        employee,

        rating,

        kpi,

        comments

    });

    loadPerformance();

}

function loadPerformance(){

    const tbody =
    document.querySelector(
    "#performanceTable tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    performanceRecords.forEach(record=>{

        tbody.innerHTML += `

        <tr>

            <td>${record.id}</td>

            <td>${record.employee}</td>

            <td>${record.rating}</td>

            <td>${record.kpi}%</td>

            <td>${record.comments}</td>

            <td>

                <button
                onclick="deletePerformance(${record.id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

}

function deletePerformance(id){

    performanceRecords =
    performanceRecords.filter(
    record => record.id !== id
    );

    loadPerformance();

}

function getPerformanceBonus(employeeName){

    const records =

    performanceRecords.filter(

    record =>

    record.employee === employeeName

    );

    if(records.length === 0){

        return 0;

    }

    const latestRecord =

    records[records.length - 1];

    const rating =

    Number(
    latestRecord.rating
    );

    if(rating >= 9){

        return 5000;

    }

    else if(rating >= 7){

        return 3000;

    }

    else if(rating >= 5){

        return 1000;

    }

    return 0;

}