var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user : 'shibani-r',
    database : 'shibani-r',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD,
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var image_url = data.image_url;
    var sub_heading = data.sub_heading;
    
    var htmlTemplate = `
    <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="stylesheet" href="/ui/style.css">
                <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
                <style>
                    body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif}
                    .w3-navbar,h1,button {font-family: "Montserrat", sans-serif}
                    .fa-comments-o {font-size:200px}
                    header {background: URL("${image_url}") no-repeat center center fixed; -webkit-background-size: cover;       
                                -moz-background-size: cover;      
                                -o-background-size: cover;       
                                background-size: cover; 
                                color:white;}
                     #quote_box {background: URL("http://www.intrawallpaper.com/static/images/Backgrounds-HD-3.jpg") no-repeat center center fixed;}            
                    }
                   
                </style>
            </head>
            <body>
                     
                <!--sliding navbar-->
                <div id="myNav" class="overlay">
                    <a href="javascript:void(0)" class="closebtn"  style="margin-top:20px;" onclick="closeNav()">&times;</a>
                    <div class="overlay-content">
                        <a href="/"><i class="fa fa-home w3-xxlarge"> </i> Home</a>
                        <a href="/articles/article-one">Article One</a>
                        <a href="/articles/article-two">Article Two</a>
                        <a href="/articles/article-three">Article Three</a>
                    </div>
                </div>
                    
                <!-- Navbar -->
                <div class="w3-top">
                    <ul class="w3-navbar w3-black w3-card-2 w3-left-align w3-large">
                        <li class="w3-hide-medium w3-hide-large w3-opennav w3-right">
                          <a class="w3-padding-large w3-hover-white w3-large w3-red" href="javascript:void(0);" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
                        </li>
                        <span onclick="openNav()"><li><a href="#" class="w3-padding-large w3-white"><i class="fa fa-bars"></i><strong>  goto</strong></a></li></span>
                        <li class="w3-hide-small"><a href="#article-content" class="w3-padding-large w3-hover-white">Content</a></li>
                        <li class="w3-hide-small"><a href="#comments-section" class="w3-padding-large w3-hover-white">Comments</a></li>
                    </ul>
    
                    <!-- Navbar on small screens -->
                    <div id="navDemo" class="w3-hide w3-hide-large w3-hide-medium">
                        <ul class="w3-navbar w3-left-align w3-large w3-black">
                            <li><a class="w3-padding-large" href="#article-content">Content</a></li>
                            <li><a class="w3-padding-large" href="#comments-section">Comments</a></li>
                        </ul>
                    </div>
                </div>
    
                <!-- Header -->
                <header class="w3-container w3-center w3-padding-128">
                  <h1 class="w3-margin w3-jumbo">${heading}</h1>
                  <p class="w3-xlarge"><i class="fa fa-clock-o"> </i> ${date.toDateString()}</p>
                </header>
    
                <!-- First Grid -->
                <div class="w3-row-padding w3-padding-64 w3-container" id="article-content">
                    <div class="w3-content">
                        <div class="w3-twothird">
                            <h1>${sub_heading}</h1>
                            <h5 class="w3-padding-32 w3-justify">${content}</h5>
                
                            <p class="w3-text-grey w3-justify">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                
                        <div class="w3-third w3-center">
                            <!--right side if needed-->
                        </div>
                        
                    </div>
                </div>
                
                <!-- Second Grid -->
                <div class="w3-row-padding w3-black w3-padding-64 w3-container" id="comments-section">
                    <div class="w3-content">
                
                        <div class="w3-twothird">
                            <h1>Comments</h1>
                            <h5 class="w3-padding-32"><i class="fa fa-pencil"></i> post your comments here</h5>
                
                            <p class="w3-text-black">
                                <h4>Comments</h4>
              <div id="comment_form">
              </div>
              <div id="comments">
                <center>Loading comments...</center>
              </div>
                            </p>
                        </div>
                        
                         <div class="w3-third w3-center">
                            <i class="fa fa-comments-o w3-padding-64 w3-text-orange "></i>
                        </div>
                        
                    </div>
                </div>
                
                <!--Quote of the day-->
                <div  id="quote_box" class="w3-container w3-center w3-padding-64">
                    <h1 class="w3-margin w3-xlarge">Quote of the day: live life</h1>
                </div>
                
                <!-- Footer -->
                <footer class="w3-container w3-padding-64 w3-center w3-light-grey w3-xlarge">
                        <p class="w3-medium w3-text-orange w3-xxxlarge">
                            <a href="#" title="To Top"><i class="fa fa-angle-double-up"></i></a>
                        </p>
                        <a href="https://www.facebook.com/login/" class="w3-hover-text-indigo w3-opacity"><i class="fa fa-facebook-official"></i></a>
                        <a href="https://www.pinterest.com/" class="w3-hover-text-red w3-opacity"><i class="fa fa-pinterest-p"></i></a>
                        <a href="https://twitter.com/" class="w3-hover-text-light-blue w3-opacity"><i class="fa fa-twitter"></i></a>
                        <a href="https://www.flickr.com/" class="w3-hover-text-grey w3-opacity"><i class="fa fa-flickr"></i></a>
                        <a href="https://www.linkedin.com/uas/login" class="w3-hover-text-indigo w3-opacity"><i class="fa fa-linkedin"></i></a>
                </footer>
    
                <script>
                    // Used to toggle the menu on small screens when clicking on the menu button
                    
                    function myFunction() {
                        var x = document.getElementById("navDemo");
                        if (x.className.indexOf("w3-show") == -1) {
                            x.className += " w3-show";
                        }   else {
                                x.className = x.className.replace(" w3-show", "");
                            }
                    }
                </script>
                
                <script>
                    function openNav() {
                        document.getElementById("myNav").style.height = "100%";
                    }
                    
                    function closeNav() {
                        document.getElementById("myNav").style.height = "0%";
                    }
                </script>
    <script type="text/javascript" src="/ui/article.js"></script>
              
    
            </body>
        </html>
    
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input, salt) {
    // How do we create a hash?
    
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function (req, res) {
    // username, password
    // {"username": "shibani", "password": "password"}
    // JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        }   else {
                res.send('User successfully created: ' + username);
            }
    });
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username = $1',[username], function (err, result) {
                  
        if(err) {
            res.status(500).send(err.toString());
        }   else {
           
                if (result.rows.length === 0) {
                    res.status(403).send('username/password is invalid');
                }   else {
                        // Match the password
                        var dbString = result.rows[0].password;
                        var salt = dbString.split('$')[2];
                        var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
                        if (hashedPassword === dbString) {
                            
                            // Set the session
                            req.session.auth = {userId: result.rows[0].id};
                            // set cookie with a session id
                            // internally, on the server side, it maps the session id to an object
                            // { auth: {userId }}
                            
                            res.send('Credentials correct!');
                            
                    
                        }   else {
                                res.status(403).send('username/password is invalid');
                            }
                
                    }
            }
    });
});

app.get('/check-login', function (req, res) {
    if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "user" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           }    else {
                    res.send(result.rows[0].username);    
                }
       });
   }    else {
            res.status(400).send('You are not logged in');
        }
});

app.get('/logout', function (req, res) {
    delete req.session.auth;
    res.send('logged out');
});

var pool = new Pool(config);


var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter+1;
    res.send(counter.toString());
});

app.get('/get-comments/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});


app.get('/articles/:articleName', function (req, res) {
    // articleName == article-one
    // articles[articleName] == {} content object for article-one
    
    // SELECT * FROM article WHERE title = '/'; DELETE WHERE a = /'asdf'
    pool.query('SELECT * FROM article WHERE title = $1', [req.params.articleName], function (err, result) {
        if(err) {
            res.status(500).send(err.toString());
        }   else {
                if(result.rows.length === 0) {
                    res.status(404).send('Article not found');
                }   else {
                        var articleData = result.rows[0];
                        res.send(createTemplate(articleData));
                    }
            }
    });
});

app.get('/ui/:filename', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.filename));
});




var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
