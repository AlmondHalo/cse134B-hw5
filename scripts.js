
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

let form_errors = [];

const specialChars = /[@#$%^&*_\-+=\[\]{}\\|<>\/~ ]+/;
const nameChars = /[!@#$%^&*\(\)\{\}\[\]\<\>\/;':"-\=\_\+]+/;

const themeSwitcher = document.getElementById("theme-switcher");
themeSwitcher.style.visibility = "visible";

localStorage.setItem("theme", localStorage.getItem("theme") === "dark" ? "light" : "dark");
themeSwitcher.addEventListener('click', (eButton) => {
    console.log("Gets to here");
    setTheme(localStorage.getItem("theme"));
});


function runEventListeners() {
    nameElem.addEventListener('input', (eName) => {
        eName.preventDefault();
        evalName();
    });

    emailElem.addEventListener('input', (eEmail) => {
        eEmail.preventDefault();
        evalEmail();
    });

    commentElem.addEventListener('input', (eComments) => {
        eComments.preventDefault();
        let commentText = document.getElementById("comments");
        let commentInfo = document.getElementById("comments-info");
        let len = commentText.value.length;
        commentInfo.innerHTML = len + "/400";
        if (len > 10 && len < 15) {
            commentText.style.color = "orange";
        }
        else if (len >= 15) {
            commentText.style.color = "red";
        }
        evalComments();
    }); 

    formElem.addEventListener('submit', (eForm) => {
        eForm.preventDefault();
        evalSubmit();
    });
}
runEventListeners();

function evalName() {
    if (nameChars.test(nameElem.value)) {
        updateErrorArray();
        nameElem.setCustomValidity("Name did not validate");
    } else {
        nameElem.setCustomValidity("");
    }
}
function evalEmail() {
    if (emailElem.validity.typeMismatch) {
        updateErrorArray();
        emailElem.setCustomValidity("Email is invalid");
    } else {
        emailElem.setCustomValidity("");
    }
}

function evalComments() {
    if (commentElem.validity.tooLong) {
        updateErrorArray();
        commentElem.setCustomValidity("Comments are too long");
    } 
    else if (commentElem.validity.tooShort) {
        updateErrorArray();
        commentElem.setCustomValidity("Comments are too short");
    }
    else if (specialChars.test(commentElem.value)) {
        updateErrorArray();
        commentElem.setCustomValidity("Comments cannot use special characters");
    } else {
        commentElem.setCustomValidity("");
    }
}

function evalSubmit() { 

    if (nameElem.validity.valid && emailElem.validity.valid && commentElem.validity.valid) {
        let inputErrors = document.getElementById("form-errors");
        // let JSONFormErrors = JSON.parse(JSON.stringify(form_errors));
        for (let i = 0; i < form_errors.length; i++) {
            JSON.stringify(form_errors[i]);
        }
        let JSONFormErrors = JSON.stringify(form_errors);
        inputErrors.value = JSONFormErrors;

        formElem.appendChild(inputErrors);
        formElem.submit();
        clearArray();
    }
}


// Helper Functions
function updateErrorArray() {
    let name = nameElem.value;
    let email = emailElem.value;
    let comments = commentElem.value;
    form_errors.push({name, email, comments})
    // console.log(form_errors);
}
function clearArray() {
    while (form_errors.length > 0) {
        form_errors.pop();
    }
}

// 

function setTheme(theme) {
    const root = document.documentElement;
    console.log("Script gets here");
    if (theme === "light") {
        root.style.setProperty('--dark-drab', 'var(--dark-dark-theme)'); 
        root.style.setProperty('--light-drab', 'var(--light-dark-theme)');
        root.style.setProperty('--dark-white', 'var(--deep-red-theme)');
        localStorage.setItem("theme", "dark");
    } else {
        root.style.setProperty('--dark-drab', 'var(--dark-drab-theme)'); 
        root.style.setProperty('--light-drab', 'var(--light-drab-theme)');
        root.style.setProperty('--dark-white', 'var(--dark-white-theme)');
        localStorage.setItem("theme", "light");
    }
}