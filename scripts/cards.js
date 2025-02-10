fetch('cars.json')
    .then(response => response.json())
    .then(data => {
        const carcont = document.getElementById('carcont');
        let html = ''; 

        data.cars.forEach(car => {  
            html += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                   <div id="carousel-${car.id}" class="carousel carousel-dark slide">
                      <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carousel-${car.id}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carousel-${car.id}" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carousel-${car.id}" data-bs-slide-to="2" aria-label="Slide 3"></button>
                      </div>
                      <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="10000">
                          <img src="${car.image}" class="d-block w-100" alt="${car.model}">
                        </div>
                        <div class="carousel-item" data-bs-interval="2000">
                          <img src="${car.image2}" class="d-block w-100" alt="${car.model}">
                        </div>
                        <div class="carousel-item">
                          <img src="${car.image3}" class="d-block w-100" alt="${car.model}">
                        </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${car.id}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carousel-${car.id}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${car.make} ${car.model}</h5>
                        <p class="card-text">
                            Year: ${car.year}<br>
                            Seats: ${car.People}<br>
                            Price: $${car.price}/day<br>
                            Fuel: ${car.fuel_type}
                        </p>
                        <label for="startDate-${car.id}">Start Date:</label>
                        <input type="date" id="startDate-${car.id}" class="form-control mb-2">
                        <label for="endDate-${car.id}">End Date:</label>
                        <input type="date" id="endDate-${car.id}" class="form-control mb-2">
                        <a id="rentCar" class="btn" onclick="rentCar(${car.id})">Rent Now</a>
                    </div>
                </div>
            </div>
            `;
        });

        carcont.innerHTML = html;
    })
    .catch(error => console.error('Error:', error));
