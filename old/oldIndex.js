let addBtn = document.getElementById("addBtn");
var indexVal;
var paginationVal = [];
var updateVal;
var paginationEditVal;
showData();

function addDataFun() {
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
                paginationPageFun(currentPage);
                resetFieldsFun();
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
                    personDataArr.push({ number, name, dob, subject, mark, });
                    personDataArr.sort((a, b) => a.number - b.number);
                    localStorage.setItem("notes", JSON.stringify(personDataArr));
                    paginationFun();
                    paginationPageFun(paginationVal[0]);
                    resetFieldsFun();
                }
            }
        } else {
            alert("Plz Enter Value");
        }
    }
}

function resetFieldsFun() {
    document.getElementById("number").value = "";
    document.getElementById("name").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("mark").value = "";
    document.getElementById("dob").value = "";
}

function showData() {
    let notes = localStorage.getItem("notes");
    notes == null ? personDataArr = [] : personDataArr = JSON.parse(notes);

    let htmlTxt = "";
    personDataArr.sort((a, b) => a.number - b.number);
    personDataArr.forEach(function (elm) {
        htmlTxt += `
        <tr>
            <td>${elm.number}</td>
            <td>${elm.name}</td>
            <td>${elm.dob}</td>
            <td>${elm.subject}</td>
            <td>${elm.mark}</td>
            <td><button onclick="editFun(${elm.number})">Edit</button></td>
            <td><button onclick="removeFun(${elm.number})">remove</button></td>
        </tr>
        `;
    });
    let dataElm = document.getElementById("notes");
    if (notes.length != 0) {
        dataElm.innerHTML = htmlTxt;
    }

}

function removeFun(index) {
    let removeData = personDataArr.filter(test => test.number == index);
    let newPersonDataArr = personDataArr.filter(item => !removeData.some(itemToBeRemoved => itemToBeRemoved.number === item.number))

    localStorage.setItem("notes", JSON.stringify(newPersonDataArr));
    addBtn.innerHTML = "Submit";
    document.getElementById("number").disabled = false;
    resetFieldsFun();

    showData();
    paginationListFun();
    paginationPageFun(currentPage);
}

function editFun(index) {
    updateVal = personDataArr.filter(test => test.number == index);
    addBtn.innerHTML = "Update";
    let number = document.getElementById("number");
    let name = document.getElementById("name");
    let dob = document.getElementById("dob");
    let subject = document.getElementById("subject");
    let mark = document.getElementById("mark");

    number.value = updateVal[0].number;
    name.value = updateVal[0].name;
    dob.value = updateVal[0].dob;
    subject.value = updateVal[0].subject;
    mark.value = updateVal[0].mark;

    indexVal = index;
    document.getElementById("number").disabled = true;
    paginationListFun();
};

// pagination function
var numSortAry;
var recordsPerPage;
var currentPage = 1;
let prevBtn = document.getElementById("prevButton");
let nextBtn = document.getElementById("nextButton");
const numSort = document.getElementById("numSort");
const nameSort = document.getElementById("nameSort");
const dobSort = document.getElementById("dobSort");
const subSort = document.getElementById("subSort");
const markSort = document.getElementById("markSort");
prevBtn.disabled = true;
nextBtn.disabled = true;
let activeBtn = numSort;
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
        // console.log("if");
    } else {
        showData();
        document.getElementById("paginationList").innerHTML = "";
        numSortAry = personDataArr;
        nextBtn.disabled = true;
        // sortFuncall();
    }

    let htmlTxt = "";
    paginationObj.forEach(function (elm) {
        htmlTxt += `
            <tr>
                <td>${elm.number}</td>
                <td>${elm.name}</td>
                <td>${elm.dob}</td>
                <td>${elm.subject}</td>
                <td>${elm.mark}</td>
                <td><button onclick="editFun(${elm.number})">Edit</button></td>
                <td><button onclick="removeFun(${elm.number})">remove</button></td>
            </tr>
        `;
    });

    let dataElm = document.getElementById("notes");
    if (notes.length !== 0) {
        dataElm.innerHTML = htmlTxt;
    }
    paginationListFun();
    currentPage = 1;

    // sortFuncall();
}

// function sortFuncall() {
//     if (activeBtn == numSort) {
//         allNumSortFun();
//     } else if (activeBtn == nameSort) {
//         allNameSortFun();
//     } else if (activeBtn == dobSort) {
//         allDobSortFun()
//     } else if (activeBtn == subSort) {
//         allSubSortFun();
//     } else if (activeBtn == markSort) {
//         console.log("mark");
//         allMarkSortFun();
//     }
// }

