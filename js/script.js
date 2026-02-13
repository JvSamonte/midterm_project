document.addEventListener("DOMContentLoaded", () => {
    const weatherContainer = document.getElementById("weather-content");
    if (weatherContainer) {
        const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=51.1784&longitude=-115.5708&current_weather=true";

        function getWeatherDescription(code) {
            if (code === 0) return "Clear Sky";
            if ([1, 2, 3].includes(code)) return "Cloudy";
            if ([61, 63, 65].includes(code)) return "Rain";
            if ([71, 73, 75].includes(code)) return "Snow";
            return "Variable Conditions";
        }

        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                const temp = data.current_weather.temperature;
                const code = data.current_weather.weathercode;
                weatherContainer.innerHTML = `
                    <p style="font-size: 2rem; margin: 10px 0;">${temp}°C</p>
                    <p>${getWeatherDescription(code)}</p>
                `;
            })
            .catch(error => {
                weatherContainer.innerHTML = "<p>Weather unavailable.</p>";
            });
    }

    const bookingForm = document.getElementById("bookingForm");
    
    if (bookingForm) {
        const routeSelect = document.getElementById("destination");
        const travelersInput = document.getElementById("travelers");
        const studentCheck = document.getElementById("student");
        const totalDisplay = document.getElementById("totalDisplay");
        const successMsg = document.getElementById("successMessage");
        const resetBtn = document.getElementById("resetBtn");

        function calculateTotal() {
            let price = parseFloat(routeSelect.value);
            let count = parseInt(travelersInput.value) || 0;
            let subtotal = price * count;

            if (count >= 5) subtotal *= 0.90; [cite_start]
            if (studentCheck.checked) subtotal *= 0.85; [cite_start]

            let total = subtotal * 1.05; [cite_start]
            totalDisplay.textContent = `Estimated Total: $${total.toFixed(2)}`;
        }

        [cite_start]
        routeSelect.addEventListener("change", calculateTotal);
        travelersInput.addEventListener("input", calculateTotal);
        studentCheck.addEventListener("change", calculateTotal);

        bookingForm.addEventListener("submit", (e) => {
            [cite_start]e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const travelers = travelersInput.value;
            const dest = routeSelect.options[routeSelect.selectedIndex].text;

            bookingForm.style.display = "none";
            successMsg.classList.remove("hidden");
            successMsg.innerHTML = `<h3>Success!</h3><p>Thank you ${name}! Your booking for ${travelers} people to ${dest} has been received. Confirmation sent to ${email}.</p>`; [cite_start]
        });

        resetBtn.addEventListener("click", () => {
            totalDisplay.textContent = "Estimated Total: $0.00";
            successMsg.classList.add("hidden");
            bookingForm.style.display = "block";
        });
    }

    [cite_start]
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            [cite_start]e.preventDefault();
            
            const nameInput = document.getElementById("c-name");
            const emailInput = document.getElementById("c-email");
            const phoneInput = document.getElementById("c-phone");
            
            const errName = document.getElementById("error-name");
            const errEmail = document.getElementById("error-email");
            const errPhone = document.getElementById("error-phone");

            let isValid = true;

            [nameInput, emailInput, phoneInput].forEach(input => input.classList.remove("error-border"));
            [errName, errEmail, errPhone].forEach(span => span.classList.remove("show-error"));

            [cite_start]
            if (nameInput.value.trim() === "") {
                nameInput.classList.add("error-border");
                errName.classList.add("show-error");
                isValid = false;
            }

            [cite_start]
            if (!nameInput.value.includes("@") && !nameInput.value.includes(".")) {
                 if (emailInput.value.indexOf("@") === -1 || emailInput.value.indexOf(".") === -1) {
                    emailInput.classList.add("error-border");
                    errEmail.classList.add("show-error");
                    isValid = false;
                 }
            }

            [cite_start]
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phoneInput.value.replace(/\D/g,''))) { 
                if (!phoneRegex.test(phoneInput.value)) {
                    phoneInput.classList.add("error-border");
                    errPhone.classList.add("show-error");
                    isValid = false;
                }
            }

            [cite_start]
            if (isValid) {
                const name = nameInput.value;
                contactForm.style.display = "none";
                const successBox = document.getElementById("contactSuccess");
                successBox.classList.remove("hidden");
                successBox.textContent = `Thanks ${name}, we will contact you soon!`;
            }
        });
    }
});
