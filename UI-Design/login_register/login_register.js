function openPopUp() {
    prompt("Please enter your e-mail and we will contact you as soon as possible!")
}


function login() {

    if (document.loginForm.username.value == "" || document.loginForm.password.value == "") {
        alert("Username or password not filled!");
        return;
    }
    else {

        let obj = {
            username: document.loginForm.username.value,
            password: document.loginForm.password.value
        }

        sendLoginData(obj).then((result) => {
            alert("Log-in successful!")
            if (result[0].role == 'user') {
                window.location.href = "../main_page/main_page.html?user=" + document.loginForm.username.value;
            }
            else if (result[0].role == "operator") {
                window.location.href = "../main_page/main_page.html?operator";
            }
            else if (result[0].role == "admin") {
                window.location.href = "../admin/admin.html";
            }
        }).catch((err) => {
            alert("Username or password are not valid!");
        });


    }
}



function sendLoginData(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/auth',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            crossDomain: true,
            success: function (result) {
                resolve(result);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(xhr.status);
                if (thrownError instanceof SyntaxError) {
                    resolve();
                }

                let err = (eval("(" + xhr.responseText + ")"));
                alert("Error code: " + err.code + ", message: " + err.message);

                reject();
            }
        });
    });
}

function RegistrationControl() {

    //in this function we are checking user info inputs!

    if (document.regForm.user.value == "" || document.regForm.email.value == "" ||
        document.regForm.pass.value == "" || document.regForm.rPass.value == "") {
        alert("One or more fields are not filled!");
        return;
    }
    if (document.regForm.user.value.length < 8) {
        alert("Username is not long enough!");
        return;
    }

    if (document.regForm.pass.value != document.regForm.rPass.value) {
        alert("Password and Repeat password fields do not match!");
        return;
    }



    if (/^\w+$/.test(document.regForm.user.value) == false) {
        alert("Special characters not allowed in username section!");
        return;
    }

    if (/^\w+$/.test(document.regForm.pass.value) == false || document.regForm.pass.value.length < 8) {
        alert("Password is not entered in correct way!");
        return;
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.regForm.email.value) == false) {
        alert("E-mail not vaid!");
        return;
    }

    sendRegistrationRequest()

}


function sendRegistrationRequest() {
    //ERROR: return status = 0!!! need help


    let obj = {
        username: document.regForm.user.value,
        email: document.regForm.email.value,
        password: document.regForm.pass.value
    };

    sendRegData(obj).then(() => {
        alert("Welcome to the Eco Patrol");
        //$("#tosModal").modal();Ovo jede govna
        window.location.href = "../main_page/main_page.html?user=" + document.regForm.user.value;

    }).catch((err) => {
        alert("Registration Failed,try again with different username!");
    })


}

//moved to endpoints.js but dont know hot to link 2 js files togeder
function sendRegData(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/register',//auth
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            crossDomain: true,
            success: function () {
                alert("Welcome to the Eco Patrol!");
                resolve();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError instanceof SyntaxError) {
                    resolve();
                }

                let err = (eval("(" + xhr.responseText + ")"));
                alert("Error code: " + err.code + ", message: " + err.message);
                reject();
            }
        });
    });
}