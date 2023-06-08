localStorage.setItem("adminPW", 'admin123');
let questionSelect = document.querySelectorAll(".question-select");
let questionOption = ["select_question", "Childhood_name", "Favorite_pet_name", "Favorite_sport_name", "Favorite_school_name", "Favorite_place_name", "Best_friend_name", "Favorite_drink_name", "Favorite_food_name"];
let adminPW = localStorage.getItem("adminPW");
let adminPwDiv = document.getElementById("admin-pw");
let addBtn = document.getElementById("addBtn");
let editPersonEmail = localStorage.getItem("editPersonEmail");


let name = document.getElementById("name");
let email = document.getElementById("email");
let city = document.getElementById("city");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let state = document.getElementById("state");
let country = document.getElementById("country");
let question1 = document.getElementById("question1");
let question2 = document.getElementById("question2");
let question3 = document.getElementById("question3");
let answer1 = document.getElementById("answer1");
let answer2 = document.getElementById("answer2");
let answer3 = document.getElementById("answer3");

let profileImg = document.getElementById("profileImg");

let adminPassword;
function roleChnage() {
    let roleSelect = document.getElementById("role").value;
    adminPwDiv.innerHTML = "";
    if (roleSelect == "admin") {
        adminPwDiv.innerHTML = `<label for="">Admin Password* :</label>
            <input type="password" name="adminPassword" placeholder="Enter Admin Password*" class="form-fild"
                id="adminPassword" />
            <small id="adminPasswordError"></small>
            <a href="javascript:void(0)" onmouseover="togglePassword('adminPW')" onmouseout="togglePassword('adminPW')" class="show-hide-btn"></a>`
    } else {
        adminPwDiv.innerHTML = "";
    }
    adminPassword = document.getElementById("adminPassword");
}


let questionSelectArray = [];
for (let a = 0; a < questionOption.length; a++) {
    questionSelectArray.push(`<option value='${questionOption[a]}'>${questionOption[a]}</option>`);
}

for (let i = 0; i < questionSelect.length; i++) {
    questionSelect[i].innerHTML = questionSelectArray;
}
//////////
let chosen = []
const disableRelated = () => {
    const options = []
    questionSelect.forEach(select => {
        const unselectedOpts = [...select.querySelectorAll('option')].filter(o => o.value !== select.value)
        options.push(...unselectedOpts);
    });
    options.forEach(option => {
        const action = chosen.indexOf(option.value) !== -1 ? 'setAttribute' : 'removeAttribute';
        option[action]('disabled', null);
    });
}
const handleChange = () => {
    chosen.length = 0;
    questionSelect.forEach(({ value }) => value ? chosen.push(value) : null);
    disableRelated();
}
questionSelect.forEach(select => select.addEventListener('change', handleChange));
//////////////////
let countryArray = [
    { name: "india", id: 1, },
    { name: "england", id: 2, },
    { name: "us", id: 3, },
    { name: "japan", id: 4, },
    { name: "russia", id: 5, },
];

let countrySelect = document.getElementById("country");
let citySelect = document.getElementById("city");
let stateSelect = document.getElementById("state");
let countrySelectID;
stateSelect.disabled = true;
citySelect.disabled = true;
let stateSelectID;

countrySelect.innerHTML = `<option value="" disabled selected>select country</option>`;
// countrySelect.innerHTML = "";
for (let index = 0; index < countryArray.length; index++) {
    countrySelect.innerHTML += `<option value="${countryArray[index].id}">${countryArray[index].name}</option>`;

}

let stateArray = [
    { name: "gujarat", id: "s1", countryID: 1, },
    { name: "rajasthan", id: "s2", countryID: 1, },
    { name: "haryana", id: "s3", countryID: 1, },
    { name: "maharashtra", id: "s4", countryID: 1, },
    { name: "punjab", id: "s5", countryID: 1, },
    { name: "london1", id: "s6", countryID: 2, },
    { name: "london2", id: "s7", countryID: 2, },
    { name: "london3", id: "s8", countryID: 2, },
    { name: "london4", id: "s9", countryID: 2, },
    { name: "london5", id: "s10", countryID: 2, },
    { name: "california1", id: "s11", countryID: 3, },
    { name: "california2", id: "s12", countryID: 3, },
    { name: "california3", id: "s13", countryID: 3, },
    { name: "california4", id: "s14", countryID: 3, },
    { name: "california5", id: "s15", countryID: 3, },
    { name: "tokyo1", id: "s16", countryID: 4, },
    { name: "tokyo2", id: "s17", countryID: 4, },
    { name: "tokyo3", id: "s18", countryID: 4, },
    { name: "tokyo4", id: "s19", countryID: 4, },
    { name: "tokyo5", id: "s20", countryID: 4, },
    { name: "moscow1", id: "s21", countryID: 5, },
    { name: "moscow2", id: "s22", countryID: 5, },
    { name: "moscow3", id: "s23", countryID: 5, },
    { name: "moscow4", id: "s24", countryID: 5, },
    { name: "moscow5", id: "s25", countryID: 5, },
];


