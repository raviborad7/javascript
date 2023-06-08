let loginPersonEmail = localStorage.getItem("loginPersonEmail");
let notes = localStorage.getItem("notes");
notes == null ? serverData = [] : serverData = JSON.parse(notes);
let logInData = serverData.filter(test => test.emailValue == loginPersonEmail);
let logOutBtn = document.getElementById("logOutBtn");
// console.log(logInData);

if (logInData.length == 0) {
    window.location.href = "login.html";
} else {
    document.getElementById("personName").innerHTML = logInData[0].nameValue;
    document.getElementById("profileImg").src = logInData[0].profileImgURL;
    document.getElementById("email").value = logInData[0].emailValue;
    document.getElementById("country").value = logInData[0].countryValue;
    document.getElementById("state").value = logInData[0].stateValue;
    document.getElementById("city").value = logInData[0].cityValue;
    document.getElementById("phone").value = logInData[0].phoneValue;
    document.getElementById("password").value = logInData[0].passwordValue;


    if (logInData[0].role == "admin") {
        logOutBtn.innerHTML = "back";
    } else {
        logOutBtn.innerHTML = "log out";
    }

    let profileImgElm = document.getElementById("profileImg");
    document.getElementById('profilePic').addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        profileImgElm.src = logInData[0].profileImgURL;
        reader.onloadend = () => {
            const base64String = reader.result;
            profileImgElm.src = base64String;
        };

        if (profileImgElm.src == logInData[0].profileImgURL) {
            profileImgElm.src = logInData[0].profileImgURL;
        }

        setTimeout(() => {
            let updateProfile = [{
                countryID: logInData[0].countryID,
                cityID: logInData[0].cityID,
                stateID: logInData[0].stateID,
                cityValue: logInData[0].cityValue,
                countryValue: logInData[0].countryValue,
                emailValue: logInData[0].emailValue,
                nameValue: logInData[0].nameValue,
                passwordValue: logInData[0].passwordValue,
                phoneValue: logInData[0].phoneValue,
                role: logInData[0].role,
                stateValue: logInData[0].stateValue,
                status: logInData[0].status,
                profileImgURL: profileImgElm.src,
                securityQuestions: logInData[0].securityQuestions,
            }];
            let updateProfileData = serverData.map(obj => updateProfile.find(o => o.emailValue === obj.emailValue) || obj);
            console.log(updateProfileData);
            localStorage.setItem("notes", JSON.stringify(updateProfileData));
        }, "1000");
        reader.readAsDataURL(file);
    });
}

function editData() {
    // console.log(logInData[0]);
    // localStorage.removeItem("loginPersonEmail");
    localStorage.setItem("editPersonEmail", logInData[0].emailValue);
    window.location.href = "signUp.html";
    // window.history.go(-1);
}

function logOutData() {
    if (logOutBtn.innerHTML == "log out") {
        localStorage.removeItem("loginPersonEmail");
        window.location.href = "login.html";
        // console.log("if");
    } else {
        window.location.href = "admin.html";
    }
}

function resetPassword() {
    // window.open("http://google.com", "myWindow", 'width=800,height=600');
    const template = document.createElement('div');
    template.innerHTML = `
        <form class='popup-form'>
            <h4>Reset Password</h4>
            <div class="form-group">
                <label for="">Current Password :</label>
                <input type="password" name='currentPassword' class="form-fild" id="currentPassword" placeholder="Enter Current Password"/>
                <small id="currentPasswordError"></small>
                <a href="javascript:void(0)" onclick="togglePassword('pw')" class="show-hide-btn"></a>
            </div>
            <div class="form-group">
                <label for="">New Password :</label>
                <input type="password" name='newPassword' class="form-fild" placeholder="Enter New Password" id="newPassword" />
                <small id="newPasswordError"></small>
                <a href="javascript:void(0)" onclick="togglePassword('newPW')" class="show-hide-btn"></a>
            </div>
            <div class="form-group">
                <label for="">New Confirm Password :</label>
                <input type="password" name='newConfirmPassword' class="form-fild" placeholder="Enter New Confirm Password" id="newConfirmPassword"/>
                <small id="newConfirmPasswordError"></small>
                <a href="javascript:void(0)" onclick="togglePassword('newConfirmPW')" class="show-hide-btn"></a>
            </div>
            <div class="form-group w-100 user-bottom-btns text-center">
                <button type="button" class="btn-style red-btn" onclick="closePopup()" id="cancelBtn">cancel</button>
                <button type="button" class="btn-style" onclick="saveNewPassword()" id="saveBtn">save</button>
            </div>
        </form>
    `;
    template.classList.add("main-popup-div");
    template.setAttribute("id", "reset-password-popup");
    document.body.appendChild(template);
}

