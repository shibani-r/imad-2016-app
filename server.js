var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles = {
 'article-one':{
    title:'Article one | shibani',
    heading:'Article one',
    date:'sep 5,2016',
    content: 
    `<p>
             this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p>
            <p> this is the content for my first article. this is the content for my first article. this is the content for my first article. this is the content for my first article.
            </p>`
    
},
 'article-two':{
    title:'Article two | shibani',
    heading:'Article two',
    date:'sep 10,2016',
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
    date:'sep 15,2016',
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
    <body class="article-body">
        <div class="container">
          
             <div>
              <a href="/">home</a>
             </div>
           <hr/>
             <h3 class="article-heading">
               ${heading}
             </h3>
             <hr/>
            <div class="article-date">${date}</div>
            <hr/>
           <div class="article-content">
        ${content}
        </div>
        <hr/>   <h2 class="list-heading">POST YOUR COMMENTS HERE!</h2>
                        <input type="text" id="comment" palceholder="comment"></input>
                        <input type="submit" value="add" id="add_btn"></input>
                        <ul id="commentlist" class="listing">
                        </ul>
   </div>
   </body>
</html>
`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter = 0;
app.get('/counter',function(req, res){
    counter = counter+1;
    res.send(counter.toString());
})
app.get('/ui/article.css',function(req,res){
     res.sendFile(path.join(__dirname,'ui','article.css'));
  });
var comments = [];
app.get('/add-comment', function(req,res){// /add-comment?comment=xxxx
    //get the comment from the request
    var comment = req.query.comment;
    
    comments.push(comment);
    //JSON: javascript object notation
    res.send(JSON.stringify(comments));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/article.js',function(req,res){
     res.sendFile(path.join(__dirname,'ui','article.js'));
  });



app.get('/:articleName', function (req, res){
    var articleName = req.params.articleName;
    var names = [];
app.get('/submit-name', function(req,res){// /submit-name?name=xxxx
    //get the name from the request
    var name = req.query.name;
    
    names.push(name);
    //JSON: javascript object notation
    res.send(JSON.stringify(names));
});
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
