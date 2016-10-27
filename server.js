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
                                
                            </head>
                            
                            <body id="article-body">
                                
                                <div id="mySidenav" class="sidenav">
                                  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                                  <a href="/"><i class="fa fa-home w3-jumbo"> </i> Home</a>
                                  <a href="/articles/article-one">Article One</a>
                                  <a href="/articles/article-two">Article Two</a>
                                  <a href="/articles/article-three">Article Three</a>
                                </div>
                        
                                <div id="main">
                                    
                                    <span style="font-size:30px;cursor:pointer" onclick="openNav()"><i class="fa fa-bars w3-small"> </i> goto</span>
                                   <hr/>
                                        <h1 class="article-heading">
                                        ${heading}
                                        </h1>
                                     <br/>
                                        <div class="article-date">
                                        ${date.toDateString()}
                                        </div>
                                    <br/>
                                        <div class="article-content">
                                         ${content}
                                        </div>
                                    <br/>
                                    <br/>
                                        <h2><i class="fa fa-pencil"> </i>  post your comments here</h2>
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
                                
                                <script type="text/javascript" src="/ui/main.js">
                                    
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
