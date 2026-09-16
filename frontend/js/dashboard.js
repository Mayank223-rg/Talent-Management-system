// ========================================
// DASHBOARD NAVIGATION
// ========================================

function showModule(module) {

    const content = document.getElementById("content");

    switch (module) {

        // ========================================
        // DASHBOARD
        // ========================================

        case "dashboard":

            content.innerHTML = `

            <div class="cards">

                <div class="card employees">
                    <i class="fas fa-users"></i>
                    <h3>Total Employees</h3>
                    <p id="employeeCount">0</p>
                </div>

                <div class="card recruit">
                    <i class="fas fa-user-plus"></i>
                    <h3>Total Candidates</h3>
                    <p id="candidateCount">0</p>
                </div>

                <div class="card attendance">
                    <i class="fas fa-calendar-check"></i>
                    <h3>Attendance Records</h3>
                    <p id="attendanceCount">0</p>
                </div>

                <div class="card payroll">
                    <i class="fas fa-money-bill-wave"></i>
                    <h3>Payroll Records</h3>
                    <p id="payrollCount">0</p>
                </div>

                <div class="card employees">
                    <i class="fas fa-plane-departure"></i>
                    <h3>Leave Requests</h3>
                    <p id="leaveCount">0</p>
                </div>

                <div class="card recruit">
                    <i class="fas fa-chart-line"></i>
                    <h3>Performance Reviews</h3>
                    <p id="performanceCount">0</p>
                </div>

            </div>

            <br><br>

            <div class="report-buttons">

                <button onclick="exportEmployees()">
                    📥 Export Employees
                </button>

                <button onclick="exportAttendance()">
                    📥 Export Attendance
                </button>

                <button onclick="exportPayroll()">
                    📥 Export Payroll
                </button>

                <button onclick="refreshDashboard()">
                    🔄 Refresh Dashboard
                </button>

            </div>

            <p id="dashboardUpdated"
               style="margin-top:15px;">
                Dashboard loaded
            </p>

            `;

            loadDashboardStats();

            break;


        // ========================================
        // EMPLOYEE MANAGEMENT
        // ========================================

        case "employee":

            content.innerHTML = `

            <h2>Employee Management</h2>

            <br>

            <input
                id="searchEmployee"
                placeholder="Search Employee"
                onkeyup="searchEmployee()">

            <br><br>

            <input
                id="name"
                placeholder="Employee Name">

            <input
                id="email"
                placeholder="Email">

            <input
                id="department"
                placeholder="Department">

            <input
                id="designation"
                placeholder="Designation">

            <input
                id="salary"
                placeholder="Salary">

            <button onclick="addEmployee()">
                Add Employee
            </button>

            <br><br>

            <table id="employeeTable">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                </tbody>

            </table>

            `;

            loadEmployees();

            break;


        // ========================================
        // RECRUITMENT MANAGEMENT
        // ========================================

        case "recruitment":

            content.innerHTML = `

            <h2>Recruitment Management</h2>

            <br>

            <div class="form-row">

                <input
                    id="candidateName"
                    placeholder="Candidate Name">

                <input
                    id="candidateEmail"
                    placeholder="Email">

                <input
                    id="candidateDepartment"
                    placeholder="Department">

                <input
                    id="candidateDesignation"
                    placeholder="Designation">

                <button onclick="addCandidate()">
                    Add Candidate
                </button>

            </div>

            <br>

            <table id="candidateTable">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                </tbody>

            </table>

            `;

            fetchCandidates();

            break;


        // ========================================
        // ATTENDANCE
        // ========================================

        case "attendance":

            content.innerHTML = `

            <h2>Attendance Management</h2>

            <br>

            <select id="attendanceEmployee">

                <option value="">
                    Select Employee
                </option>

                ${employees.map(emp => `
                    <option value="${emp.emp_name}">
                        ${emp.emp_name}
                    </option>
                `).join("")}

            </select>

            <input
                type="date"
                id="attendanceDate">

            <select id="attendanceStatus">

                <option>
                    Present
                </option>

                <option>
                    Absent
                </option>

            </select>

            <button onclick="addAttendance()">
                Mark Attendance
            </button>

            <br><br>

            <table id="attendanceTable">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                </tbody>

            </table>

            `;

            loadAttendance();

            break;


        // ========================================
        // LEAVE
        // ========================================

        case "leave":

            content.innerHTML = `

            <h2>Leave Management</h2>

            <br>

            <select id="leaveEmployee">

                <option value="">
                    Select Employee
                </option>

                ${employees.map(emp => `
                    <option value="${emp.emp_name}">
                        ${emp.emp_name}
                    </option>
                `).join("")}

            </select>

            <select id="leaveType">

                <option>
                    Casual Leave
                </option>

                <option>
                    Sick Leave
                </option>

                <option>
                    Annual Leave
                </option>

            </select>

            <input
                type="date"
                id="leaveStartDate">

            <input
                type="date"
                id="leaveEndDate">

            <button onclick="applyLeave()">
                Apply Leave
            </button>

            <br><br>

            <table id="leaveTable">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                </tbody>

            </table>

            `;

            loadLeaves();

            break;


        // ========================================
        // PERFORMANCE
        // ========================================

        case "performance":

            content.innerHTML = `

            <h2>Performance Management</h2>

            <br>

            <input
                id="performanceEmployee"
                placeholder="Employee Name">

            <input
                type="number"
                id="performanceRating"
                placeholder="Rating (1-10)">

            <input
                type="number"
                id="performanceKPI"
                placeholder="KPI Score (%)">

            <input
                id="performanceComments"
                placeholder="Comments">

            <button onclick="addPerformance()">
                Add Review
            </button>

            <br><br>

            <table id="performanceTable">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Rating</th>
                        <th>KPI</th>
                        <th>Comments</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                </tbody>

            </table>

            `;

            loadPerformance();

            break;


        // ========================================
        // TRAINING
        // ========================================

        case "training":

            content.innerHTML = `

            <h2>Training Management</h2>

            <br>

            <input
                id="trainingEmployee"
                placeholder="Employee Name">

            <input
                id="trainingName"
                placeholder="Training Program">

            <select id="trainingStatus">

                <option>
                    Assigned
                </option>

                <option>
                    In Progress
                </option>

                <option>
                    Completed
                </option>

            </select>

            <button onclick="addTraining()">
                Assign Training
            </button>

            <br><br>

            <table id="trainingTable">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Training</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                </tbody>

            </table>

            `;

            loadTraining();

            break;


        // ========================================
        // PAYROLL
        // ========================================

        case "payroll":

            content.innerHTML = `

            <h2>Payroll Management</h2>

            <br>

            <select
                id="payrollEmployee"
                onchange="calculatePayrollValues()">

                <option value="">
                    Select Employee
                </option>

                ${employees.map(emp => `
                    <option value="${emp.emp_name}">
                        ${emp.emp_name}
                    </option>
                `).join("")}

            </select>

            <input
                type="number"
                id="basicSalary"
                placeholder="Basic Salary">

            <input
                type="number"
                id="bonus"
                placeholder="Auto Bonus"
                readonly>

            <input
                type="number"
                id="deduction"
                placeholder="Auto Deduction"
                readonly>

            <button onclick="addPayroll()">
                Generate Payroll
            </button>

            <br><br>

            <table id="payrollTable">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Basic Salary</th>
                        <th>Present Days</th>
                        <th>Absent Days</th>
                        <th>Net Salary</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                </tbody>

            </table>

            `;

            loadPayroll();

            break;


        // ========================================
        // FEEDBACK
        // ========================================

        case "feedback":

            content.innerHTML = `

            <h2>Feedback Management</h2>

            <br>

            <input
                id="feedbackEmployee"
                placeholder="Employee Name">

            <input
                id="feedbackText"
                placeholder="Feedback">

            <button onclick="addFeedback()">
                Submit Feedback
            </button>

            <br><br>

            <table id="feedbackTable">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Feedback</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                </tbody>

            </table>

            `;

            loadFeedback();

            break;


        // ========================================
        // ANALYTICS
        // ========================================

        case "analytics":

            content.innerHTML = `

            <h2>Analytics Dashboard</h2>

            <br>

            <div id="analyticsContent"></div>

            `;

            loadAnalytics();

            break;


        // ========================================
        // SETTINGS
        // ========================================

        case "settings":

            content.innerHTML = `

            <h2>System Settings</h2>

            <br>

            <div class="settings-box">

                <label>Company Name</label>

                <br><br>

                <input
                    type="text"
                    id="companyName"
                    value="Talent Management System">

                <br><br>

                <label>Admin Name</label>

                <br><br>

                <input
                    type="text"
                    id="adminName"
                    value="Admin">

                <br><br>

                <label>Theme</label>

                <br><br>

                <select id="themeSelect">

                    <option>
                        Light
                    </option>

                    <option>
                        Dark
                    </option>

                </select>

                <br><br>

                <button onclick="saveSettings()">
                    Save Settings
                </button>

            </div>

            `;

            break;

    }

}


