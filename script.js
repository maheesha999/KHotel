document.addEventListener("DOMContentLoaded", function () {
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const nightsDisplay = document.getElementById("nights");
    const guestInput = document.getElementById("guest-input");
    const guestDropdown = document.querySelector(".guest-dropdown");
    const roomsSelect = document.getElementById("rooms");
    const guestsSelect = document.querySelector(".guests");
    const bookNowBtn = document.querySelector(".book-now");

    // Calculate Nights
    function updateNights() {
        const checkinDate = new Date(checkinInput.value);
        const checkoutDate = new Date(checkoutInput.value);

        if (!isNaN(checkinDate) && !isNaN(checkoutDate) && checkoutDate > checkinDate) {
            const diffTime = checkoutDate - checkinDate;
            const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            nightsDisplay.textContent = `Nights: ${nights}`;
        } else {
            nightsDisplay.textContent = "Nights: 0";
        }
    }

    checkinInput.addEventListener("change", updateNights);
    checkoutInput.addEventListener("change", updateNights);

    // Toggle Guests Dropdown
    guestInput.addEventListener("click", function (event) {
        event.stopPropagation();
        guestDropdown.style.display = "block";
    });

    document.addEventListener("click", function (event) {
        if (!guestDropdown.contains(event.target) && event.target !== guestInput) {
            guestDropdown.style.display = "none";
        }
    });

    // Update Guest Input Field
    function updateGuestSummary() {
        const rooms = roomsSelect.value;
        const guests = guestsSelect.value;
        guestInput.value = `${rooms} Room(s), ${guests} Guests`;
    }

    roomsSelect.addEventListener("change", updateGuestSummary);
    guestsSelect.addEventListener("change", updateGuestSummary);

    // Store Data and Navigate to Booking Page
    bookNowBtn.addEventListener("click", function () {
        let checkinDate = checkinInput.value;
        let checkoutDate = checkoutInput.value;
        let nights = nightsDisplay.textContent.replace("Nights: ", "");
        let rooms = roomsSelect.value;
        let guests = guestsSelect.value;

        if (!checkinDate) {
            alert("Please select a check-in date.");
            return;
        }

        localStorage.setItem("checkin", checkinDate);
        localStorage.setItem("checkout", checkoutDate);
        localStorage.setItem("nights", nights);
        localStorage.setItem("rooms", rooms);
        localStorage.setItem("guests", guests);

        window.location.href = "booking.html";
    });
    
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
    
});
