document.addEventListener('DOMContentLoaded', () => {
    // Estimate insurance cost
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const petAge = document.getElementById('pet-age').value;
        const coverage = document.getElementById('coverage').value;

        if (!petAge) {
            alert('Please enter your pet\'s age.');
            return;
        }

        let estimate;
        if (coverage === 'basic') estimate = petAge * 5;
        else if (coverage === 'comprehensive') estimate = petAge * 10;
        else if (coverage === 'premium') estimate = petAge * 20;

        alert(`Estimated monthly cost: $${estimate}`);
    });

    // Search for vets
    const searchButton = document.getElementById('search-vets');
    searchButton.addEventListener('click', () => {
        const location = document.getElementById('location').value;

        if (!location) {
            alert('Please enter your location.');
            return;
        }

        const resultsDiv = document.getElementById('vet-results');
        resultsDiv.innerHTML = `
            <div class="card">
                <h3>Nearby Vet Clinic</h3>
                <p>Address: 123 Pet St, Example City</p>
                <p>Contact: (555) 123-4567</p>
            </div>
        `;
    });
});


