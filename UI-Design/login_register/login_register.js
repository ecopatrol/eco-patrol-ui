function login(){
    if (document.loginForm.username.value == "" || document.loginForm.password.value == ""){
        alert("Username or password not filled!");
        return;
    }

    //waiting for backend to suport for login




    //if user exists and password is corect, open user main_page
    window.location.href = "../main_page/main_page.html?user";
}


function registration(){
    if (document.regForm.user.value == "" || document.regForm.email.value == "" ||
    document.regForm.pass.value == "" || document.regForm.rPass.value == ""){
        alert("One or more fields are not filled!");
        return;
    }

    if (document.regForm.pass.value != document.regForm.rPass.value){
        alert("Passpord and Repeat password fields do not match!");
        return;
    }
    
    //ERROR: return status = 0!!! need help
    let obj = {
        username: document.regForm.user.value,
        email: document.regForm.email.value,
        password: document.regForm.pass.value
    };
    //obj = JSON.stringify(obj);
    console.log(obj);
    sendRegData(obj).then(() => {
        alert('uspesno');
    }).catch((error) => {alert('neuspesno');console.log(error);})
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
        sucess: function () {
            resolve();
            alert('uspesno')
        },
        error: function(xhr, ajaxOptions, thrownError) {
            //<ovde mozes da uzmes status requesta ako je neuspesan, da vidis zasto je neuspesan, to se nalazu u xhr.status>
            console.log("xhr.status = " + xhr.status);
            reject();
        }
        });
    });
}