
// ovo je primer jednog poziva GET endpointa
//nije ispravna u ovom trenutku
/*function fetchSomething() {
    return new Promise((resolve, reject) => {
        $.ajax({
        url: 'https://localhost:3000/<ovde ide tacan path>',
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        sucess: function () {
            resolve(data);
        },
        error: function(error) {
            reject(error);
        }
        });
    });
}*/

// ovo je primer jednog poziva POST endpointa
/*function persistSomething(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
        url: 'https://localhost:3000/<ovde ide tacan path>',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: data,
        crossDomain: true,
        sucess: function () {
            resolve();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            //<ovde mozes da uzmes status requesta ako je neuspesan, da vidis zasto je neuspesan, to se nalazu u xhr.status>
        }
        });
    });
}*/






function resolveXhrCode(xhr){

}