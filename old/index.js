var indexVal, updateVal, sortValue, numSortAry, recordsPerPage, paginationVal = [], currentPage = 1;
let addBtn = document.getElementById("addBtn");
let dataElm = document.getElementById("notes");
let prevBtn = document.getElementById("prevButton");
let nextBtn = document.getElementById("nextButton");
if (localStorage.length == 0) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
}


function addData() {
    let number = document.getElementById("number").value;
    let name = document.getElementById("name").value;
    let subject = document.getElementById("subject").value;
    let mark = document.getElementById("mark").value;
    let dob = document.getElementById("dob").value;
    let notes = localStorage.getItem("notes");
    if (number < 1 || mark < 1) {
        alert("zero or minus number is not valid");
    } else {
        if (number && name && subject && mark && dob !== "") {
            notes == null ? personDataArr = [] : personDataArr = JSON.parse(notes);
            if (addBtn.innerHTML === "Update") {
                addBtn.innerHTML = "Submit";
                let newUpdateVal = [{ number, name, dob, subject, mark, }]
                let newUpdateData = personDataArr.map(obj => newUpdateVal.find(o => o.number === obj.number) || obj);
                personDataArr.sort((a, b) => a.number - b.number);
                document.getElementById("number").disabled = false;
                localStorage.setItem("notes", JSON.stringify(newUpdateData));
                showData();
                nextPrevFun(currentPage);
                document.getElementById("data-form").reset();
            } else {
                let unique = [];
                for (let index = 0; index < personDataArr.length; index++) {
                    unique.push(personDataArr[index].number);
                }
                let newUnique = [];
                for (let i = 0; i < unique.length; i++) {
                    newUnique.push(parseInt(unique[i]));
                }
                let newNum = Number(number);
                if (newUnique.includes(newNum)) {
                    alert("Plz Enter Unique Roll No");
                } else {
                    personDataArr.push({ number, name, dob, subject, mark });
                    personDataArr.sort((a, b) => a.number - b.number);
                    localStorage.setItem("notes", JSON.stringify(personDataArr));
                    paginationFun();
                    nextPrevFun(paginationVal[0]);
                    document.getElementById("data-form").reset();
                }
            }
        } else {
            alert("Plz Enter Value");
        }
    }
}

function outPutData(proArray) {
    let htmlTxt = "";
    proArray.forEach(function (elm) {
        htmlTxt += `<tr>
                <td>${elm.number}</td>
                <td>${elm.name}</td>
                <td>${elm.dob}</td>
                <td>${elm.subject}</td>
                <td>${elm.mark}</td>
                <td><button onclick="editFun(${elm.number})">Edit</button></td>
                <td><button onclick="removeFun(${elm.number})">remove</button></td>
            </tr>`;
    });
    if (notes.length != 0) {
        dataElm.innerHTML = htmlTxt;
    }
}

function showData() {
    let notes = localStorage.getItem("notes");
    notes == null ? personDataArr = [] : personDataArr = JSON.parse(notes);
    personDataArr.sort((a, b) => a.number - b.number);
    outPutData(personDataArr);
}

function removeFun(index) {
    let removeData = personDataArr.filter(test => test.number == index);
    let newPersonDataArr = personDataArr.filter(item => !removeData.some(itemToBeRemoved => itemToBeRemoved.number === item.number))

    localStorage.setItem("notes", JSON.stringify(newPersonDataArr));
    addBtn.innerHTML = "Submit";
    document.getElementById("number").disabled = false;
    document.getElementById("data-form").reset();

    showData();
    paginationListFun();
    nextPrevFun(currentPage);
}

function editFun(index) {
    updateVal = personDataArr.filter(test => test.number == index);
    addBtn.innerHTML = "Update";
    document.getElementById("number").value = updateVal[0].number;
    let name = document.getElementById("name");
    let dob = document.getElementById("dob");
    let subject = document.getElementById("subject");
    let mark = document.getElementById("mark");

    name.value = updateVal[0].name;
    dob.value = updateVal[0].dob;
    subject.value = updateVal[0].subject;
    mark.value = updateVal[0].mark;

    indexVal = index;
    document.getElementById("number").disabled = true;
};

// pagination function
let sortBtn = document.getElementsByClassName("sort-btn");
var paginationNumber = document.getElementsByClassName("pagination-number");
var btns = document.getElementsByClassName("sort-btn");

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

