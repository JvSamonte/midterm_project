document.addEventListener("DOMContentLoaded", () => {

    const weatherContainer = document.getElementById("weather-content");
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
            const description = getWeatherDescription(code);

            weatherContainer.innerHTML = `
                <p style="font-size: 2rem; margin: 10px 0;">${temp}°C</p>
                <p>Condition: ${description}</p>
            `;
        })
        .catch(error => {
            weatherContainer.innerHTML = "<p>Weather data unavailable.</p>";
            console.error("Weather Fetch Error:", error);
        });

    const form = document.getElementById("bookingForm");
 
    if (form) {
        const routeSelect = document.getElementById("destination");
        const travelersInput = document.getElementById("travelers");
        const studentCheck = document.getElementById("student");
        const totalDisplay = document.getElementById("totalDisplay");
        const resetBtn = document.getElementById("resetBtn");
        const successMsg = document.getElementById("successMessage");

        function calculateTotal() {
            let pricePerPerson = parseFloat(routeSelect.value);
            let travelers = parseInt(travelersInput.value) || 0;
            
            let subtotal = pricePerPerson * travelers;

            if (travelers >= 5) {
                subtotal = subtotal - (subtotal * 0.10);
            }

            if (studentCheck.checked) {
                subtotal = subtotal - (subtotal * 0.15);
            }

            let total = subtotal * 1.05;

            totalDisplay.textContent = `Estimated Total: $${total.toFixed(2)}`;
        }

        routeSelect.addEventListener("change", calculateTotal);
        travelersInput.addEventListener("input", calculateTotal);
        studentCheck.addEventListener("change", calculateTotal);

        form.addEventListener("submit", (event) => {
            event.preventDefault(); 
          
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const travelers = travelersInput.value;
            const destinationText = routeSelect.options[routeSelect.selectedIndex].text; 

            form.style.display = "none";

            successMsg.classList.remove("hidden");
            successMsg.classList.add("success-box");
            successMsg.innerHTML = `
                <h3>Success!</h3>
                <p>Thank you <strong>${name}</strong>! Your booking for <strong>${travelers}</strong> people 
                for <strong>${destinationText}</strong> has been received.</p>
                <p>A confirmation email has been sent to ${email}.</p>
            `;
        });

        resetBtn.addEventListener("click", () => {
            totalDisplay.textContent = "Estimated Total: $0.00";
            successMsg.classList.add("hidden");
            form.style.display = "block";
        });
    }
});
