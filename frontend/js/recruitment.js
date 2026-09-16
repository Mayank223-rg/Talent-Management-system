let candidates = [];

// ==============================
// LOAD CANDIDATES
// ==============================

async function fetchCandidates(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/candidates"
        );

        candidates =
        await response.json();

        loadCandidates();

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// ADD CANDIDATE
// ==============================

async function addCandidate(){

    const candidate = {

        name:
        document.getElementById(
        "candidateName"
        ).value,

        email:
        document.getElementById(
        "candidateEmail"
        ).value,

        department:
        document.getElementById(
        "candidateDepartment"
        ).value,

        designation:
        document.getElementById(
        "candidateDesignation"
        ).value

    };

    try{

        const response = await fetch(

            "http://localhost:5000/api/candidates",

            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify(
                    candidate
                )

            }

        );

        const result =
        await response.json();

        if(result.success){

            alert(
                "Candidate Added"
            );

            fetchCandidates();

        }

    }

    catch(error){

        console.log(error);

    }

}

// ==============================
// DELETE CANDIDATE
// ==============================

async function deleteCandidate(id){

    if(
        !confirm(
        "Delete Candidate?"
        )
    ) return;

    try{

        const response = await fetch(

            `http://localhost:5000/api/candidates/${id}`,

            {

                method:"DELETE"

            }

        );

        const result =
        await response.json();

        if(result.success){

            fetchCandidates();

        }

    }

    catch(error){

        console.log(error);

    }

}
async function acceptCandidate(id){

    try{

        const response = await fetch(

            `http://localhost:5000/api/candidates/accept/${id}`,

            {

                method:"PUT"

            }

        );

        const result =
        await response.json();

        if(result.success){

            alert(
                "Candidate Accepted"
            );

            fetchCandidates();

        }

    }

    catch(error){

        console.log(error);

    }

}
// ==============================
// DISPLAY CANDIDATES
// ==============================

function loadCandidates(){

    const tbody =

    document.querySelector(
    "#candidateTable tbody"
    );

    if(!tbody) return;

    tbody.innerHTML = "";

    candidates.forEach(candidate=>{

        tbody.innerHTML += `

        <tr>

            <td>
                ${candidate.candidate_id}
            </td>

            <td>
                ${candidate.candidate_name}
            </td>

            <td>
                ${candidate.email}
            </td>

            <td>
                ${candidate.department}
            </td>

            <td>
                ${candidate.designation}
            </td>

            <td>

                <span
                class="status pending">

                ${candidate.status}

                </span>

            </td>

          <td>

    <button

    onclick=
    "acceptCandidate(
    ${candidate.candidate_id}
    )"

    style="
    background:#10b981;
    color:white;
    border:none;
    padding:8px 12px;
    border-radius:8px;
    margin-right:5px;
    ">

    Accept

    </button>

    <button

   <button

onclick=
"editCandidate(
${candidate.candidate_id}
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
"deleteCandidate(
${candidate.candidate_id}
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

fetchCandidates();
async function editCandidate(id){

    const candidate =

    candidates.find(

        c=>c.candidate_id==id

    );

    const name =
    prompt(
    "Candidate Name",
    candidate.candidate_name
    );

    const email =
    prompt(
    "Email",
    candidate.email
    );

    const department =
    prompt(
    "Department",
    candidate.department
    );

    const designation =
    prompt(
    "Designation",
    candidate.designation
    );

    try{

        const response =
        await fetch(

        `http://localhost:5000/api/candidates/${id}`,

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
                designation

            })

        }

        );

        const result =
        await response.json();

        if(result.success){

            alert(
            "Candidate Updated"
            );

            fetchCandidates();

        }

    }

    catch(error){

        console.log(error);

    }

}