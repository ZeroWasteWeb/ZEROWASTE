
const form = document.getElementById('donationForm');
const rescuedKgElement = document.getElementById('rescuedKg'); 
const providedMealsElement = document.getElementById('providedMeals');
const donationAmountInput = document.getElementById('donationAmountKg'); 




const KG_PER_MEAL = 0.544; 


let currentKg = parseInt(rescuedKgElement?.textContent) || 0; 
let currentMeals = parseInt(providedMealsElement?.textContent) || 0;

/**

 * @param {number} kgDonated - The amount of food donated in kilograms.
 */
function updateMetrics(kgDonated) {
    
    const newKg = currentKg + kgDonated;
    
    const newMeals = Math.floor(newKg / KG_PER_MEAL); 
    
    
    currentKg = newKg;
    currentMeals = newMeals;

    
    if (rescuedKgElement) {
        rescuedKgElement.textContent = newKg;
    }
    if (providedMealsElement) {
        providedMealsElement.textContent = newMeals;
    }
}


if (form) {
    form.addEventListener('submit', function(event) {
        
        event.preventDefault(); 

        
        const donatedAmount = parseFloat(donationAmountInput.value);

       
        if (isNaN(donatedAmount) || donatedAmount <= 0) {
            alert("Please enter a valid amount of food in kilograms (kg) greater than zero.");
            return; 
        }

        
        updateMetrics(donatedAmount); 

        
        donationAmountInput.value = 0; 
        
        

        alert(`Thank you! Your donation of ${donatedAmount} kg has been processed!`);
    });
} else {
    console.error("Donation form with ID 'donationForm' not found.");
}
