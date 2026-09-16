function login() {

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    if(
        email === "mayanksinghms1711@gmail.com"
        &&
        password === "M@sugar1"
    ){

        window.location.href =
        "dashboard.html";

    }
    else{

        alert(
            "Invalid Credentials"
        );
    }
}