function countryChange(sel) {
    stateSelect.disabled = false;
    citySelect.disabled = true;
    countrySelectID = countrySelect.value;
    stateSelect.innerHTML = `<option value="" disabled selected>select state</option>`;
    let stateDataArray = stateArray.filter(test => test.countryID == countrySelectID);
    for (let i = 0; i < stateDataArray.length; i++) {
        stateSelect.innerHTML += `<option value="${stateDataArray[i].id}">${stateDataArray[i].name}</option>`;
    }
    citySelect.innerHTML = ``;
    country.nextSibling.nextSibling.innerHTML = "";
}

let cityArray = [
    { name: "rajkot", id: "c1", stateID: "s1", countryID: 1 },
    { name: "suart", id: "c2", stateID: "s1", countryID: 1 },
    { name: "jaipur", id: "c3", stateID: "s2", countryID: 1 },
    { name: "udaipur", id: "c4", stateID: "s2", countryID: 1 },
    { name: "faridabad", id: "c5", stateID: "s3", countryID: 1 },
    { name: "gurugram", id: "c6", stateID: "s3", countryID: 1 },
    { name: "mumbai", id: "c7", stateID: "s4", countryID: 1 },
    { name: "aurangabad", id: "c8", stateID: "s4", countryID: 1 },
    { name: "chandigarh", id: "c9", stateID: "s5", countryID: 1 },
    { name: "amritsar", id: "c10", stateID: "s5", countryID: 1 },
    { name: "a", id: "c11", stateID: "s6", countryID: 2 },
    { name: "b", id: "c12", stateID: "s6", countryID: 2 },
    { name: "c", id: "c13", stateID: "s7", countryID: 2 },
    { name: "d", id: "c14", stateID: "s7", countryID: 2 },
    { name: "e", id: "c15", stateID: "s8", countryID: 2 },
    { name: "f", id: "c16", stateID: "s8", countryID: 2 },
    { name: "g", id: "c17", stateID: "s9", countryID: 2 },
    { name: "h", id: "c18", stateID: "s9", countryID: 2 },
    { name: "i", id: "c19", stateID: "s10", countryID: 2 },
    { name: "j", id: "c20", stateID: "s10", countryID: 2 },
    { name: "aa", id: "c21", stateID: "s11", countryID: 3 },
    { name: "bb", id: "c22", stateID: "s11", countryID: 3 },
    { name: "cc", id: "c23", stateID: "s12", countryID: 3 },
    { name: "dd", id: "c24", stateID: "s12", countryID: 3 },
    { name: "ee", id: "c25", stateID: "s13", countryID: 3 },
    { name: "ff", id: "c26", stateID: "s13", countryID: 3 },
    { name: "gg", id: "c27", stateID: "s14", countryID: 3 },
    { name: "hh", id: "c28", stateID: "s14", countryID: 3 },
    { name: "ii", id: "c29", stateID: "s15", countryID: 3 },
    { name: "jj", id: "c30", stateID: "s15", countryID: 3 },
    { name: "aaa", id: "c31", stateID: "s16", countryID: 4 },
    { name: "bbb", id: "c32", stateID: "s16", countryID: 4 },
    { name: "ccc", id: "c33", stateID: "s17", countryID: 4 },
    { name: "ddd", id: "c34", stateID: "s17", countryID: 4 },
    { name: "eee", id: "c35", stateID: "s18", countryID: 4 },
    { name: "fff", id: "c36", stateID: "s18", countryID: 4 },
    { name: "ggg", id: "c37", stateID: "s19", countryID: 4 },
    { name: "hhh", id: "c38", stateID: "s19", countryID: 4 },
    { name: "iii", id: "c39", stateID: "s20", countryID: 4 },
    { name: "jjj", id: "c40", stateID: "s20", countryID: 4 },
    { name: "aaaa", id: "c41", stateID: "s21", countryID: 5 },
    { name: "bbbb", id: "c42", stateID: "s21", countryID: 5 },
    { name: "cccc", id: "c43", stateID: "s22", countryID: 5 },
    { name: "dddd", id: "c44", stateID: "s22", countryID: 5 },
    { name: "eeee", id: "c45", stateID: "s23", countryID: 5 },
    { name: "ffff", id: "c46", stateID: "s23", countryID: 5 },
    { name: "gggg", id: "c47", stateID: "s24", countryID: 5 },
    { name: "hhhh", id: "c48", stateID: "s24", countryID: 5 },
    { name: "iiii", id: "c49", stateID: "s25", countryID: 5 },
    { name: "jjjj", id: "c50", stateID: "s25", countryID: 5 },
];

