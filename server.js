var express = require('express');
var morgan = require('morgan');
var path = require('path');


var app = express();
app.use(morgan('combined'));
var articles = {
 'article-one':{
    title:'Article one | shibani',
    heading:'Article one',
    date:'Sep 5,2016',
    content: 
    `<p>
             this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p>
            <p> this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p>
            <p> this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p><p> this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p><p> this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p><p> this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p><p> this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p>
            <p> this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p>`,
    commentbox:
    `<form><input type="text" id="comment1" palceholder="comment1"></input></form>
                    <input type="submit" value="add1" id="add_btn1"></input>
                    <div id="commentlist1">
                    </div>`,
    script:
    `//submit comment

var add1 = document.getElementById('add_btn1');
add1.onclick = function () {
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
    var comments1 = request.responseText;
    comments1 = JSON.parse(comments1);
    var clist1 = '';
    for(var i=0; i< comments1.length; i++){
        clist1 += '<p>' + 'comment ' + i + ' : ' + '"' + comments1[i] + '"' + '</p>';
    }
    var div = document.getElementById('commentlist1');
    div.innerHTML = clist1;
    }
    }
    //not done yet
};

//make the request
var commentInput1 = document.getElementById('comment1');
var comment1 = commentInput1.value;
    request.open('GET','http://shibani-r.imad.hasura-app.io/add-comment1?comment=' + comment1, true);
    request.send(null);

};`

},
 'article-two':{
    title:'Article two | shibani',
    heading:'Article two',
    date:'Sep 10,2016',
    content: 
    `<p>
            
             this is the content for my second article. this is the content for my second article. this is the content for my second article. this is the content for my second article. this is the content for my second article. 
        
            </p>
            <p> 
            this is the content for my second article. this is the content for my second article. this is the content for my second article. this is the content for my second article. this is the content for my second article. this is the content for my second article. this is the content for my second article. this is the content for my second article. 
            </p>`,
    commentbox:
    `<form><input type="text" id="comment2" palceholder="comment2"></input></form>
                    <input type="submit" value="add2" id="add_btn2"></input>
                    <div id="commentlist2">
                    </div>`,
            script:
    `//submit comment

var add2 = document.getElementById('add_btn2');
add2.onclick = function () {
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
    var comments2 = request.responseText;
    comments2 = JSON.parse(comments2);
    var clist2 = '';
    for(var j=0; j< comments2.length; j++){
        clist2 += '<p>' + 'comment ' + j + ' : ' + '"' + comments2[j] + '"' + '</p>';
    }
    var div = document.getElementById('commentlist2');
    div.innerHTML = clist2;
    }
    }
    //not done yet
};

//make the request
var commentInput2 = document.getElementById('comment2');
var comment2 = commentInput2.value;
    request.open('GET','http://shibani-r.imad.hasura-app.io/add-comment2?comment=' + comment2, true);
    request.send(null);

};`

    
},
 'article-three':{
    title:'Article three | shibani',
    heading:'Article three',
    date:'Sep 15,2016',
    content: 
    `<p>
             this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.
            </p>
            <p> 
            this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.this is the content for my third article.
            </p>`,
            commentbox:
    `<form><input type="text" id="comment3" palceholder="comment3"></input></form>
                    <input type="submit" value="add3" id="add_btn3"></input>
                    <div id="commentlist3">
                    </div>`,
            script:
    `//submit comment

var add3 = document.getElementById('add_btn3');
add3.onclick = function () {
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
    var comments3 = request.responseText;
    comments3 = JSON.parse(comments3);
    var clist3 = '';
    for(var k=0; k< comments3.length; k++){
        clist3 += '<p>' + 'comment ' + k + ' : ' + '"' + comments3[k] + '"' + '</p>';
    }
    var div = document.getElementById('commentlist3');
    div.innerHTML = clist3;
    }
    }
    //not done yet
};

//make the request
var commentInput3 = document.getElementById('comment3');
var comment3 = commentInput3.value;
    request.open('GET','http://shibani-r.imad.hasura-app.io/add-comment3?comment=' + comment3, true);
    request.send(null);

};`

    
}
};
function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var script = data.script;
    var commentbox = data.commentbox;
var htmlTemplate=`
<html>
    <head>
        <title>
            ${title}
        </title>
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body id="article-body">
    <div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <a href="/">Home</a>
  <a href="/article-one">Article One</a>
  <a href="/article-two">Article Two</a>
  <a href="/article-three">Article Three</a>
</div>

    <div id="main">
            
            <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; goto</span>
           <hr/>
                <h1 class="article-heading">
                ${heading}
                </h1>
             <br/>
                <div class="article-date">${date}</div>
            <br/>
                <div class="article-content">
                 ${content}
                </div>
            <br/>
            <br/>
                <h2>post your comments here</h2>
                    ${commentbox}
    </div>
        <script>
            function openNav() {
             document.getElementById("mySidenav").style.width = "250px";
             document.getElementById("main").style.marginLeft = "250px";
            }

            function closeNav() {
             document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft= "0";
            }
        </script>
   <script>
    ${script}
    </script>
       </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/test-db',function(req,res){
    res.send('db connection');
});

var counter = 0;
app.get('/counter',function(req, res){
    counter = counter+1;
    res.send(counter.toString());
});

var comments1 = [];
app.get('/add-comment1', function(req,res){// /add-comment1?comment=xxxx
    //get the comment from the request
    var comment1 = req.query.comment1;
    
    comments1.push(comment1);
    //JSON: javascript object notation
    res.send(JSON.stringify(comments1));
});

var comments2 = [];
app.get('/add-comment2', function(req,res){// /add-comment2?comment=xxxx
    //get the comment from the request
    var comment2 = req.query.comment2;
    
    comments2.push(comment2);
    //JSON: javascript object notation
    res.send(JSON.stringify(comments2));
});

var comments3 = [];
app.get('/add-comment3', function(req,res){// /add-comment3?comment=xxxx
    //get the comment from the request
    var comment3 = req.query.comment3;
    
    comments3.push(comment3);
    //JSON: javascript object notation
    res.send(JSON.stringify(comments3));
});

var names = [];
app.get('/submit-name', function(req,res){// /submit-name?name=xxxx
    //get the name from the request
    var name = req.query.name;
    
    names.push(name);
    //JSON: javascript object notation
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res){
    var articleName = req.params.articleName;
    
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
