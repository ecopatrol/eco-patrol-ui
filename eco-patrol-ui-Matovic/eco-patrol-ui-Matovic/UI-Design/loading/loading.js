function init(){
    let parameters = location.search.substring(1);
    let tmp = parameters.split("="),
        fun = unescape(tmp[0]),
        val = unescape(tmp[1]);

    console.log(fun);
    console.log(val);
    
    if (val == "singIn" || val == "singUp"){ //recived parameter
        setTimeout(function(){ 
            window.location.href="../main_page/main_page.html?fun=user" //link with arg here
        },5000);
    }else if (val == "singOut"){ //recived parameter
        setTimeout(function(){ 
            window.location.href="../main_page/main_page.html?fun=guest" //link with arg here
        },5000);
    } 
}