function stateChange(sel) {
    citySelect.disabled = false;
    stateSelectID = stateSelect.value;
    let cityDataArray = cityArray.filter(test => test.stateID == stateSelectID);
    citySelect.innerHTML = `<option value="" disabled selected>select city</option>`;
    for (let i = 0; i < cityDataArray.length; i++) {
        citySelect.innerHTML += `<option value="${cityDataArray[i].id}">${cityDataArray[i].name}</option>`
    }
    state.nextSibling.nextSibling.innerHTML = "";
}

function cityChange(sel) {
    city.nextSibling.nextSibling.innerHTML = "";
}

let editImgUrl;
document.getElementById('profilePic').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    profileImg.src = "img/user.png";
    reader.onloadend = () => {
        const base64String = reader.result;
        profileImg.src = base64String;
    };
    // console.log(editImgUrl);
    reader.readAsDataURL(file);
    let profilePic = document.getElementById("profilePic");

    if (profilePic.value == "") {
        profilePic.nextSibling.nextSibling.innerHTML = "Plz Upload profile image";
    } else {
        profilePic.nextSibling.nextSibling.innerHTML = "";
    }
});

let roleFix;
if (editPersonEmail == null) {
    // console.log("test");
    document.getElementById("main-title").innerHTML = "Sign Up Form";
    document.getElementById("haveAccount").style.display = "block";
    document.getElementById("role").style.display = "block";
    let backBtn = document.getElementById("backBtn");
    if (backBtn !== null) {
        backBtn.remove();
    }
} else {
    addBtn.innerHTML = "update";
    let notes = localStorage.getItem("notes");
    notes == null ? serverData = [] : serverData = JSON.parse(notes);
    let editData = serverData.filter(test => test.emailValue == editPersonEmail);
    email.disabled = true;
    // console.log(editData);
    editImgUrl = editData[0].profileImgURL;

    roleFix = editData[0].role;
    let allQusArray = Object.keys(editData[0].securityQuestions);
    let allAnsArray = Object.values(editData[0].securityQuestions);
    profileImg.src = editData[0].profileImgURL;
    name.value = editData[0].nameValue;
    email.value = editData[0].emailValue;
    country.value = editData[0].countryID;
    phone.value = editData[0].phoneValue;
    password.value = editData[0].passwordValue;
    confirmPassword.value = editData[0].passwordValue;
    question1.value = allQusArray[0];
    question2.value = allQusArray[1];
    question3.value = allQusArray[2];
    answer1.value = allAnsArray[0];
    answer2.value = allAnsArray[1];
    answer3.value = allAnsArray[2];
    handleChange();
    countryChange();
    state.value = editData[0].stateID;
    stateChange();
    city.value = editData[0].cityID;
    document.getElementById("main-title").innerHTML = editData[0].nameValue;
    document.getElementById("haveAccount").style.display = "none";
    document.getElementById("role").style.display = "none";

    const template = document.createElement('div');
    template.innerHTML = `
        <button class="btn-style user-page-back-btn" type="button" onclick="backPageChange()"><img src="img/left-arrow.svg"
            alt=""></button>
    `;
    template.setAttribute("id", "backBtn");
    document.body.appendChild(template);

}

function backPageChange() {
    window.history.go(-1);
    localStorage.removeItem("editPersonEmail");
}

function closePopup() {
    let uppdatePasswordPopup = document.getElementById("update-data-popup");
    uppdatePasswordPopup.remove();
}

let confirmUpdatePerson;
function confirmUpdateData() {
    localStorage.setItem("notes", JSON.stringify(confirmUpdatePerson));
    document.getElementById("data-form").reset();
    adminPwDiv.innerHTML = "";
    profileImg.src = "img/user.png";
    addBtn.innerHTML = "submit";
    localStorage.removeItem("editPersonEmail");
    window.history.go(-1);
    closePopup();
}

