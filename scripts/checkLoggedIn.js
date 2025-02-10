function checkLoginStatus() {
    const loggedInUserName = localStorage.getItem('loggedInUserName');
    
    if (loggedInUserName) {
        // User is logged in

        // Create profile button
        const profileBtn = document.createElement('a');
        profileBtn.id = 'profileBtn';
        profileBtn.className = 'btn ms-3';
        profileBtn.innerHTML = `<i class="ri-user-line" style="color:white"></i> ${loggedInUserName}`;
        profileBtn.href = '../pages/profile.html';

        // Create a new logout button
        const logoutBtn = document.createElement('a');
        logoutBtn.id = 'logoutBtn';
        logoutBtn.className = 'btn ms-3';
        logoutBtn.textContent = 'Logout';
        logoutBtn.href = '#';
        logoutBtn.onclick = function() {
            logout();
            // return false;
        };
        
        // Get the buttons elements
        const signUpBtn = document.getElementById('signUpBtn');
        const loginBtn = document.getElementById('loginBtn');

        // Replace the login button with the logout button
        signUpBtn.parentNode.replaceChild(profileBtn, signUpBtn);
        loginBtn.parentNode.replaceChild(logoutBtn, loginBtn);
    } 
    // else {
    //     // User is not logged in
    //     const userStatusElement = document.getElementById('userStatus');
    //     if (userStatusElement) {
    //         userStatusElement.textContent = 'Please log in to continue.';
    //     }
    // }
}

document.addEventListener('DOMContentLoaded', checkLoginStatus);