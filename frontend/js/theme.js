// ============================
// DARK MODE
// ============================

const themeButton =
document.getElementById(
"themeToggle"
);

if(themeButton){

    themeButton.addEventListener(
    "click",
    ()=>{

        document.body
        .classList
        .toggle(
        "dark-mode"
        );

        if(

        document.body
        .classList
        .contains(
        "dark-mode"
        )

        ){

            themeButton.innerHTML =
            "☀️ Light Mode";

        }

        else{

            themeButton.innerHTML =
            "🌙 Dark Mode";

        }

    });

}