function addData() {
    let notes = localStorage.getItem("notes");
    let validType = true;
    let role = document.getElementById("role").value;
    let profileImgURL = profileImg.src;

    document.getElementById("name").onkeyup = checkValidation;
    document.getElementById("email").onkeyup = checkValidation;
    document.getElementById("phone").onkeyup = checkValidation;
    document.getElementById("password").onkeyup = checkValidation;
    document.getElementById("confirmPassword").onkeyup = checkValidation;
    document.getElementById("answer1").onkeyup = checkValidation;
    document.getElementById("answer2").onkeyup = checkValidation;
    document.getElementById("answer3").onkeyup = checkValidation;

    // function removeError() {
    //     document.getElementById(this.id + "Error").innerText = "";
    // }

    function checkValidation() {
        if (role == "admin") {
            document.getElementById("adminPassword").onkeyup = removeError;
            if (adminPassword.value == "") {
                adminPassword.nextSibling.nextSibling.innerHTML = "Enter admin password";
                validType = false;
            } else if (adminPassword.value == adminPW) {
                adminPassword.nextSibling.nextSibling.innerHTML = "";
                validType = false;
            } else {
                adminPassword.nextSibling.nextSibling.innerHTML = "Enter valid admin password";
                validType = false;
            }
        }

        if (name.value == "") {
            name.nextSibling.nextSibling.innerHTML = "Enter valid name";
            validType = false;
        } else {
            name.nextSibling.nextSibling.innerHTML = "";
        }

        let mailFormat = /^[a-z]{3,}[0-9]{2,}@[a-z]{3,}[.A-Za-z]{3,}$/;
        // let mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.value == "") {
            email.nextSibling.nextSibling.innerHTML = "Enter email ID";
            validType = false;
        } else if (email.value.match(mailFormat)) {
            email.nextSibling.nextSibling.innerHTML = "";
        } else {
            email.nextSibling.nextSibling.innerHTML = "Enter valid email ID ( Plz enter minimum 3 alphabets and 3 numericals )";
            validType = false;
        }

        if (country.value == "") {
            country.nextSibling.nextSibling.innerHTML = "Enter valid country";
            validType = false;
        } else {
            country.nextSibling.nextSibling.innerHTML = "";
            if (state.value == "") {
                state.nextSibling.nextSibling.innerHTML = "Enter valid state";
                validType = false;
            } else {
                state.nextSibling.nextSibling.innerHTML = "";
                if (city.value == "") {
                    city.nextSibling.nextSibling.innerHTML = "Enter valid city";
                    validType = false;
                } else {
                    city.nextSibling.nextSibling.innerHTML = "";
                }
            }
        }

        let phoneFormat = /^\d{10}$/;
        if (phone.value == "") {
            phone.nextSibling.nextSibling.innerHTML = "Enter phone number";
            validType = false;
        } else if (phone.value.match(phoneFormat)) {
            phone.nextSibling.nextSibling.innerHTML = "";
        } else {
            phone.nextSibling.nextSibling.innerHTML = "Enter valid phone number ( minimum 10 number )";
            validType = false;
        }

        let pwFormat = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;
        if (password.value == "") {
            password.nextSibling.nextSibling.innerHTML = "Enter Password";
            validType = false;
        } else if (password.value.match(pwFormat)) {
            password.nextSibling.nextSibling.innerHTML = "";
            if (confirmPassword.value !== password.value) {
                confirmPassword.nextSibling.nextSibling.innerHTML = "Password does not match";
                validType = false;
            } else {
                confirmPassword.nextSibling.nextSibling.innerHTML = "";
            }
        } else {
            password.nextSibling.nextSibling.innerHTML = "Enter minimum 8 character ( minimum 3 alphabets in 1 capital, 3 numericals, 1 special characters )";
            validType = false;
            if (confirmPassword.value !== password.value) {
                confirmPassword.nextSibling.nextSibling.innerHTML = "Password does not match";
                validType = false;
            } else {
                confirmPassword.nextSibling.nextSibling.innerHTML = "";
            }
        }

        let spaceFormat = /^[a-z]{1,}$/;
        if (question1.value == "select_question" || answer1.value == "" || !answer1.value.match(spaceFormat)) {
            question1.nextSibling.nextSibling.innerHTML = "Please select question and Enter answer";
            validType = false;
        } else {
            question1.nextSibling.nextSibling.innerHTML = "";
        }

        if (question2.value == "select_question" || answer2.value == "" || !answer2.value.match(spaceFormat)) {
            question2.nextSibling.nextSibling.innerHTML = "Please select question and Enter answer";
            validType = false;
        } else {
            question2.nextSibling.nextSibling.innerHTML = "";
        }

        if (question3.value == "select_question" || answer3.value == "" || !answer3.value.match(spaceFormat)) {
            question3.nextSibling.nextSibling.innerHTML = "Please select question and Enter answer";
            validType = false;
        } else {
            question3.nextSibling.nextSibling.innerHTML = "";
        }
        // console.log(validType);
    }
    checkValidation();

    let nameValue = name.value;
    let emailValue = email.value;
    let phoneValue = phone.value;
    let passwordValue = password.value;
    let question1Value = question1.value;
    let question2Value = question2.value;
    let question3Value = question3.value;
    let answer1Value = answer1.value;
    let answer2Value = answer2.value;
    let answer3Value = answer3.value;
    let securityQuestions = {
        [question1Value]: answer1Value,
        [question2Value]: answer2Value,
        [question3Value]: answer3Value,
    };
    let countryID = countrySelect.value;
    let stateID = stateSelect.value;
    let cityID = citySelect.value;

    let countryValue = countrySelect.options[countrySelect.selectedIndex].text;
    let stateValue = stateSelect.options[stateSelect.selectedIndex].text;
    let cityValue = citySelect.options[citySelect.selectedIndex].text;

    if (validType) {
        notes == null ? personData = [] : personData = JSON.parse(notes);
        if (addBtn.innerHTML === "update") {
            let editedArray = [{ role: roleFix, nameValue, emailValue, cityValue, countryID, cityID, stateID, phoneValue, passwordValue, stateValue, countryValue, securityQuestions, profileImgURL: profileImgURL, status: "active" }]
            let notes = localStorage.getItem("notes");
            notes == null ? serverData = [] : serverData = JSON.parse(notes);
            let updatePersonData = serverData.map(obj => editedArray.find(o => o.emailValue === obj.emailValue) || obj);
            confirmUpdatePerson = updatePersonData;
            // console.log(updatePersonData);
            // localStorage.setItem("notes", JSON.stringify(updatePersonData));
            // document.getElementById("data-form").reset();
            // adminPwDiv.innerHTML = "";
            // profileImg.src = "img/user.png";
            // addBtn.innerHTML = "submit";
            // localStorage.removeItem("editPersonEmail");
            // window.history.go(-1);

            const template = document.createElement('div');
            template.innerHTML = `
                <form class='popup-form'>
                    <h4>Are sure you want to update this data?</h4>
                    <div class="form-group w-100 user-bottom-btns text-center">
                    <button type="button" class="btn-style" onclick="confirmUpdateData()" id="saveBtn">ok</button>
                    <button type="button" class="btn-style red-btn" onclick="closePopup()" id="cancelBtn">cancel</button>
                    </div>
                </form>
            `;
            template.classList.add("main-popup-div");
            template.setAttribute("id", "update-data-popup");
            document.body.appendChild(template);
        } else {
            let unique = [];
            for (let i = 0; i < personData.length; i++) {
                unique.push(personData[i].emailValue);
            }
            if (unique.includes(emailValue)) {
                email.nextSibling.nextSibling.innerHTML = "Enter unique email ID";
            } else {
                personData.push({ role, nameValue, emailValue, cityValue, countryID, cityID, stateID, phoneValue, passwordValue, stateValue, countryValue, securityQuestions, profileImgURL: profileImgURL, status: "active" })
                localStorage.setItem("notes", JSON.stringify(personData));
                console.log(personData);

                adminPwDiv.innerHTML = "";
                profileImg.src = "img/user.png";
                window.location.href = "login.html";
                document.getElementById("data-form").reset();
            }
        }
    }
}

function signIn() {
    window.location.href = "login.html";
}

function togglePassword(pwValue) {
    if (pwValue == "pw") {
        let passwordType = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", passwordType);
        password.nextElementSibling.nextElementSibling.classList.toggle("pw-hide");
    } else if (pwValue == "adminPW") {
        let adminPasswordType = adminPassword.getAttribute("type") === "password" ? "text" : "password";
        adminPassword.setAttribute("type", adminPasswordType);
        adminPassword.nextElementSibling.nextElementSibling.classList.toggle("pw-hide");
    } else {
        let confirmPasswordType = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
        confirmPassword.setAttribute("type", confirmPasswordType);
        confirmPassword.nextElementSibling.nextElementSibling.classList.toggle("pw-hide");
    }
}
