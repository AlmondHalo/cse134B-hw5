
/**
 * TODO List:
 * 1) *Make stars clickable
 * 2) *Make click listeners for each star
 * 3) *Associate int rating with each star
 * 4) *Change color of star for every click
 * 
 * 5) Pull HTML tags relevent to fetch
 * 6) *Replace the form's innerHTML with div tag elem
 */
const ratingWidgetElem = document.getElementById("rating-widget");
const ratingInputElem = document.getElementById("rating-input");

const formElem = document.getElementById("form");

// TODO: Pull before this elem. (NUKEs formElem)
formElem.innerHTML = ratingInputElem.innerHTML;
let starListElem = [];

// Works
function runEventListeners() {
    for(let i = 1; i < 6; i++) {
        starListElem.push(document.getElementById("star-" + i));
    }
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
    console.log("Value: " + val); 
    changeColor(val);

    if ((val/5) >= 0.8) {
        console.log("Thanks for " + val + " star rating!");
        formElem.innerHTML = "Thanks for " + val + " star rating!";
    } else {
        console.log("Thanks for your feedback of " + val + " stars. We'll try to do better!");
        formElem.innerHTML = "Thanks for your feedback of " + val + " stars. We'll try to do better!";
    }
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