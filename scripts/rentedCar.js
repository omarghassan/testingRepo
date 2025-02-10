function rentCar(carId) {
    const userEmail = localStorage.getItem('loggedInUserEmail');
    const rentStartDate = document.getElementById(`startDate-${carId}`).value;
    const rentReturnDate = document.getElementById(`endDate-${carId}`).value;

    if (!rentStartDate || !rentReturnDate) {
        alert('Please select both start and end dates.');
        return;
    }

    const today = new Date().setHours(0, 0, 0, 0);  // Get today's date at midnight
    const startDate = new Date(rentStartDate).setHours(0, 0, 0, 0); // Get start date at midnight
    const endDate = new Date(rentReturnDate).setHours(0, 0, 0, 0);  // Get end date at midnight

    if (startDate < today) {
        alert('Start date cannot be in the past. Please select a valid start date.');
        return;
    }

    if (endDate < startDate) {
        alert('End date cannot be before start date.');
        return;
    }

    if (userEmail) {
        // Fetch car data to check availability
        fetch(`http://localhost:3000/cars/${carId}`)
            .then(response => response.json())
            .then(car => {
                if (!car.isAvailable) {
                    alert('This car is already rented by another user.');
                    return;
                }

                // Fetch user data from the JSON server
                fetch('http://localhost:3000/users')
                    .then(response => response.json())
                    .then(userArray => {
                        const user = userArray.find(user => user.email === userEmail);

                        if (user) {
                            // Update user data with rental details
                            user.rentedCars = user.rentedCars || [];
                            user.rentedCars.push({
                                carID: carId,
                                rentalDate: rentStartDate,
                                returnDate: rentReturnDate
                            });

                            // Update user data on the server
                            fetch(`http://localhost:3000/users/${user.id}`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(user)
                            })
                            .then(response => response.json())
                            .then(() => {
                                // Update car availability
                                car.isAvailable = false;

                                // Update car data on the server
                                fetch(`http://localhost:3000/cars/${car.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(car)
                                })
                                .then(response => response.json())
                                .then(() => {
                                    alert('Car rented successfully!');
                                })
                                .catch(error => console.error('Error updating car:', error));
                            })
                            .catch(error => console.error('Error updating user:', error));
                        } else {
                            console.error('User not found');
                        }
                    })
                    .catch(error => console.error('Error fetching users:', error));
            })
            .catch(error => console.error('Error fetching car:', error));
    } else {
        console.error('No user email found in localStorage');
    }
}