var button = document.getElementById("counter");
button.onclick = function(){
    var request = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
    // process the server response
    if(request.readystate === XMLHttpRequest.DONE){
        if(request.status === 200){
        var counter = request.responseText;
        var span = document.getElementById("count");
    span.innerHTML = counter.toString();
    }
    }
};
    request.open("GET","https://http://shibani-r.imad.hasura-app.io/counter",true);
    request.send(null);
}