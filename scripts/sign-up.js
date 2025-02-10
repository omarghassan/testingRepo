function register() {
    const fullName = document.getElementById("name").value.trim();
    const userEmail = document.getElementById("email").value.trim();
    const userPassword = document.getElementById("password").value;
    const passwordConfirmation = document.getElementById("passwordConfirmation").value;
    const nationalID = document.getElementById("nationalID").value.trim();
    const driverLicense = document.getElementById("driverLicense").value.trim();

    const checkNamePass = document.getElementById('check-name-pass');
    const duplicatedEmail = document.getElementById('duplicatedemail');
    const firstpasswar = document.getElementById('first-pass-war');
    const warningMessage = document.getElementById('passwordWarning');
    const emailWarning = document.getElementById('emailWarning');
    const nationalIDWarning = document.getElementById('nationalIDWarning');
    const driverLicenseWarning = document.getElementById('driverLicenseWarning');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('passwordConfirmation');
    const emailCheck = document.getElementById('email');
    const nationalIDInput = document.getElementById('nationalID');
    const driverLicenseInput = document.getElementById('driverLicense');
    
    // Validation Checks
    if (userEmail === "" || userPassword === "" || passwordConfirmation === "") {
        emailCheck.classList.add('error-border');
        passwordInput.classList.add('error-border');
        confirmPasswordInput.classList.add('error-border');
        return;
    } else if (fullName === userPassword) {
        checkNamePass.textContent = "Name and Password cannot be the same";
        passwordInput.classList.add('error-border');
        document.getElementById("name").style.borderColor = 'red';
        return;
    } else if (!userEmail.includes("@")) {
        emailWarning.textContent = "Please enter a valid email!";
        emailCheck.classList.add('error-border');
        return;
    } else if (userPassword.length < 8) {
        firstpasswar.textContent = "Please enter a valid password!";
        passwordInput.classList.add('error-border');
        return;
    } else if (userPassword !== passwordConfirmation) {
        warningMessage.textContent = "Passwords do not match!";
        passwordInput.classList.add('error-border');
        confirmPasswordInput.classList.add('error-border');
        return;
    } else if (!nationalID.match(/^\d{10}$/)) { // Adjust regex as needed
        nationalIDWarning.textContent = "Please enter a valid National ID!";
        nationalIDInput.classList.add('error-border');
        return;
    } else if (!driverLicense.match(/^\d{8}$/)) { // Adjust regex as needed
        driverLicenseWarning.textContent = "Please enter a valid Driver License!";
        driverLicenseInput.classList.add('error-border');
        return;
    } else {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(userarray => {
                // Check if email already exists
                var checkEmailDuplicate = userarray.some(user => user.email === userEmail);

                if (checkEmailDuplicate) {
                    emailCheck.classList.add('error-border');
                    duplicatedEmail.textContent = "You have already registered with this email!";
                    return;
                } else {
                    // Create new user object
                    const newUser = {
                        userName: fullName,
                        nationalID: nationalID,
                        driverLicense: driverLicense,
                        email: userEmail,
                        password: userPassword,
                        rentedCars: []
                    };

                    // Add new user to the server
                    fetch('http://localhost:3000/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    })
                    .then(response => response.json())
                    .then(data => {

                        // Save the user's email to localStorage
                        localStorage.setItem('loggedInUserEmail', userEmail);
                        localStorage.setItem('loggedInUserName', fullName);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                    window.location.href = "../index.html";
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}