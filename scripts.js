
/**
 * TODOS:
 * 1 Delete all console log calls
 * 2 finish implementing form_errors
 * 3 Upload the json version of those form errors to the server
 * 4 Add in check for email (might have to cancel previous validation)
 * 5 Add clear array when validation succeeds
 * 
 * 6 Add flashing for comments
 * 
 * 7 Add error message (HTML and CSS fadeout)
 * 
 * 8 Add Change theme option
 */
const nameElem = document.getElementById("name");
const emailElem = document.getElementById("email");
const commentElem = document.getElementById("comments");
const formElem = document.getElementById("contact-form");

const form_errors = [];

const specialChars = /[@#$%^&*_\-+=\[\]{}\\|<>\/~ ]+/;
const nameChars = /[!@#$%^&*\(\)\{\}\[\]\<\>\/;':"-\=\_\+]+/;

function runEventListeners() {
    nameElem.addEventListener('input', (eName) => {
        eName.preventDefault();
        console.log("This Section is reached: 1");
        evalName();
    });

    emailElem.addEventListener('input', (eEmail) => {
        eEmail.preventDefault();
        console.log("This Section is reached: 2");
    });

    commentElem.addEventListener('input', (eComments) => {
        eComments.preventDefault();
        console.log("This Section is reached: 3");
        evalComments();
    }); 

    formElem.addEventListener('submit', (eForm) => {
        // TODO:
        eForm.preventDefault();
        evalSubmit();
    });
    console.log("End has run");
}
runEventListeners();

function evalName() {
    if (nameChars.test(nameElem.value)) {
        console.log("Name did not validate");
        console.log(nameElem.value);
        updateErrorArray();
        nameElem.setCustomValidity("Name did not validate");
    } else {
        // Validate
        console.log("Name validated");
        console.log(nameElem.value)
        nameElem.setCustomValidity("");
    }
}

function evalComments() {
    let commentsValidity = commentElem.validity;
    if (commentsValidity.tooLong) {
        console.log("Comments are too long");
        updateErrorArray();
        commentElem.setCustomValidity("Comments are too long");
    } 
    else if (commentsValidity.tooShort) {
        console.log("Comments are too short");
        updateErrorArray();
        commentElem.setCustomValidity("Comments are too short");
    }
    else if (specialChars.test(commentElem.value)) {
        console.log("Comments cannot use special characters: ");
        updateErrorArray();
        commentElem.setCustomValidity("Comments cannot use special characters");
    } else {
        console.log("Comments validated: ");
        console.log(commentElem.value);
        commentElem.setCustomValidity("");
    }
}

function evalSubmit() { 

    if (nameElem.validity.valid && emailElem.validity.valid && commentElem.validity.valid) {
        // TODO: Submit the form to the server, empty form_errors
        let inputErrors = document.getElementById("form-errors");
        // let JSONFormErrors = JSON.parse(JSON.stringify(form_errors));
        let JSONFormErrors = JSON.stringify(form_errors);
        inputErrors.value = JSONFormErrors;

        formElem.appendChild(inputErrors);
        console.log(JSONFormErrors);
        console.log(formElem);
        formElem.submit();
        clearArray();
    }
}


// Helper Functions
function updateErrorArray() {
    // form_errors.push([nameElem.value, emailElem.value, commentElem.value]);
    let name = nameElem.value;
    let email = emailElem.value;
    let comments = commentElem.value;
    form_errors.push({name, email, comments})
    console.log(form_errors);
}
function clearArray() {
    while (form_errors.length > 0) {
        form_errors.pop();
    }
}