paginationFun();
function paginationFun() {
    showData();
    let select = document.getElementById("selectPage");
    let pageValue = Number(select.value);
    prevBtn.disabled = true;
    nextBtn.disabled = false;
    recordsPerPage = pageValue;
    let paginationObj = [];
    for (let i = 0; i < pageValue; i++) {
        paginationObj.push(personDataArr[i]);
    }
    numSortAry = paginationObj;
    if (pageValue < personDataArr.length) {
    } else {
        showData();
        document.getElementById("paginationList").innerHTML = "";
        numSortAry = personDataArr;
        nextBtn.disabled = true;
        checkSorting();
    }
    outPutData(paginationObj);
    paginationListFun();
    currentPage = 1;
    checkSorting();
}

function paginationListFun() {
    let paginationList = document.getElementById("paginationList");
    paginationList.innerHTML = "";
    for (let a = 1; a <= numPages(); a++) {
        paginationList.innerHTML += `
        <li><button type="button" class="pagination-number" onclick="nextPrevFun(${a})">${a}</button></li>`;
        paginationVal = [];
        paginationVal.push(a);
    }
    let firstPageBtn = document.getElementsByClassName("pagination-number")[0];
    firstPageBtn.classList.add("active_page");
}

function changePageFun(page) {
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    var pagePersonArr = [];
    for (var i = (page - 1) * recordsPerPage; i < (page * recordsPerPage) && i < personDataArr.length; i++) {
        pagePersonArr.push(personDataArr[i]);
    }
    numSortAry = pagePersonArr;
    outPutData(pagePersonArr);
    page === 1 ? prevBtn.disabled = true : prevBtn.disabled = false;
    page === numPages() ? nextBtn.disabled = true : nextBtn.disabled = false;

    for (var i = 0; i < paginationNumber.length; i++) {
        paginationNumber[i].classList.remove("active_page");
    }
    newPageNum = page - 1;
    paginationNumber[newPageNum].classList.add("active_page");
    checkSorting();
}

function checkSorting() {
    if (!sortValue == "") {
        if (sortBtn[sortValue.index].classList.contains("down_arrow")) {
            sortBtn[sortValue.index].classList.remove("down_arrow");
        } else {
            sortBtn[sortValue.index].classList.add("down_arrow");
        }
        sortTableDatas(sortValue);
    }
}

function nextPrevFun(btnName) {
    if (btnName == "prev") {
        if (currentPage >= (paginationVal[0] + 1)) {
            currentPage = paginationVal[0];
        }
        if (currentPage > 1) {
            currentPage--;
        }
    } else if (btnName == "next") {
        if (currentPage < numPages()) {
            currentPage++;
        }
    } else if (typeof btnName == "number") {
        currentPage = btnName;
    }
    changePageFun(currentPage);
}
function numPages() {
    return Math.ceil(personDataArr.length / recordsPerPage);
}

// searchBar 
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener('input', function (event) {
    let keyword = event.target.value;
    if (keyword !== "") {
        let newNoteOBJ = numSortAry.filter(obj => Object.values(obj).some(val => val.includes(keyword)));
        outPutData(newNoteOBJ);
    } else {
        nextPrevFun(currentPage);
    }
});

// sort Table
function sortTableDatas(data) {
    sortValue = data;
    if (data.dataName == "number" || data.dataName == "mark") {
        if (!sortBtn[data.index].classList.contains("down_arrow")) {
            sortBtn[data.index].classList.add("down_arrow");
            numSortAry = numSortAry.sort((x, y) => y[data.dataName] - x[data.dataName]);
        } else {
            sortBtn[data.index].classList.remove("down_arrow");
            numSortAry = numSortAry.sort((x, y) => x[data.dataName] - y[data.dataName]);
        }
    } else {
        if (!sortBtn[data.index].classList.contains("down_arrow")) {
            sortBtn[data.index].classList.add("down_arrow");
            numSortAry = numSortAry.sort((x, y) => x[data.dataName] > y[data.dataName] ? -1 : 0);
        } else {
            sortBtn[data.index].classList.remove("down_arrow");
            numSortAry = numSortAry.sort((x, y) => x[data.dataName] < y[data.dataName] ? -1 : 0);
        }
    }
    outPutData(numSortAry);
}








// other task
let newSet = new Set();

function mapFun() {
    let newMap = new Map();
    let myName = document.getElementById("myName").value;
    let country = document.getElementById("country").value;
    var mapTrue = true;

    if (newSet.size) {
        for (const i of newSet) {
            i.forEach(function (key, val) {
                if (key == country) {
                    i.set(myName, country);
                    // console.log(country, key);
                    mapTrue = false;
                }
            })
        }
        if (mapTrue) {
            newSet.add(newMap);
            newMap.set(myName, country);
            // console.log("else");
        }
    } else {
        newSet.add(newMap);
        newMap.set(myName, country);
    }
    console.log("set", newSet);
}















