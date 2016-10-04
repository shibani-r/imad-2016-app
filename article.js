var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

//submit comment

var add = document.getElementById('add_btn');
add.onclick = function () {
    //make a request to the server and send the comment
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
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

    request.open('GET','http://shibani-r.imad.hasura-app.io/article-one/add-comment?comment=' + comment, true);
    request.send(null);

};



