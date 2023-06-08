let loginPersonEmail = localStorage.getItem("loginPersonEmail");
let notes = localStorage.getItem("notes");
notes == null ? serverData = [] : serverData = JSON.parse(notes);

let logInData = serverData.filter(test => test.emailValue == loginPersonEmail);
// console.log(logInData);
if (logInData.length == 0) {
    window.location.href = "login.html";
} else {

    document.getElementById("personName").innerHTML = logInData[0].nameValue;

    function logOutData() {
        localStorage.removeItem("loginPersonEmail");
        window.location.href = "login.html";
    }

    function profilePageChange() {
        window.location.href = "user.html";
    }

    function showUsers() {
        window.location.href = "users-data.html";
    }

}
