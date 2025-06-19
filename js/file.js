var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");

var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var username = document.getElementById("username");

var emailError = document.getElementById("emailError");
var passError = document.getElementById("passError");
var nameError = document.getElementById("nameError");



var accList;


if (window.localStorage.getItem("accList")) {

    accList = JSON.parse(window.localStorage.getItem("accList"))
}
else {
    accList = [];
}


function signUp() {
    var account = {
        Name: signupName.value,
        Email: signupEmail.value,
        Password: signupPassword.value
    };

     const emailValid = regexEmail2();
    const passValid = regexPass2();
        const nameValid = regexName2();

    if (!emailValid || !passValid || !nameValid) {
        // ما تكملش تسجيل الدخول
        return;
    }



    // ✅ التحقق من تكرار الإيميل داخل localStorage
    var storedAccounts = JSON.parse(localStorage.getItem("accList")) || [];

    var isDuplicate = false;

    for (var i = 0; i < storedAccounts.length; i++) {
        if (storedAccounts[i].Email.toLowerCase() === account.Email.toLowerCase()) {
            isDuplicate = true;
            break; // نوقف أول ما نلاقي تكرار
        }
    }

    if (isDuplicate) {
        
        document.getElementById("dublicatedEmail").innerHTML="Dublicated Email"
        return;
    }

    else {
        accList.push(account);
        saveToLocalStorage(accList);
        // ✅ التوجيه إلى صفحة تسجيل الدخول
        window.location.href = "signin.html";
    }
}



function login() {
      // تحقق أولًا من صحة المدخلات
    const emailValid = regexEmail();
    const passValid = regexPass();

    if (!emailValid || !passValid) {
        // ما تكملش تسجيل الدخول
        return;
    }



    var storedAccounts = JSON.parse(localStorage.getItem("accList")) || [];

    var isLoggedIn = false;

    for (var i = 0; i < storedAccounts.length; i++) {
        if (
            storedAccounts[i].Email.toLowerCase() === signinEmail.value.toLowerCase() &&
            storedAccounts[i].Password === signinPassword.value
        ) {
            isLoggedIn = true;
            localStorage.setItem("loggedInEmail", storedAccounts[i].Name);
            break;
        }
    }

      if (isLoggedIn) {
        document.getElementById("generalError").innerHTML = "";
        window.location.href = "welcome.html";
    } else {
        document.getElementById("generalError").innerHTML = "Invalid email or password";
    }
}

function saveToLocalStorage(arr) {

    window.localStorage.setItem("accList", JSON.stringify(arr));

}


window.onload = function () {
    var NameOfUser = localStorage.getItem("loggedInEmail");
    var username = document.getElementById("username");

    if (username) {
        username.innerText = NameOfUser ? `Welcome ${NameOfUser}` : "Welcome Guest";
    }
};

function logout() {
    // نحذف بيانات الدخول من localStorage
    localStorage.removeItem("loggedInEmail");

    // نرجّع المستخدم لصفحة تسجيل الدخول
    window.location.href = "signin.html";
}


// ✅ التحقق من إدخال الإيميل
function regexEmail() {
    var regex = /[a-zA-Z0-9]+/;
    if (!regex.test(signinEmail.value)) {
        emailError.innerHTML = "Email input is required";
        return false;
    } else {
        emailError.innerHTML = "";
        return true;
    }
}

// ✅ التحقق من إدخال الباسورد
function regexPass() {
    var regex = /[a-zA-Z0-9]+/;
    if (!regex.test(signinPassword.value)) {
        passError.innerHTML = "Password input is required";
        return false;
    } else {
        passError.innerHTML = "";
        return true;
    }
}






// ✅ التحقق من إدخال الإيميل
function regexEmail2() {
    var regex = /[a-zA-Z0-9]+/;
    if (!regex.test(signupEmail.value)) {
        emailError.innerHTML = "Email input is required";
        return false;
    } else {
        emailError.innerHTML = "";
        return true;
    }
}

// ✅ التحقق من إدخال الباسورد
function regexPass2() {
    var regex = /[a-zA-Z0-9]+/;
    if (!regex.test(signupPassword.value)) {
        passError.innerHTML = "Password input is required";
        return false;
    } else {
        passError.innerHTML = "";
        return true;
    }
}


function regexName2() {
    var regex = /[a-zA-Z0-9]+/;
    if (!regex.test(signupName.value)) {
        nameError.innerHTML = "name input is required";
        return false;
    } else {
        nameError.innerHTML = "";
        return true;
    }
}
