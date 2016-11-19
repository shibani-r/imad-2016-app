
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




function loadLoginForm () {
    var loginHtml = `<h3>LOGIN HERE!</h3>
                                <label><b>Username</b></label>
                                <input type="text" placeholder="Enter Username" id="username" required>
            
                                <label><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" id="password" required>
                    
                                <button type="submit" id="login_btn" value="Login">Login</button>
                            <h3>SIGN-UP HERE!</h3>
                                <label><b>Username</b></label>
                                <input type="text" placeholder="Enter Username" id="usernameR" required>
                           
                                <label><b>Password</b></label>
                                <input type="password" placeholder="Enter Password" id="passwordR" required>
                    
                                <button type="submit" id="register_btn" value="Register">Sign Up</button>
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Success!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var usernameR = document.getElementById('usernameR').value;
        var passwordR = document.getElementById('passwordR').value;
        console.log(usernameR);
        console.log(passwordR);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: usernameR, password: passwordR}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();