function paginationListFun() {
    let paginationList = document.getElementById("paginationList");
    paginationList.innerHTML = "";
    for (let a = 1; a <= numPages(); a++) {
        paginationList.innerHTML += `
        <li><button type="button" class="pagination-number" onclick="paginationPageFun(${a})">${a}</button></li>`;
        paginationVal = []
        paginationVal.push(a);
    }

    let firstPageBtn = document.getElementsByClassName("pagination-number")[0];
    firstPageBtn.classList.add("active_page");
    // console.log(paginationVal[0]);
}
function changePageFun(page) {

    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    var pagePersonArr = [];
    for (var i = (page - 1) * recordsPerPage; i < (page * recordsPerPage) && i < personDataArr.length; i++) {
        pagePersonArr.push(personDataArr[i]);
    }
    numSortAry = pagePersonArr;
    let htmlTxt = "";
    pagePersonArr.forEach(function (elm) {
        htmlTxt += `
            <tr>
                <td>${elm.number}</td>
                <td>${elm.name}</td>
                <td>${elm.dob}</td>
                <td>${elm.subject}</td>
                <td>${elm.mark}</td>
                <td><button onclick="editFun(${elm.number})">Edit</button></td>
                <td><button onclick="removeFun(${elm.number})">remove</button></td>
            </tr>
        `;
    });

    let dataElm = document.getElementById("notes");
    if (notes.length !== 0) {
        dataElm.innerHTML = htmlTxt;
    }
    if (page === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    if (page === numPages()) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
    // sortFuncall();

    for (var i = 0; i < paginationNumber.length; i++) {
        paginationNumber[i].classList.remove("active_page");
    }
    newPageNum = page - 1;
    paginationNumber[newPageNum].classList.add("active_page");
}

function paginationPageFun(PageNum) {
    currentPage = PageNum;
    changePageFun(PageNum);
}
function prevPageFun() {
    if (currentPage >= (paginationVal[0] + 1)) {
        currentPage = paginationVal[0];
        console.log("if");
    }
    if (currentPage > 1) {
        currentPage--;
        changePageFun(currentPage);
    }
}
function nextPageFun() {
    if (currentPage < numPages()) {
        currentPage++;
        changePageFun(currentPage);
    }
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
        if (newNoteOBJ.length === 0) {
            alert("No Data found, Plz Enter valid value");
        }
        let htmlTxt = "";
        newNoteOBJ.forEach(function (elm) {
            htmlTxt += `
                <tr >
                <td>${elm.number}</td>
                <td>${elm.name}</td>
                <td>${elm.dob}</td>
                <td>${elm.subject}</td>
                <td>${elm.mark}</td>
                <td><button onclick="editFun(${elm.number})">Edit</button></td>
                <td><button onclick="removeFun(${elm.number})">remove</button></td>
                </tr>
            `;
        });
        let dataElm = document.getElementById("notes");
        if (notes.length != 0) {
            dataElm.innerHTML = htmlTxt;
        }
    } else {
        paginationPageFun(currentPage);
    }
});

// no sort
// function mainNoSortFun() {
//     activeBtn = numSort;
//     nameSort.classList.remove("down_arrow");
//     dobSort.classList.remove("down_arrow");
//     subSort.classList.remove("down_arrow");
//     markSort.classList.remove("down_arrow");
//     if (numSort.classList.contains('down_arrow')) {
//         topNumSortFun();
//         numSort.classList.remove("down_arrow");
//     } else {
//         bottomNumSortFun();
//         numSort.classList.add("down_arrow");
//     }
// }
// function allNumSortFun() {
//     if (!numSort.classList.contains('down_arrow')) {
//         topNumSortFun();
//     } else {
//         bottomNumSortFun();
//     }
// }
// function topNumSortFun() {
//     numSortAry.sort((a, b) => a.number - b.number);
//     showSortFun();
// }
// function bottomNumSortFun() {
//     numSortAry.sort((a, b) => b.number - a.number);
//     showSortFun();
// }

// // mark sort
// function mainMarkSortFun() {
//     activeBtn = markSort;
//     numSort.classList.remove("down_arrow");
//     nameSort.classList.remove("down_arrow");
//     dobSort.classList.remove("down_arrow");
//     subSort.classList.remove("down_arrow");
//     if (markSort.classList.contains('down_arrow')) {
//         topMarkFun();
//         markSort.classList.remove("down_arrow");
//     } else {
//         bottomMarkFun();
//         markSort.classList.add("down_arrow");
//     }
// }
// function topMarkFun() {
//     numSortAry.sort((a, b) => a.mark - b.mark);
//     showSortFun();
// }
// function bottomMarkFun() {
//     numSortAry.sort((a, b) => b.mark - a.mark);
//     showSortFun();
// }
// function allMarkSortFun() {
//     if (!markSort.classList.contains('down_arrow')) {
//         topMarkFun();
//     } else {
//         bottomMarkFun();
//     }
// }

// // name sort
// function mainNameSortFun() {
//     activeBtn = nameSort;
//     numSort.classList.remove("down_arrow");
//     dobSort.classList.remove("down_arrow");
//     subSort.classList.remove("down_arrow");
//     markSort.classList.remove("down_arrow");
//     if (nameSort.classList.contains('down_arrow')) {
//         topNameFun();
//         nameSort.classList.remove("down_arrow");
//     } else {
//         bottomNameFun();
//         nameSort.classList.add("down_arrow");
//     }
// }
// function topNameFun() {
//     numSortAry.sort((x, y) => {
//         let Xname = x.name.toUpperCase();
//         let Yname = y.name.toUpperCase();
//         if (Xname < Yname) {
//             return -1;
//         }
//         if (Xname > Yname) {
//             return 1;
//         }
//         return 0;
//     });
//     showSortFun();
// }
// function bottomNameFun() {
//     numSortAry.sort((x, y) => {
//         let Xname = x.name.toUpperCase();
//         let Yname = y.name.toUpperCase();
//         if (Xname > Yname) {
//             return -1;
//         }
//         if (Xname < Yname) {
//             return 1;
//         }
//         return 0;
//     });
//     showSortFun();
// }
// function allNameSortFun() {
//     if (!nameSort.classList.contains('down_arrow')) {
//         topNameFun();
//     } else {
//         bottomNameFun();
//     }
// }

