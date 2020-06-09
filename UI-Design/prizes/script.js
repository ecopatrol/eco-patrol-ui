
function OrderItem(awardName) {

    let user = localStorage.getItem("user").substr(1).split("=")[1];
    let tmp = awardName.split(" ");
    let name = "";
    for (let i = 0; i < tmp.length; i++) {
        name += tmp[i];
    }

    let obj = {};

    (new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost:3000/users/' + user + "/" + name,
            type: 'POST',
            crossDomain: true,
            success: function () {
                alert("Your award will be delivered to you");
                resolve();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                let err = eval("(" + xhr.responseText + ")");
                //console.log(xhr);
                //console.log(xhr.statusCode);

                switch (err.code) {
                    case 412:
                        alert("You don't have enough points for this award");
                        break;
                    default:
                        alert("Error code: " + err.code + ", message: " + err.message);
                        break;
                }
                reject();
            }
        });
    })).then(() => {
       
    }).catch((error) => {
        //alert('neuspesno');
        console.log(error);
    });


}


function home(){
    var username=localStorage.getItem("user").substr(1).split("=")[1];
    window.location.href="../main_page/main_page.html?user="+username;
}