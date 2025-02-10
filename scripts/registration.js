var userarray = JSON.parse(localStorage.getItem("userarray")) || [];
function register() {
    var namee = document.getElementById("name").value.trim();
    var emaill = document.getElementById("email").value.trim();
    var passwordd = document.getElementById("password").value;
    var passwordd2 = document.getElementById("password2").value;

    const checkNamePass = document.getElementById('check-name-pass')
    const dupEmail = document.getElementById('dupemail');
    const firstpasswar = document.getElementById('first-pass-war');
    const warningMessage = document.getElementById('passwordWarning');
    const emailWarning = document.getElementById('emailWarning');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('password2');
    const emailCheck = document.getElementById('email');
    // Retrieve user array from local storage or initialize an empty array
    var userarray = JSON.parse(localStorage.getItem("userarray")) || [];

    // Check if email already exists
    var checkEmailDuplicate = userarray.some(user => user.email === emaill);

     if (emaill === "" || passwordd === "" || passwordd2 === "") {
        emailCheck.classList.add('error-border');
        passwordInput.classList.add('error-border');
        confirmPasswordInput.classList.add('error-border');
        return;
     }
        else if (namee === passwordd) {
        checkNamePass.textContent = "Name and Password cannot be the same"
        passwordInput.classList.add('error-border');
        document.getElementById("name").style.borderColor = 'red';
        return;
    }
     else if (!emaill.includes("@")) {
        emailWarning.textContent = "Please enter a valid email!"
        emailCheck.classList.add('error-border');
        return;
    } else if (checkEmailDuplicate) {
        emailCheck.classList.add('error-border')
        dupEmail.textContent = "You have already registered with this email!"
        //alert("You have already registered with this email.");
        return;
    
    } else if (passwordd.length < 8) {
        firstpasswar.textContent = "Please enter a valid password!"
        passwordInput.classList.add('error-border');
        return;
    
    } else if (passwordd !== passwordd2) {
        warningMessage.textContent = "Passwords do not match!";
        passwordInput.classList.add('error-border');
        confirmPasswordInput.classList.add('error-border');
        return;
    }
     else {
        // Add new user to the array
        userarray.push({
            name: namee,
            email: emaill,
            password: passwordd
        });

        // Save updated user array to local storage
        localStorage.setItem("userarray", JSON.stringify(userarray));

        alert("Registration successful! Redirecting to login page...");

        // Redirect to login page
        window.location.href = "../index.html";
    }
}


// function login(){
//     var email_log=document.getElementById("email_login").value;
//     var password_log=document.getElementById("password_login").value;
//     var login_result=false
//     userarray.forEach((element) => {
        
//         if(email_log===element.email && password_log===element.password){
//              login_result=true;
            
//         }
       
//     });
    
            

//     if(login_result){
        
//         window.location.href = "index.html";
        
//     }else if(!login_result){
//         alert("try again")

//     }
//     var loadingElement = document.getElementById("ii");
//     if (loadingElement) {
//         loadingElement.style.display = 'none'; // Hide it if it exists
//     } else {
//         console.log('Element with id "ii" not found!');
//     }

// }

function login() {
    var email_log = document.getElementById("email_login").value.trim();
    var password_log = document.getElementById("password_login").value.trim();
    var login_result = false;
    var userName = "";

    const CheckEmail = document.getElementById('email-check')
    const CheckPassword = document.getElementById('password-check')
    // Retrieve user data from local storage
    var userarray = JSON.parse(localStorage.getItem("userarray")) || [];

    // Check if credentials match
    userarray.forEach((element) => {
        if (email_log === element.email && password_log === element.password) {
            login_result = true;
            userName = element.name;
        }
    });

    if (login_result) {
        // Store logged-in user's name in localStorage
        localStorage.setItem("loggedInUser", userName);
       
        alert("Login successful! Redirecting...");
        
        // Redirect to the homepage
        setTimeout(() => {
            window.location.href = "../index.html";
             
        }, 1000);
    } else {
        CheckEmail.textContent="Please check your Email or Password"
        document.getElementById("email_login").classList.add('error-border')
        document.getElementById("password_login").classList.add('error-border')
        //alert("Incorrect email or password. Try again.");
    }
   
}
var loggedInUser = localStorage.getItem("loggedInUser");
document.addEventListener("DOMContentLoaded", function() {
    
    var usernameDisplay = document.getElementById("usernameDisplay");
    var registerButton = document.getElementById("registerButton");
    var loginButton = document.getElementById("loginButton");
    

    if (loggedInUser) {
        // Show username and hide login/register buttons
       // document.getElementById("username_profile").innerHTML="dojjjjjc,u;"
        usernameDisplay.textContent = "Welcome, " + loggedInUser;
        usernameDisplay.style.display = "inline"; 
        if (registerButton) registerButton.style.display = "none";
        if (loginButton) loginButton.style.display = "none";
    }
});

function logout() {
        localStorage.removeItem("loggedInUser"); // Clear logged-in user
        location.reload(); // Refresh page to update UI
    }

    document.addEventListener("DOMContentLoaded", function() {
        var loggedInUser = localStorage.getItem("loggedInUser");
        var logoutButton = document.getElementById("logoutButton");

        if (loggedInUser && logoutButton) {
            logoutButton.style.display = "inline"; // Show Logout button
        }

    });
    
        document.getElementById("username_profile").textContent=loggedInUser
        function gotoprofile(){
            window.location.href = "profile.html";
        }