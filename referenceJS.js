/**
 
TODO List:
1) *Make stars clickable
2) *Make click listeners for each star
3) *Associate int rating with each star
4) *Change color of star for every click
5) Pull HTML tags relevent to fetch
6) *Replace the form's innerHTML with div tag elem
*/
const ratingWidgetElem = document.getElementById("rating-widget");
const ratingInputElem = document.getElementById("rating-input");
const outputElem = document.getElementById("rating-output");

const formElem = document.getElementById("form");

const inputQuestionElems = document.getElementsByTagName("input");

// TODO: Pull before this elem. (NUKEs formElem)
formElem.innerHTML = ratingInputElem.innerHTML;
let starListElem = [];

// Works
function runEventListeners() {
    for(let i = 1; i < 6; i++) {
        starListElem.push(document.getElementById("star-" + i));
    }
    formElem.addEventListener('submit', (eSubmit) => {
        eSubmit.preventDefault();
    });
    starListeners();
}

// Works
function starListeners() {
    for (let i = 0; i < 5; i++) {
        starListElem[i].onclick = function() {spanClick(i+1)};
    }
}
// TODO: Add in send to fetch request to send value.
function spanClick(val) {
    changeColor(val);
    if ((val/5) >= 0.8) {
        outputElem.innerHTML = "Thanks for " + val + " star rating!";
    } else {
        outputElem.innerHTML = "Thanks for your feedback of " + val + " stars. We'll try to do better!";
    }
    // TODO: fetch api here
    //
    //
    postContent("https://httpbin.org/post", val);
}

//Works
function clearColors() {
    for (let i = 0; i < 5; i++) {
        starListElem[i].style.setProperty('color', 'var(--star-unselected-color)');
    }
}

//Works
function changeColor(bound) {
    clearColors();
    for (let i = 0; i < bound; i++) {
        starListElem[i].style.setProperty('color', 'var(--star-selected-color)')
    }
}
runEventListeners();

let formBody = [];
// TODO: Return to if auto submit does not work
async function postContent(url = "", val) {
    formBody.push("question=" + encodeURIComponent("How satisfied are you?"));
    formBody.push("rating=" + val);
    formBody.push("sentBy=JavaScript");
    formBody.join("&");
    let response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // "Content-Type": "application/JSON",
            "X-Sent-By": "JavaScript",
        },
        // TODO: Finish constructing the body
        body: formBody,
    })
    .then(res => res.json())
    .then((data) => {
        console.log("Data: ")
        console.log(data);
    });
    // return response.json();
}