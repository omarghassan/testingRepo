document.getElementById('subscriptionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const messageDiv = document.getElementById('message');

    // Validate email format
    if (!validateEmail(email)) {
        messageDiv.textContent = 'Please enter a valid email address.';
        messageDiv.style.color = 'red';
        return;
    }

    // Create subscription object
    const subscription = { email: email };

    // Send POST request to add the email to db.json
    fetch('http://localhost:3000/subscribtions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
    })
    .then(response => response.json())
    .then(data => {
        messageDiv.textContent = 'Subscription successful!';
        messageDiv.style.color = 'green';
        document.getElementById('subscriptionForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred. Please try again.';
        messageDiv.style.color = 'red';
    });
});

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}