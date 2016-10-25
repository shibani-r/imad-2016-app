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
            </p>`
    
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
            </p>`
    
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
            </p>`
    
}
};
function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
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
                    <form><input type="text" id="comment" palceholder="comment"></input></form>
                    <input type="submit" value="add" id="add_btn"></input>
                    <div id="commentlist">
                    </div>
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
        clist += '<p>' + '"' + comments[j] + '"' + '</p>';
    }
    var div = document.getElementById('commentlist');
    div.innerHTML = clist;
    }
    }
    //not done yet
};

//make the request
var commentInput = document.getElementById('comment');
var comment = commentInput.value;
    request.open('GET','http://shibani-r.imad.hasura-app.io/add-comment?comment=' + comment, true);
    request.send(null);

};

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

var comments = [];
app.get('/add-comment', function(req,res){// /add-comment?comment=xxxx
    //get the comment from the request
    var comment = req.query.comment;
    
    comments.push(comment);
    //JSON: javascript object notation
    res.send(JSON.stringify(comments));
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
