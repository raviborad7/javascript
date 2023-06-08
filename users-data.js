let dataElm = document.getElementById("data-list");
let recordsPerPage, currentPage = 1, paginationVal = [], sortValue;
let newPersonData;
showData();

function outPutData(proArray) {
    let notes = localStorage.getItem("notes");
    let htmlTxt = "";
    proArray.forEach(function (elm, index) {
        let checkedType;
        if (elm.status == "active") {
            checkedType = true;
        } else {
            checkedType = false;
        }

        htmlTxt += `<tr>
                <td><img src="${elm.profileImgURL}"/></td>
                <td>${elm.nameValue}</td>
                <td>${elm.emailValue}</td>
                <td>${elm.cityValue}</td>
                <td>${elm.stateValue}</td>
                <td>${elm.countryValue}</td>
                <td>${elm.phoneValue}</td>
                <td>
                    <label><input type="radio" onchange="statusChange('${elm.emailValue}')" ${checkedType ? 'checked' : ''} value="active" checked name="status${index}" id="active"/>active</label>
                    <label><input type="radio" onchange="statusChange('${elm.emailValue}')" ${checkedType ? '' : 'checked'} value="deactive" name="status${index}" id="deactive"/>deactive</label>
                </td>
                <td><button onclick="editData('${elm.emailValue}')" class="new-btn">edit</button><button onclick="removeData('${elm.emailValue}')" class="new-btn remove-btn" >remove</button></td>
            </tr>`;
    });
    if (notes.length != 0) {
        dataElm.innerHTML = htmlTxt;
    }
}

function backPageChange() {
    window.history.go(-1);
}

function showData() {
    let notes = localStorage.getItem("notes");
    notes == null ? personDataArr = [] : personDataArr = JSON.parse(notes);

    let removeData = personDataArr.filter(test => test.role == "admin");
    newPersonData = personDataArr.filter(item => !removeData.some(itemToBeRemoved => itemToBeRemoved.role === item.role));
    outPutData(newPersonData);
}

function removeData(removeEmail) {
    const template = document.createElement('div');
    template.innerHTML = `
        <form class='popup-form'>
            <h4>Are sure you want to delete this data?</h4>
            <div class="form-group w-100 user-bottom-btns text-center">
            <button type="button" class="btn-style" onclick="confirmRemoveData('${removeEmail}')" id="saveBtn">ok</button>
                <button type="button" class="btn-style red-btn" onclick="closePopup()" id="cancelBtn">cancel</button>
            </div>
        </form>
    `;
    template.classList.add("main-popup-div");
    template.setAttribute("id", "reset-password-popup");
    document.body.appendChild(template);
}

function confirmRemoveData(removeEmail) {
    let notes = localStorage.getItem("notes");
    notes == null ? personDataArr = [] : personDataArr = JSON.parse(notes);

    let removeData = personDataArr.filter(test => test.emailValue == removeEmail);

    let removePersonData = personDataArr.filter(item => !removeData.some(itemToBeRemoved => itemToBeRemoved.emailValue === item.emailValue));
    console.log(removePersonData);

    localStorage.setItem("notes", JSON.stringify(removePersonData));
    showData();
    paginationListFun();
    nextPrevFun(currentPage);
    let resetPasswordPopup = document.getElementById("reset-password-popup");
    resetPasswordPopup.remove();
}

function closePopup() {
    let resetPasswordPopup = document.getElementById("reset-password-popup");
    resetPasswordPopup.remove();
}

function editData(editEmail) {
    let notes = localStorage.getItem("notes");
    notes == null ? personDataArr = [] : personDataArr = JSON.parse(notes);

    let editData = personDataArr.filter(test => test.emailValue == editEmail);
    console.log(editData);
    localStorage.setItem("editPersonEmail", editData[0].emailValue);
    window.location.href = "signUp.html";
}

function statusChange(statusEmail) {
    let notes = localStorage.getItem("notes");
    notes == null ? personDataArr = [] : personDataArr = JSON.parse(notes);

    let statusChangeData = personDataArr.filter(test => test.emailValue == statusEmail);
    if (statusChangeData[0].status == "deactive") {
        statusChangeData[0].status = "active";
    } else {
        statusChangeData[0].status = "deactive";
    }
    let updateStatusData = personDataArr.map(obj => statusChangeData.find(o => o.emailValue === obj.emailValue) || obj);
    localStorage.setItem("notes", JSON.stringify(updateStatusData));
}
//////////////////////////////////////

