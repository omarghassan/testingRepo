function logout() {
    // Clear all data stored in localStorage
    localStorage.clear();
    
    window.location.href = "/index.html";
}