function saveNewPassword() {
    let currentPassword = document.getElementById('currentPassword');
    let newPassword = document.getElementById('newPassword');
    let newConfirmPassword = document.getElementById('newConfirmPassword');
    let validType = true;
    // console.log(logInData);
    function removeError() {
        document.getElementById(this.id + "Error").innerText = "";
    }
    document.getElementById("currentPassword").onkeyup = removeError;
    document.getElementById("newPassword").onkeyup = removeError;
    document.getElementById("newConfirmPassword").onkeyup = removeError;

    if (currentPassword.value == "") {
        currentPassword.nextSibling.nextSibling.innerHTML = "Enter Current Password";
        validType = false;
    } else {
        currentPassword.nextSibling.nextSibling.innerHTML = "";
        if (currentPassword.value == logInData[0].passwordValue) {
            currentPassword.nextSibling.nextSibling.innerHTML = "";
        } else {
            currentPassword.nextSibling.nextSibling.innerHTML = "Enter valid Current Password";
            validType = false;
        }
    }

    let pwFormat = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
    if (newPassword.value == "") {
        newPassword.nextSibling.nextSibling.innerHTML = "Enter Password";
        validType = false;
    } else if (newPassword.value.match(pwFormat)) {
        newPassword.nextSibling.nextSibling.innerHTML = "";
        if (newConfirmPassword.value !== newPassword.value) {
            newConfirmPassword.nextSibling.nextSibling.innerHTML = "Password does not match";
            validType = false;
        } else {
            newConfirmPassword.nextSibling.nextSibling.innerHTML = "";
        }
    } else {
        newPassword.nextSibling.nextSibling.innerHTML = "Enter minimum 8 character ( minimum 3 alphabets in 1 capital, 3 numericals, 1 special characters )";
        validType = false;
        if (newConfirmPassword.value !== newPassword.value) {
            newConfirmPassword.nextSibling.nextSibling.innerHTML = "Password does not match";
            validType = false;
        } else {
            newConfirmPassword.nextSibling.nextSibling.innerHTML = "";
        }
    }

    if (validType) {
        let notes = localStorage.getItem("notes");
        notes == null ? personDataArr = [] : personDataArr = JSON.parse(notes);

        logInData[0].passwordValue = newPassword.value;
        // console.log(logInData);
        let updateNewPassword = personDataArr.map(obj => logInData.find(o => o.emailValue === obj.emailValue) || obj);
        // console.log(updateNewPassword);
        localStorage.setItem("notes", JSON.stringify(updateNewPassword));
        let resetPasswordPopup = document.getElementById("reset-password-popup");
        resetPasswordPopup.remove();
    }

}

function closePopup() {
    let resetPasswordPopup = document.getElementById("reset-password-popup");
    resetPasswordPopup.remove();
}

function togglePassword(pwValue) {
    if (pwValue == "pw") {
        let passwordType = currentPassword.getAttribute("type") === "password" ? "text" : "password";
        currentPassword.setAttribute("type", passwordType);
        currentPassword.nextElementSibling.nextElementSibling.classList.toggle("pw-hide");
    } else if (pwValue == "newPW") {
        let passwordType = newPassword.getAttribute("type") === "password" ? "text" : "password";
        newPassword.setAttribute("type", passwordType);
        newPassword.nextElementSibling.nextElementSibling.classList.toggle("pw-hide");
    } else if (pwValue == "newConfirmPW") {
        let passwordType = newConfirmPassword.getAttribute("type") === "password" ? "text" : "password";
        newConfirmPassword.setAttribute("type", passwordType);
        newConfirmPassword.nextElementSibling.nextElementSibling.classList.toggle("pw-hide");
    }
}