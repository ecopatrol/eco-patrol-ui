
function OrderItem(awardName) {

    let user = localStorage.getItem("user").substr(1).split("=")[1];

    //let obj = {};

    (new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/users/' + user + "/" + awardName,
            type: 'POST',
            //dataType: 'json',
            //contentType: 'application/json',
            //data: JSON.stringify(obj),
            crossDomain: true,
            success: function () {
                resolve();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                let err = (eval("(" + xhr.responseText + ")"));
                console.log(xhr.status);
                alert("Error code: " + err.code + ", message: " + err.message);
                reject();
            }
        });
    })).then(() => {
        alert("Your award will be delivered to you");
    }).catch((error) => {
        //alert('neuspesno');
        console.log(error);
    });


}