////////////////////////////

let subForm = document.getElementById("forgot-sub-form");
let forgotEmailData;
let question = document.getElementById("question");
let trueFalse = true;
let notes = localStorage.getItem("notes");
notes == null ? serverData = [] : serverData = JSON.parse(notes);
let validType = true;


function showQuestion() {
    if (trueFalse) {
        let forgotPwEmail = document.getElementById("forgotPwEmail").value;
        if (forgotPwEmail !== "") {
            document.getElementById("forgotPwEmail").nextSibling.nextSibling.innerHTML = ""
            forgotEmailData = serverData.filter(test => test.emailValue == forgotPwEmail);
            if (forgotEmailData.length == 0) {
                document.getElementById("forgotPwEmail").nextSibling.nextSibling.innerHTML = "Plz Enter Valid Email ID";
            } else {
                document.getElementById("forgotPwEmail").nextSibling.nextSibling.innerHTML = "";
                subForm.style.display = "block";
                for (const key in forgotEmailData[0].securityQuestions) {
                    question.innerHTML += `<option value="${key}">${key}</option>`;
                }
                trueFalse = false;
            }
        } else {
            document.getElementById("forgotPwEmail").nextSibling.nextSibling.innerHTML = "Plz Enter Email ID";
        }
    } else {
        let answer = document.getElementById("answer").value;

        if (answer == "") {
            document.getElementById("answer").nextSibling.nextSibling.innerHTML = "Plz Enter Answer";
            validType = false;
        } else {
            document.getElementById("answer").nextSibling.nextSibling.innerHTML = "";
        }

        questionValue = question.value;

        let allSecurityQuestions = [forgotEmailData[0].securityQuestions]
        let rightAnswer = { [questionValue]: answer }

        console.log(rightAnswer.Childhood_name);
        console.log(allSecurityQuestions[0]);

        if (rightAnswer[questionValue] == allSecurityQuestions[0]) {
            console.log("if");
        }

        // for (const nkey in rightAnswer) {
        //     for (const key in allSecurityQuestions[0]) {
        //         if (key == nkey && allSecurityQuestions[0][key] == rightAnswer[nkey]) {
        //             console.log("if");
        //             // document.getElementById("answer").nextSibling.nextSibling.innerHTML = "";
        //             // let newPW = document.getElementById("newPassword").value;
        //             // let confirmNewPW = document.getElementById("confirmNewPassword").value;
        //             // if (newPW !== "") {
        //             //     document.getElementById("newPassword").nextSibling.nextSibling.innerHTML = "";
        //             // } else {
        //             //     document.getElementById("newPassword").nextSibling.nextSibling.innerHTML = "Plz Enter Password";
        //             // }
        //             // if (newPW == confirmNewPW) {
        //             //     let updatePassword = [{
        //             //         city: forgotEmailData[0].city,
        //             //         country: forgotEmailData[0].country,
        //             //         email: forgotEmailData[0].email,
        //             //         name: forgotEmailData[0].name,
        //             //         password: newPW,
        //             //         phone: forgotEmailData[0].phone,
        //             //         role: forgotEmailData[0].role,
        //             //         state: forgotEmailData[0].state,
        //             //         status: forgotEmailData[0].status,
        //             //         securityQuestions: allSecurityQuestions[0]
        //             //     }];
        //             //     let updatePasswordData = serverData.map(obj => updatePassword.find(o => o.email === obj.email) || obj);
        //             //     localStorage.setItem("notes", JSON.stringify(updatePasswordData));
        //             //     window.location.href = "login.html";
        //             // }
        //         } else {
        //             console.log("els");
        //             // document.getElementById("answer").nextSibling.nextSibling.innerHTML = "Plz Enter Right Answer";
        //         }
        //     }
        // }
    }
}




function togglePassword(pwValue) {
    if (pwValue == "pw") {
        let passwordType = newPassword.getAttribute("type") === "password" ? "text" : "password";
        newPassword.setAttribute("type", passwordType);
        newPassword.nextElementSibling.classList.toggle("pw-hide");
    } else {
        let confirmPasswordType = confirmNewPassword.getAttribute("type") === "password" ? "text" : "password";
        confirmNewPassword.setAttribute("type", confirmPasswordType);
        confirmNewPassword.nextElementSibling.classList.toggle("pw-hide");
    }
}
