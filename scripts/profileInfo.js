function getUserProfile() {
    // Get the stored email from localStorage
    const userEmail = localStorage.getItem('loggedInUserEmail');
    
    if (userEmail) {
        // Fetch user data from JSON-Server
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(userArray => {
                // Find the user with the matching email
                const user = userArray.find(user => user.email === userEmail);

                if (user) {
                    // Display user data on the profile page
                    document.getElementById('profileName').textContent = user.userName;
                    document.getElementById('profileEmail').textContent = user.email;
                    document.getElementById('profileNationalID').textContent = user.nationalID;
                    document.getElementById('profileDriverLicense').textContent = user.driverLicense;
                    
                    // Display rented car details
                    if (user.rentedCars && user.rentedCars.length > 0) {
                        const rentedCarsContainer = document.querySelector('#rentedCars tbody');
                        let html = '';

                        user.rentedCars.forEach(rentedCar => {
                            fetch(`http://localhost:3000/cars/${rentedCar.carID}`)
                                .then(response => response.json())
                                .then(car => {
                                    html += `
                                        <tr>
                                            <td>${car.make} ${car.model}</td>
                                            <td>${rentedCar.carID}</td>
                                            <td>${rentedCar.rentalDate}</td>
                                            <td>${rentedCar.returnDate}</td>
                                            <td><img src="${car.image}" alt="${car.model}" class="img-fluid rented-car-image"></td>
                                        </tr>
                                    `;

                                    rentedCarsContainer.innerHTML = html;
                                })
                                .catch(error => console.error('Error fetching car details:', error));
                        });
                    } else {
                        document.querySelector('#rentedCars tbody').innerHTML = '<tr><td colspan="5">No rented cars.</td></tr>';
                    }
                } else {
                    console.error('User not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.error('No user email found in localStorage');
    }
}

document.addEventListener('DOMContentLoaded', getUserProfile);