// === DOM Element References ===
// The script is now linked at the end of the body, so all elements should exist.
const form = document.getElementById('donationForm');
const rescuedKgElement = document.getElementById('rescuedKg'); 
const providedMealsElement = document.getElementById('providedMeals');
const donationAmountInput = document.getElementById('donationAmountKg'); 

// === Constants and Initial Values ===

// CONSTANT: We use 0.544 kg per estimated meal (1.2 lbs / 2.20462 lbs per kg).
const KG_PER_MEAL = 0.544; 

// Initialize running totals from the HTML content (or 0 if content is missing/invalid)
let currentKg = parseInt(rescuedKgElement?.textContent) || 0; 
let currentMeals = parseInt(providedMealsElement?.textContent) || 0;

/**
 * Calculates the new running totals and updates the display metrics.
 * @param {number} kgDonated - The amount of food donated in kilograms.
 */
function updateMetrics(kgDonated) {
    // 1. Calculate New Totals
    const newKg = currentKg + kgDonated;
    // Estimate meals (rounded down to a whole number)
    const newMeals = Math.floor(newKg / KG_PER_MEAL); 
    
    // 2. Update the Global Variables for the next donation
    currentKg = newKg;
    currentMeals = newMeals;

    // 3. Update the HTML Display
    if (rescuedKgElement) {
        rescuedKgElement.textContent = newKg;
    }
    if (providedMealsElement) {
        providedMealsElement.textContent = newMeals;
    }
}

// === Event Listener for Form Submission ===
if (form) {
    form.addEventListener('submit', function(event) {
        // Stop the form from submitting and reloading the page
        event.preventDefault(); 

        // Get the donated amount and convert it to a number
        const donatedAmount = parseFloat(donationAmountInput.value);

        // Basic validation
        if (isNaN(donatedAmount) || donatedAmount <= 0) {
            alert("Please enter a valid amount of food in kilograms (kg) greater than zero.");
            return; 
        }

        // Update the metrics
        updateMetrics(donatedAmount); 

        // Clear the donation amount input field
        donationAmountInput.value = 0; 
        
        // You may want to call form.reset() here to clear ALL fields if needed
        // form.reset(); 

        alert(`Thank you! Your donation of ${donatedAmount} kg has been processed!`);
    });
} else {
    console.error("Donation form with ID 'donationForm' not found.");
}
