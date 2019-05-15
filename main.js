//jsonstore.io. offers a secured and JSON based cloud DB for small projects
var endpoint = 
    "https://www.jsonstore.io/5c4fa587105bab0f5e6beb43c2e7849592cc3e48d2f39e6fd18f24ecb71daebd"

function geturl(){

    //1. store the value of the input box in the 'url' variable
    //2. check url protocols are OK

    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") ||
        url.startsWith("https://") || url.startsWith("ftp://");
    
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
    } else{
        return url;
    }

}

function getrandom(){

    var text="";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    
}

//alternative getrandom() function

// function getrandom(){   //initiate function and random_string variable
   
//     var random_string = Math.random().toString(32).substring(2,5) +
//         Math.random().toString(32).substring(2,5);

//         //Math is an in-built JavaScript object
//         //1. we randomize numbers via 'random' func from the 'Math' obj
//         //2. ensure we get a string rather than binary
//         //3. substring to splice the string
//         //4. return statement to get our 'random_string'

//     return random_string();
// }

function genhash(){

    //function to change the hash in the location bar
    
    if (window.location.hash == ""){
        window.location.hash = getrandom();
        }

}

function send_request(url) {

    this.url = url;

    //here we use the JQuery: send JSON request to the endpoint +"/"+ ...
            //our random string hash from the location bar
    // with Ajax web apps can send/retrieve data from a server without intefering ...
            //with the display of the existing page
    
    return $.ajax({
        'url': 'endpoint + "/" + window.location.hash.substr(1)',     
        // when we send GET request to url we get longurl as data
        'type': 'POST',
        'data': 'JSON.stringify(this.url)',
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
        })
}

function shorturl(){

    var longurl = geturl();

    //1. store the long url
    //2. add a random hash to the location bar so that we can use the url as the short url
    //3. call send_request fun (send a JSON request to jsonstore to store longurl with a link to shorturl)

    genhash();
    send_request(longurl);
    // implecopy(window.location.href);
    
}

var hashh = window.location.hash.substr(1)

if(window.location !=""){
        $.getJSON(endpoint + "/" + hashh, function(data){
            data = data["result"];

            if(data != null){
                window.location.href = data;
            }
        });
}