// ========================================
// DASHBOARD IMAGE SLIDER
// ========================================

const sliderImages = [

    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",

    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",

    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200",

    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"

];

let currentSlide = 0;

setInterval(() => {

    const slider =
        document.getElementById("sliderImage");

    if (!slider) return;

    currentSlide++;

    if (currentSlide >= sliderImages.length) {

        currentSlide = 0;

    }

    slider.src =
        sliderImages[currentSlide];

}, 3000);


// ========================================
// LOAD DASHBOARD STATISTICS
// ========================================

async function loadDashboardStats() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/dashboard-stats"
        );

        const stats =
            await response.json();


        const employeeCount =
            document.getElementById("employeeCount");

        if (employeeCount) {

            employeeCount.innerText =
                stats.totalEmployees || 0;

        }


        const candidateCount =
            document.getElementById("candidateCount");

        if (candidateCount) {

            candidateCount.innerText =
                stats.totalCandidates || 0;

        }


        const attendanceCount =
            document.getElementById("attendanceCount");

        if (attendanceCount) {

            attendanceCount.innerText =
                stats.totalAttendance || 0;

        }


        const payrollCount =
            document.getElementById("payrollCount");

        if (payrollCount) {

            payrollCount.innerText =
                stats.totalPayroll || 0;

        }


        const leaveCount =
            document.getElementById("leaveCount");

        if (leaveCount) {

            leaveCount.innerText =
                stats.totalLeaves || 0;

        }


        const performanceCount =
            document.getElementById("performanceCount");

        if (performanceCount) {

            performanceCount.innerText =
                stats.totalPerformance || 0;

        }


        // Show last updated time

        const updated =
            document.getElementById("dashboardUpdated");

        if (updated) {

            const now = new Date();

            updated.innerText =
                "Last updated: " +
                now.toLocaleTimeString();

        }

    }

    catch (error) {

        console.log(error);


        const updated =
            document.getElementById("dashboardUpdated");

        if (updated) {

            updated.innerText =
                "⚠️ Unable to load dashboard data";

        }

    }

}


// ========================================
// REFRESH DASHBOARD
// ========================================

function refreshDashboard() {

    const updated =
        document.getElementById("dashboardUpdated");

    if (updated) {

        updated.innerText =
            "🔄 Refreshing dashboard...";

    }

    loadDashboardStats();

}


// ========================================
// LOAD DASHBOARD WHEN PAGE OPENS
// ========================================

window.onload = () => {

    showModule("dashboard");

};