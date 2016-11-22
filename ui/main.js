
function loadLoginForm () {
    var loginHtml = `
        <div class="w3-panel w3-padding-large" style="display:block;background-color:#0f1c25;">
             <div class="w3-btn-group">
             
             <button class="w3-btn w3-teal w3-hover-blue-grey w3-wide w3-padding-xlarge w3-ripple" style="width:50%" onclick="document.getElementById('id01').style.display='block';document.getElementById('id02').style.display='none';">Login</button>

            <button class="w3-btn w3-teal w3-hover-blue-grey w3-wide w3-padding-xlarge w3-ripple" style="width:50%" onclick="document.getElementById('id02').style.display='block';document.getElementById('id01').style.display='none';">Sign Up</button>
            
            </div>
    
            <div id="id01" class="w3-panel w3-padding-large" style="display:block; background-color:rgba(19, 35, 47, 0.9);">
                <span onclick="this.parentElement.style.display='none'" class="w3-closebtn w3-text-teal">x</span>
                <h2 class="w3-text-white">Welcome Back!</h2>
                <br/>
                <form>
                    <label class="w3-text-grey w3-left" style="font-size: 22px;">Username</label>
                    <input type="text" placeholder="Enter Username" id="username" style="border:2px solid #a0b3b0;background-color:rgba(19, 35, 47, 0.9);color:white;" required>
                    <br/><br/>
                    <label class="w3-text-grey w3-left" style="font-size: 22px;">Password</label>
                    <input type="password" placeholder="Enter Password" id="password" style="border:2px solid #a0b3b0;background-color:rgba(19, 35, 47, 0.9);color:white;" required>
                    <br/><br/>              
                    <input class="w3-btn w3-teal w3-hover-blue-grey w3-wide w3-padding-xlarge w3-ripple" type="submit" id="login_btn" value="Login"/>
                </form>
                <br/><br/>
            </div>
        
            <div id="id02" class="w3-panel w3-padding-large" style="display:none; background-color:rgba(19, 35, 47, 0.9);">
                <span onclick="this.parentElement.style.display='none'" class="w3-closebtn w3-text-teal">x</span>
                <h2 class="w3-text-white">Sign Up for Free!</h2>
                <br/>
                <form>
                    <label class="w3-text-grey w3-left" style="font-size: 22px;">Set Username</label>
                    <input type="text" placeholder="Enter Username" id="usernameR" style="border:2px solid #a0b3b0;background-color:rgba(19, 35, 47, 0.9);color:white;" required>
                    <br/><br/>                                    
                    <label class="w3-text-grey w3-left" style="font-size: 22px;">Set Password</label>
                    <input type="password" placeholder="Enter Password" id="passwordR" style="border:2px solid #a0b3b0;background-color:rgba(19, 35, 47, 0.9);color:white;" required>
                    <br/><br/>                                
                    <input class="w3-btn w3-teal w3-hover-blue-grey w3-wide w3-padding-xlarge w3-ripple" type="submit" id="register_btn" value="Register"/>
                </form>
                <br/><br/>
            </div>
            
        </div>
                    
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
                  alert('You are successfully logged in!');
                  console.log('You are successfully logged in!');
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
                  alert('Invalid username or password!');
                  console.log('Invalid username or password!');
              } else if (request.status === 500) {
                  alert('Something went wrong on the server!');
                  console.log('Something went wrong on the server!');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server!');
                  console.log('Something went wrong on the server!');
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
        console.log('Logging in...');
        
    };
    
    // Submit username/password to signup
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        
            // Create a request object
            var request = new XMLHttpRequest();
    
            // Capture the response and store it in a variable
            request.onreadystatechange = function () {
            
                if (request.readyState === XMLHttpRequest.DONE) {
                    // Take some action
                    if (request.status === 200 && check()=== true) {
                        alert('User registered successfully');
                        console.log('User registered successfully');
                        register.value = 'Registered!';
                    } else {
                            alert('Could not register the user!');
                            console.log('Could not register the user!');
                            register.value = 'Register';
                        }
                }
            };
        
         
        
        
        // Make the request
        var usernameR = document.getElementById('usernameR').value;
        var passwordR = document.getElementById('passwordR').value;
        function check(usenameR,passwordR){
            if( usernameR === '' || passwordR === '')
        { alert('empty');
        return false;
        }}
        console.log(usernameR);
        console.log(passwordR);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({usernameR: usernameR, passwordR: passwordR}));  
        register.value = 'Registering...';
        console.log('Registering...');
        
    };
}


function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <div class="w3-panel w3-padding-large" style="display:block;background-color:#0f1c25;">
            <h3 class="w3-text-white"> Hi <i>${username}</i>!</h3>
            <a href="/logout"><button id="logout" class="w3-btn w3-teal w3-hover-blue-grey w3-wide w3-padding-xlarge w3-ripple"">LOGOUT</button></a>
        </div>
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
