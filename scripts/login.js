function login() {
    var email_check = document.getElementById("email_login").value.trim();
    var password_check = document.getElementById("password_login").value.trim();
    var login_result = false;
    var loggedInUserEmail = "";

    const CheckEmail = document.getElementById('email-check');
    // const CheckPassword = document.getElementById('password-check');

    // Fetch user data from JSON-Server
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(userarray => {
            // Check if credentials match
            userarray.forEach((element) => {
                if (email_check === element.email && password_check === element.password) {
                    login_result = true;
                    loggedInUserEmail = element.email;
                    loggedInUserName = element.userName;
                }
            });

            if (login_result) {
                // Store the logged-in user's email in localStorage
                localStorage.clear()
                localStorage.setItem('loggedInUserEmail', loggedInUserEmail);
                localStorage.setItem('loggedInUserName', loggedInUserName);
                window.location.href = "../index.html";
                
            } else {
                CheckEmail.textContent = "Please check your Email or Password";
                document.getElementById("email_login").classList.add('error-border');
                document.getElementById("password_login").classList.add('error-border');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}