let notes = localStorage.getItem("notes");
notes == null ? serverData = [] : serverData = JSON.parse(notes);
let logInEmailTag = document.getElementById("logInEmail");
let logInPasswordTag = document.getElementById("logInPassword");

function signInForm() {

    let logInEmail = logInEmailTag.value;
    let logInPassword = logInPasswordTag.value;
    let validType = true;

    let logInData = serverData.filter(test => test.emailValue == logInEmail);

    // if (logInData[0].status == "active") {

    document.getElementById("logInEmail").onkeyup = removeError;
    document.getElementById("logInPassword").onkeyup = removeError;

    function removeError() {
        document.getElementById(this.id + "Error").innerText = "";
    }

    if (logInEmail == "") {
        logInEmailTag.nextSibling.nextSibling.innerHTML = "Please Enter Email ID";
        validType = false;
    } else if (logInData.length == 0) {
        logInEmailTag.nextSibling.nextSibling.innerHTML = "Please Enter valid Email ID";
        validType = false;
    } else {
        logInEmailTag.nextSibling.nextSibling.innerHTML = "";
    }

    if (logInPassword == "") {
        logInPasswordTag.nextSibling.nextSibling.innerHTML = "Please Enter Password";
        validType = false;
    } else if (logInPassword !== logInData[0].passwordValue) {
        logInPasswordTag.nextSibling.nextSibling.innerHTML = "Please Enter valid Password";
        validType = false;
    } else {
        logInPasswordTag.nextSibling.nextSibling.innerHTML = "";
    }
    // removeError();


    if (validType) {
        if (logInData[0].status == "active") {
            localStorage.setItem("loginPersonEmail", logInData[0].emailValue);
            if (logInData[0].role == "admin") {
                document.getElementById("login-form").reset();
                window.location.href = "admin.html";
            } else {
                document.getElementById("login-form").reset();
                window.location.href = "user.html";
            }
        } else {
            alert("Your account has been blocked 🚫");
        }
    }

}

function togglePassword() {
    let passwordType = logInPassword.getAttribute("type") === "password" ? "text" : "password";
    logInPassword.setAttribute("type", passwordType);
    logInPassword.nextElementSibling.nextElementSibling.classList.toggle("pw-hide");
}