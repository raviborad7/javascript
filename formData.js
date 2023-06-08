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
    notes == null ? personData = [] : personData = JSON.parse(notes);
    // personData.sort((a, b) => a.number - b.number);
    // outPutData(personData);
}