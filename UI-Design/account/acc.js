giwindow.onload = function () {

    var dataRequest=new XMLHttpRequest();
    
    dataRequest.open("GET","http://localhost:3000/reports/statistics");
    var burn=0;
    var over=0;
    var wild=0;


    dataRequest.onload=function(){

        var data=JSON.parse(dataRequest.responseText);
        console.log(data);


        
        if(data.length>=1){
            burn=data[0].count;
        }
        if(data.length>=2){
            over=data[1].count;
        }
        if(data.length>=3){
            wild=data[2].count;
        }


        

        var chart = new CanvasJS.Chart("chartContainer", {
        title:{
        text: "Your Patrols"              
        },
      data: [              
            {

        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        dataPoints: [
            { label: "WILD DUMP",  y: burn  },
            { label: "BURNING CONTAINER", y: over },
            { label: "OVERFLOWING CONTAINER", y: wild  },
            
            ]
            }
        ]
});
chart.render();


    }

   dataRequest.send();
    var username=window.location.search.substring(1).split("&")[0].split("=")[1];
    loadData(username);



}

function loadData(username){


var userRequest=new XMLHttpRequest();
    
    userRequest.open("GET","http://localhost:3000/users/account/"+username);



    userRequest.onload=function(){

        var data=JSON.parse(userRequest.responseText);

    

        $("#nameHead").html(data[0].username);
        $("#email").html("E-mail :"+" "+data[0].email);
        $("#points").html("Points :"+" "+data[0].points);
    }

    userRequest.onerror=function(){
        console.log("Greska kod dohvatanja podataka!");
    }

    userRequest.send();
}


function modal_open(){

    $("#modal").modal("toggle");
}

function delete_me(){

    var username=window.location.search.substring(1).split("&")[0].split("=")[1];
    var input=($("#input_pass").val());

    if(input==""){
        alert("Invalid password!");
    }

    var user_obj={
        "username":username,
        "password":input
    }
   
    console.log(user_obj);

    $.ajax({
        type:"POST",
        url:"http://localhost:3000/auth",
        data:JSON.stringify(user_obj),
        dataType:'json',
        contentType: 'application/json',
        crossDomain:true,
        success:function(){
            delete_him(user_obj);
        },
        error:function(xhr, ajaxOptions, thrownError){
            console.log(thrownError);
            alert("Password did not match!");
        }
        
    })
    
}

function delete_him(obj){

    $.ajax({
        url:"http://localhost:3000/deleteUser/"+obj.username,
        type:"DELETE",
        success: function(result) {
            alert("Profile is successfuly deleted!");
            window.location.href="http://127.0.0.1:5500/main_page/main_page.html#";  
        },
        error:function (){
            console.log("Error");
        }   
    })
}


function open_edit(){

    $("#Info").modal("toggle");

}


function editUserName(){

    if($("#uname").val().length<8){
        alert("New username is not valid!");
        return;
    }
    console.log(1);
    if($("#uname").val()==""){
        alert("New username is not valid!");
        return;
    }
    console.log(2);
    var string=($("#uname").val());
    if(/^\w+$/.test(string)==false){
        alert("New username is not valid!");
        return;
    }




    var username=window.location.search.substring(1).split("&")[0].split("=")[1];
    var pasword=($("#epass").val());


    var user_obj= {
        "username":username,
        "password":pasword
    }

    $.ajax({
        type:"POST",
        url:"http://localhost:3000/auth",
        data:JSON.stringify(user_obj),
        dataType:'json',
        contentType: 'application/json',
        crossDomain:true,
        success:function(){
            edit_him($("#uname").val());
        },
        error:function(xhr, ajaxOptions, thrownError){
            console.log(thrownError);
            alert("Password did not match!");
        }
        
    })


}

function edit_him(new_name){

    var new_user =  {        
        "username":new_name,
    }

    var username=window.location.search.substring(1).split("&")[0].split("=")[1];

    $.ajax({
        type:"PUT",
        url:"http://localhost:3000/users/"+username,
        data:JSON.stringify(new_user),
        dataType:'json',
        contentType: 'application/json',
        crossDomain:true,
        success:function(){
           alert("Your name is successfuly changed!")
        },
        error:function(xhr, ajaxOptions, thrownError){
            console.log(thrownError);
           console.log("Nema errora");
        }
        
    })




}