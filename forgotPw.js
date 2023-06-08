let subForm = document.getElementById("forgot-sub-form");
let forgotEmailData;
let question = document.getElementById("question");
let trueFalse = true;
let notes = localStorage.getItem("notes");
notes == null ? serverData = [] : serverData = JSON.parse(notes);
let validType = true;
let profilePic = document.getElementById("profile-dp");

function backPageChange() {
    window.history.go(-1);
}

function showQuestion() {

    if (trueFalse) {

        let forgotPwEmail = document.getElementById("forgotPwEmail");

        let forgotPwEmailValue = forgotPwEmail.value;
        let validType = true;

        function removeError() {
            document.getElementById(this.id + "Error").innerText = "";
        }
        document.getElementById("forgotPwEmail").onkeyup = removeError;

        if (forgotPwEmailValue == "") {
            forgotPwEmail.nextSibling.nextSibling.innerHTML = "Plz Enter Email ID";
            validType = false;
        } else {
            forgotPwEmail.nextSibling.nextSibling.innerHTML = "";
            forgotEmailData = serverData.filter(test => test.emailValue == forgotPwEmailValue);
            if (forgotEmailData.length == 0) {
                forgotPwEmail.nextSibling.nextSibling.innerHTML = "Plz Enter valid Email ID";
                validType = false;
            } else {
                forgotPwEmail.nextSibling.nextSibling.innerHTML = "";
            }
        }

        if (validType) {
            subForm.style.display = "block";
            forgotPwEmail.disabled = true;
            trueFalse = false;
            for (const key in forgotEmailData[0].securityQuestions) {
                question.innerHTML += `<option value="${key}">${key}</option>`;
            }
            profilePic.src = forgotEmailData[0].profileImgURL;
        }
    } else {
        // console.log(forgotEmailData);

        let answer = document.getElementById("answer");
        let newPW = document.getElementById("newPassword");
        let confirmNewPW = document.getElementById("confirmNewPassword");

        let answerValue = answer.value;
        let questionValue = question.value;
        let newPWValue = newPW.value;
        let confirmNewPWValue = confirmNewPW.value;
        let newValidType = true;


        document.getElementById("answer").onkeyup = removeError;
        document.getElementById("newPassword").onkeyup = removeError;
        document.getElementById("confirmNewPassword").onkeyup = removeError;

        let allSecurityQuestions = [forgotEmailData[0].securityQuestions];

        function removeError() {
            document.getElementById(this.id + "Error").innerText = "";
        }
        if (answerValue == "") {
            answer.nextSibling.nextSibling.innerHTML = "Plz Enter answer";
            newValidType = false;
        } else {
            answer.nextSibling.nextSibling.innerHTML = "";
            if (allSecurityQuestions[0][questionValue] == answerValue) {
                answer.nextSibling.nextSibling.innerHTML = "";
            } else {
                answer.nextSibling.nextSibling.innerHTML = "Plz Enter valid answer";
                newValidType = false;
            }
        }

        let pwFormat = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
        if (newPWValue == "") {
            newPW.nextSibling.nextSibling.innerHTML = "Enter Password";
            newValidType = false;
        } else if (newPWValue.match(pwFormat)) {
            newPW.nextSibling.nextSibling.innerHTML = "";
            if (confirmNewPWValue !== newPWValue) {
                confirmNewPW.nextSibling.nextSibling.innerHTML = "Password does not match";
                newValidType = false;
            } else {
                confirmNewPW.nextSibling.nextSibling.innerHTML = "";
            }
        } else {
            newPW.nextSibling.nextSibling.innerHTML = "Enter minimum 8 character ( minimum 3 alphabets in 1 capital, 3 numericals, 1 special characters )";
            newValidType = false;
            if (confirmNewPWValue !== newPWValue) {
                confirmNewPW.nextSibling.nextSibling.innerHTML = "Password does not match";
                newValidType = false;
            } else {
                confirmNewPW.nextSibling.nextSibling.innerHTML = "";
            }
        }
        // removeError();


        if (newValidType) {
            forgotEmailData[0].passwordValue = newPWValue;
            let updatePasswordData = serverData.map(obj => forgotEmailData.find(o => o.emailValue === obj.emailValue) || obj);
            console.log(updatePasswordData);
            localStorage.setItem("notes", JSON.stringify(updatePasswordData));
            window.location.href = "login.html";
        }
    }
}


function togglePassword(pwValue) {
    if (pwValue == "pw") {
        let passwordType = newPassword.getAttribute("type") === "password" ? "text" : "password";
        newPassword.setAttribute("type", passwordType);
        newPassword.nextElementSibling.nextElementSibling.classList.toggle("pw-hide");
    } else {
        let confirmPasswordType = confirmNewPassword.getAttribute("type") === "password" ? "text" : "password";
        confirmNewPassword.setAttribute("type", confirmPasswordType);
        confirmNewPassword.nextElementSibling.nextElementSibling.classList.toggle("pw-hide");
    }
}

