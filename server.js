var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user : 'shibani-r',
    database : 'shibani-r',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD,
};
var app = express();
app.use(morgan('combined'));

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
   
    var htmlTemplate = `<html>
                            <head>
                            
                                <title>
                                    ${title}
                                </title>
                                <link href="/ui/style.css" rel="stylesheet" />
                                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
                                <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                            </head>
                            
                            <body id="article-body">
                                
                                <!-- Navbar -->
        <div class="w3-top">
            <ul class="w3-navbar w3-black w3-card-2 w3-left-align">
                <li class="w3-hide-medium w3-hide-large w3-opennav w3-right">
                <li class="w3-hide-small"><a href="#about" class="w3-padding-large">ABOUT</a></li>
                <li class="w3-hide-small"><a href="#contents" class="w3-padding-large">CONTENTS</a></li>
                <li class="w3-hide-small"><a href="#contact" class=" w3-padding-large">CONTACT</a></li>
            </ul>
        </div>
        
        
                                <div id="mySidenav" class="sidenav">
                                  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                                  <a href="/"><i class="fa fa-home w3-jumbo"> </i> Home</a>
                                  <a href="/articles/article-one">Article One</a>
                                  <a href="/articles/article-two">Article Two</a>
                                  <a href="/articles/article-three">Article Three</a>
                                </div>
                        
                                <div id="main">
                                    <span style="font-size:30px;cursor:pointer" onclick="openNav()"><i class="fa fa-bars w3-small"></i> goto</span>
                                    <hr/>
                                        <h1 class="article-heading">
                                        ${heading}
                                        </h1>
                                    <br/>
                                        <div class="article-date">
                                        <i class="fa fa-clock-o"> </i>
                                        <strong>
                                        ${date.toDateString()}
                                        </strong>
                                        </div>
                                    <br/>
                                        <div class="article-content">
                                         ${content}
                                        </div>
                                    <br/>
                                    <br/>
                                        <h2><i class="fa fa-comments-o"></i> post your comments here</h2>
                                            <form><input type="text" id="comment" palceholder="comment"></input></form>
                                            <input type="submit" value="post" id="add_btn"></input>
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
                                        for(var i=0; i< comments.length; i++){
                                            clist += '<p>' + 'comment ' + i + ' : ' + '"' + comments[i] + '"' + '</p>';
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
                        </html>`;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test',function(err,result){
        if(err) {
            res.status(500).send(err.toString());
        }
        else    {
            res.send(JSON.stringify(result.rows));
        }
    });
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


app.get('/articles/:articleName', function (req, res){
    //articleName == article-one
    //articles[articleName] == {} content object for article-one
    
    //SELECT * FROM article WHERE title = '/'; DELETE WHERE a = /'asdf'
    pool.query('SELECT * FROM article WHERE title = $1', [req.params.articleName], function(err,result){
        if(err) {
            res.status(500).send(err.toString());
        }
        else    {
            if(result.rows.length === 0)    {
                res.status(404).send('Article not found');
            }
            else    {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
            }
        }
    });
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
