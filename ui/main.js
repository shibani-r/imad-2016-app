 //submit comment

var add = document.getElementById('add_btn');
add.onclick = function () {
    //make a request to the server and send the comment
    
     //create a request object
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
    // process the server response
    if(request.readyState === XMLHttpRequest.DONE){
        //take some action
        if(request.status === 200){
         //capture a list of comments and render it as a list
    var comments = request.responseText;
    comments = JSON.parse(comments);
    var clist = '';
    for(var j=0; j< comments.length; j++){
        clist += '<li>' + comments[j] + '</li>';
    }
    var ul = document.getElementById('commentlist');
    ul.innerHTML = clist;
    }
    }
    //not done yet
};

//make the request
var commentInput = document.getElementById('comment');
var comment = commentInput.value;
    request.open('GET','https://shibani-r.imad.hasura-app.io/add-comment?comment=' + comment, true);
    request.send(null);

};

//counter code
var button = document.getElementById('counter');

button.onclick = function (){
    
    //create a request object
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
    // process the server response
    if(request.readyState === XMLHttpRequest.DONE){
        //take some action
        if(request.status === 200){
        var counter = request.responseText;
        var span = document.getElementById('count');
    span.innerHTML = counter.toString();
    }
    }
    //not done yet
};

//make the request
    request.open('GET','http://shibani-r.imad.hasura-app.io/counter', true);
    request.send(null);
};

//submit name

var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    //make a request to the server and send the name
    
     //create a request object
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
    // process the server response
    if(request.readyState === XMLHttpRequest.DONE){
        //take some action
        if(request.status === 200){
         //capture a list of names and render it as a list
    var names = request.responseText;
    names = JSON.parse(names);
    var list = '';
    for(var i=0; i< names.length; i++){
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
    }
    }
    //not done yet
};

//make the request
var nameInput = document.getElementById('name');
var name = nameInput.value;
    request.open('GET','http://shibani-r.imad.hasura-app.io/submit-name?name=' + name, true);
    request.send(null);
};
   
  

