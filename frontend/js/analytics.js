async function loadAnalytics(){

    const container =
    document.getElementById(
        "analyticsContent"
    );

    container.innerHTML = `

<div class="analytics-cards">

    <div class="analytics-card">

        <h3>Total Employees</h3>

        <p id="analyticsEmployees">
        0
        </p>

    </div>

    <div class="analytics-card">

        <h3>Total Candidates</h3>

        <p id="analyticsCandidates">
        0
        </p>

    </div>

    <div class="analytics-card">

        <h3>Accepted</h3>

        <p id="analyticsAccepted">
        0
        </p>

    </div>

    <div class="analytics-card">

        <h3>Pending</h3>

        <p id="analyticsPending">
        0
        </p>

    </div>

</div>

<br>

<div class="analytics-grid">

        <div class="chart-box">

            <h3>Employees vs Candidates</h3>

            <canvas id="employeeChart"></canvas>

        </div>

        <div class="chart-box">

            <h3>Attendance Status</h3>

            <canvas id="attendanceChart"></canvas>

        </div>

        <div class="chart-box">

            <h3>Recruitment Status</h3>

            <canvas id="recruitmentChart"></canvas>

        </div>

    </div>

    `;

    try{

        // =========================
        // DASHBOARD STATS
        // =========================

        const statsResponse =
        await fetch(
        "http://localhost:5000/api/dashboard-stats"
        );

        const stats =
        await statsResponse.json();

        document.getElementById(
"analyticsEmployees"
).innerText =
stats.totalEmployees;

document.getElementById(
"analyticsCandidates"
).innerText =
stats.totalCandidates;

document.getElementById(
"analyticsAccepted"
).innerText =
stats.accepted;

document.getElementById(
"analyticsPending"
).innerText =
stats.pending;

        // =========================
        // EMPLOYEE CHART
        // =========================

        new Chart(

            document.getElementById(
            "employeeChart"
            ),

            {

                type:"bar",

                data:{

                    labels:[
                        "Employees",
                        "Candidates"
                    ],

                    datasets:[{

                        label:"Count",

                        data:[

                            stats.totalEmployees,
                            stats.totalCandidates

                        ]

                    }]

                }

            }

        );

        // =========================
        // ATTENDANCE CHART
        // =========================

        const attendanceResponse =
        await fetch(
        "http://localhost:5000/api/attendance"
        );

        const attendance =
        await attendanceResponse.json();

        const present =

        attendance.filter(

            a=>a.status==="Present"

        ).length;

        const absent =

        attendance.filter(

            a=>a.status==="Absent"

        ).length;

        new Chart(

            document.getElementById(
            "attendanceChart"
            ),

            {

                type:"pie",

                data:{

                    labels:[
                        "Present",
                        "Absent"
                    ],

                    datasets:[{

                        data:[
                            present,
                            absent
                        ]

                    }]

                }

            }

        );

        // =========================
        // RECRUITMENT CHART
        // =========================

        new Chart(

            document.getElementById(
            "recruitmentChart"
            ),

            {

                type:"doughnut",

                data:{

                    labels:[
                        "Accepted",
                        "Pending"
                    ],

                    datasets:[{

                        data:[

                            stats.accepted,
                            stats.pending

                        ]

                    }]

                }

            }

        );

    }

    catch(error){

        console.log(error);

    }

}