let prevBtn = document.getElementById("prevButton");
let nextBtn = document.getElementById("nextButton");
var paginationNumber = document.getElementsByClassName("pagination-number");

let sortBtn = document.getElementsByClassName("sort-btn");
// paginationFun();
// window.onload = () => {
//     const mouseOnlyNumberInputField = document.getElementById("selectPage");
//     mouseOnlyNumberInputField.addEventListener("keypress", (event) => {
//         event.preventDefault();
//     });
// }
let numSortAry;
paginationFun();
function paginationFun() {
    showData();
    let select = document.getElementById("selectPage");
    let pageValue = Number(select.value);
    // prevBtn.disabled = true;
    // nextBtn.disabled = false;
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    recordsPerPage = pageValue;
    let paginationObj = [];
    for (let i = 0; i < pageValue; i++) {
        paginationObj.push(newPersonData[i]);
    }
    numSortAry = paginationObj;

    if (pageValue < newPersonData.length) {
    } else {
        showData();
        document.getElementById("paginationList").innerHTML = "";
        numSortAry = newPersonData;
        nextBtn.style.display = 'none';
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
let testArray;
function changePageFun(page) {
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    var pagePersonArr = [];
    for (var i = (page - 1) * recordsPerPage; i < (page * recordsPerPage) && i < newPersonData.length; i++) {
        pagePersonArr.push(newPersonData[i]);
    }
    testArray = pagePersonArr;
    numSortAry = pagePersonArr;
    outPutData(pagePersonArr);
    page === 1 ? prevBtn.style.display = 'none' : prevBtn.style.display = 'block';
    page === numPages() ? nextBtn.style.display = 'none' : nextBtn.style.display = 'block';

    for (var i = 0; i < paginationNumber.length; i++) {
        paginationNumber[i].classList.remove("active_page");
    }
    let newPageNum = page - 1;
    paginationNumber[newPageNum].classList.add("active_page");
    checkSorting();
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
    return Math.ceil(newPersonData.length / recordsPerPage);
}
// console.log(numSortAry);

let removeImgArray;
let showAllData;
function searchData() {
    removeImgArray = numSortAry;
    for (let i = 0; i < removeImgArray.length; i++) {
        delete removeImgArray[i].securityQuestions;
        delete removeImgArray[i].profileImgURL;
        delete removeImgArray[i].role;
        delete removeImgArray[i].cityID;
        delete removeImgArray[i].countryID;
        delete removeImgArray[i].stateID;
        delete removeImgArray[i].status;
        delete removeImgArray[i].passwordValue;
    }
    let notes = localStorage.getItem("notes");
    notes == null ? personDataArr = [] : personDataArr = JSON.parse(notes);
    let removeData = personDataArr.filter(test => test.role == "admin");
    showAllData = personDataArr.filter(item => !removeData.some(itemToBeRemoved => itemToBeRemoved.role === item.role));
}

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener('input', function (event) {
    let searchEmails = [];
    let keyword = event.target.value;
    if (keyword !== "") {
        let newNoteOBJ = removeImgArray.filter(obj => Object.values(obj).some(val => val.includes(keyword)));
        console.log(keyword);
        searchEmails = [];
        for (let i = 0; i < newNoteOBJ.length; i++) {
            searchEmails.push(newNoteOBJ[i].emailValue);
        }

        let newTest = [];
        for (let i = 0; i < searchEmails.length; i++) {
            let test = showAllData.filter((item) => item.emailValue === searchEmails[i]);
            newTest.push(test[0]);
        }
        outPutData(newTest);
    } else {
        showData();
        nextPrevFun(currentPage);
    }
});

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

// sort Table
function sortTableDatas(data) {
    console.log(data);
    sortValue = data;
    if (!sortBtn[data.index].classList.contains("down_arrow")) {
        sortBtn[data.index].classList.add("down_arrow");
        numSortAry = numSortAry.sort((x, y) => x[data.name] > y[data.name] ? -1 : 0);
        // console.log("t", numSortAry);
    } else {
        sortBtn[data.index].classList.remove("down_arrow");
        numSortAry = numSortAry.sort((x, y) => x[data.name] < y[data.name] ? -1 : 0);
        // console.log("b", numSortAry);
    }
    // console.log(numSortAry);
    outPutData(numSortAry);
}