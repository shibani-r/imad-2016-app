
// counter code

var button = document.getElementById('counter');

button.onclick = function () {
    
    // create a request object
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    request.onreadystatechange = function() {
        
        // process the server response
        if(request.readyState === XMLHttpRequest.DONE) {
            
            // take some action
            if(request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        // not done yet
    };

    // make the request
    request.open('GET','http://shibani-r.imad.hasura-app.io/counter', true);
    request.send(null);
};

// submit username/password to login 

var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    // make a request to the server and send the name
    
    // create a request object
    var request = new XMLHttpRequest();
    
    // capture the response and store it in a variable
    request.onreadystatechange = function() {
    
        // process the server response
        if(request.readyState === XMLHttpRequest.DONE) {
        
            // take some action
            if(request.status === 200) {
            
                // capture a list of names and render it as a list
                console.log("user loggedin");
                alert('logged in successfully');
            
            }   else if(request.status ===403) {
                    alert("username/password is incorrect");
                }   else if(request.status === 500) {
                        alert("something went wrong on the server");
        
                    }
        }
    // not done yet
    };

    // make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://shibani-r.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};
   
   
   