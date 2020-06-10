function getUsers(){
    
    var usersRequest=new XMLHttpRequest();

    usersRequest.open("GET","http://localhost:3000/users");
    
    usersRequest.onload=function(){

        var data=JSON.parse(usersRequest.responseText);
        
        for(i=1;i<data.length;i++){
            $("#table").append("<tr>"+"<td> &nbsp;"+i+"&nbsp;</td>"+"<td> &nbsp;"+data[i].username+" &nbsp;</td>"+"<td> &nbsp;"+data[i].email+"&nbsp; </td>"+"<td><button class='btn-danger' onclick='deleteMe(this)'>DELETE</button></td>"+"</td>"+"<td><button class='btn-primary' onclik='DummyFun(this)>EDIT USER</button></td>"+"<td><button class='btn-success' onclick='makeAsOperator(this)'>SET AS OPERATOR</button></td>"+"</tr>");
        }

        $("#table").css("font-size","25px");


    }

    usersRequest.onerror=function(){
        console.log("Error");
    }

    usersRequest.send();

  
}

function makeAsOperator(user){

    var username=user.parentNode.parentNode.children[1].innerHTML;
    username=username.substring(7,username.length-7);

    $.ajax({

        url:"http://localhost:3000/users/operator/"+username,
        type:'POST',
        success:function(result){
            alert("User is set as operator!");
        },
        error:function (params) {
            console.log("Error");
        }

    })

}

function deleteMe(user){

    var username=user.parentNode.parentNode.children[1].innerHTML;
    username=username.substring(7,username.length-7);
   
    $.ajax({
        url:"http://localhost:3000/deleteUser/"+username,
        type:"DELETE",
        success: function(result) {
            alert("User is deleted!");
            window.location.href="admin.html";
           
        },
        error:function (){
            console.log("Error");
        }   
    })

}


function DummyFun(user) {
    
}

function home(){
  
    window.location.href="../../main_page/main_page.html";
}