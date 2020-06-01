
function OrderItem(awardName){

    let user = localStorage.getItem("user").substr(1).split("=");

    let obj = {};

    (new Promise((resolve, reject) => {
        $.ajax({
            url: "localhost:3000/users/mladen/a1",//'http://localhost:3000/users/' + user[1] + "/" + "a1",//awardName,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(obj),
            crossDomain: true,
            success: function () {
                resolve();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("xhr.status = " + xhr.status);
                reject();
            }
        });
    })).then(() => {
        alert("Your award will be delivered to you");
    }).catch((error) => {
        alert('neuspesno'); 
        console.log(error);
    });


}