// // dob sort
// function mainDobSortFun() {
//     activeBtn = dobSort;
//     numSort.classList.remove("down_arrow");
//     nameSort.classList.remove("down_arrow");
//     subSort.classList.remove("down_arrow");
//     markSort.classList.remove("down_arrow");
//     if (dobSort.classList.contains('down_arrow')) {
//         topDobFun();
//         dobSort.classList.remove("down_arrow");
//     } else {
//         bottomDobFun();
//         dobSort.classList.add("down_arrow");
//     }
// }
// function topDobFun() {
//     numSortAry.sort(function (a, b) {
//         return new Date(a.dob) - new Date(b.dob);
//     });
//     showSortFun();
// }
// function bottomDobFun() {
//     numSortAry.sort(function (a, b) {
//         return new Date(b.dob) - new Date(a.dob);
//     });
//     showSortFun();
// }
// function allDobSortFun() {
//     if (!dobSort.classList.contains('down_arrow')) {
//         topDobFun();
//     } else {
//         bottomDobFun();
//     }
// }

// // sub sort
// function mainSubSortFun() {
//     activeBtn = subSort;
//     numSort.classList.remove("down_arrow");
//     nameSort.classList.remove("down_arrow");
//     dobSort.classList.remove("down_arrow");
//     markSort.classList.remove("down_arrow");
//     if (subSort.classList.contains('down_arrow')) {
//         topSubFun();
//         subSort.classList.remove("down_arrow");
//     } else {
//         bottomSubFun();
//         subSort.classList.add("down_arrow");
//     }
// }
// function topSubFun() {
//     numSortAry.sort((x, y) => {
//         let Xsubject = x.subject.toUpperCase();
//         let Ysubject = y.subject.toUpperCase();
//         if (Xsubject < Ysubject) {
//             return -1;
//         }
//         if (Xsubject > Ysubject) {
//             return 1;
//         }
//         return 0;
//     });
//     showSortFun();
// }
// function bottomSubFun() {
//     numSortAry.sort((x, y) => {
//         let Xsubject = x.subject.toUpperCase();
//         let Ysubject = y.subject.toUpperCase();
//         if (Xsubject > Ysubject) {
//             return -1;
//         }
//         if (Xsubject < Ysubject) {
//             return 1;
//         }
//         return 0;
//     });
//     showSortFun();
// }
// function allSubSortFun() {
//     if (!subSort.classList.contains('down_arrow')) {
//         topSubFun();
//     } else {
//         bottomSubFun();
//     }
// }

// function showSortFun() {
//     let htmlTxt = "";
//     numSortAry.forEach(function (elm) {
//         htmlTxt += `
//             <tr>
//                 <td>${elm.number}</td>
//                 <td>${elm.name}</td>
//                 <td>${elm.dob}</td>
//                 <td>${elm.subject}</td>
//                 <td>${elm.mark}</td>
//                 <td><button onclick="editFun(${elm.number})">Edit</button></td>
//                 <td><button onclick="removeFun(${elm.number})">remove</button></td>
//             </tr>
//         `;
//     });
//     let dataElm = document.getElementById("notes");
//     dataElm.innerHTML = htmlTxt;
// }



// function showApiData() {
//     document.getElementById('loading').style.display = 'block';
//     getapi(apiUrl);
// }
// const apiUrl = "https://api.publicapis.org/entries";
// async function getapi(url) {
//     const response = await fetch(url);
//     var data = await response.json();
//     console.log(data);
//     if (response) {
//         hideloader();
//     }
//     display(data);
// }

// function hideloader() {
//     document.getElementById('loading').style.display = 'none';
// }

// function display(data) {
//     let tab =
//         `<tr>
//           <th>API</th>
//           <th>Auth</th>
//           <th>Category</th>
//           <th>Cors</th>
//           <th>Description</th>
//           <th>HTTPS</th>
//           <th>Link</th>
//          </tr>`;

//     for (let a of data.entries) {
//         // console.log(a.Auth);
//         if (a.Auth == "") {
//             a.Auth = "null";
//         }
//         tab += `<tr>
//                     <td>${a.API} </td>
//                     <td>${a.Auth}</td>
//                     <td>${a.Category}</td>
//                     <td>${a.Cors}</td>
//                     <td>${a.Description}</td>
//                     <td>${a.HTTPS}</td>
//                     <td>${a.Link}</td>
//                 </tr>`;
//     }
//     // Setting innerHTML as tab variable
//     document.getElementById("employees").innerHTML = tab;
// }