

const nameElem = document.getElementById("name");
const emailElem = document.getElementById("email");
const commentElem = document.getElementById("comments");

nameElem.addEventListener("input", (eName) => {
    // TODO: 
    console.log("This Section is reached: 1");
});

/*
emailElem.addEventListener('input', (eEmail) => {
    // TODO: 
    eEmail.preventDefault();
    console.log("This Section is reached: 2");
});

commentElem.addEventListener('textarea', (eComments) => {
    // TODO: 
    eComments.preventDefault();
    console.log("This Section is reached: 3");
});

function evalName() {
    if (nameElem.checkValidity()) {
        // TODO:
    } else {
        // Validate
        nameElem.setCustomValidity("");
    }
}

function evalComments() {
    let commentsValidity = commentElem.validity;
    if (commentsValidity.tooLong) {
        commentElem.setCustomValidity("Comments are too long");
    } 
    else if (commentsValidity.tooShort) {
        commentElem.setCustomValidity("Comments are too short");
    }
    else if (!commentElem.checkValidity()) {
        commentElem.setCustomValidity("Cannot use special characters");
    } else {
        commentElem.setCustomValidity("");
    }
}














/*
// RegExp for each field
// TODO: Find out how to use these
const nameRegExp = "[A-za-z0-9\s]+";
const commentRegExp = "[A-Za-z0-9\s?!.,':;]+";

function runTest() {
    checkValidityName();
    checkValidityComments();
}

// Perform check on name validity
function checkValidityName() {
    let name = document.getElementById("name");
    name.addEventListener("input", (eventName) => {
        if (name.checkValidity()) {
            // TODO: Flash with Error and record Error
            name.setCustomValidity("Name is invalid");
        } else {
            // Empty string sets as valid
            name.setCustomValidity("");
        }
    });
}

// NOTE: email validity shouldn't be necessary

// Perform check on comments validity
function checkValidityComments() {
    // TODO:
    let comments = document.getElementById("comments");
    comments.addEventListener("textarea", (eventComments) => {
        if (comments.validity.checkValidityCommentstooLong()) {
            comments.setCustomValidity("Please add more characters (3 minimum)");
        } 
        else if (comments.validity.tooShort()) {
            comments.setCustomValidity("Textfield overflow (please decrease size of response)");
        }
        else if (comments.validity.typeMismatch) {
            comments.setCustomValidity("")
        }
    });
}

function flashCSS() {
    // TODO: Implement flash functionality
}
*/