// Inside the selectOption function
function selectOption(element, answerId) {
    // ... existing code ...
    
    // Assign points based on answer (1-4 points per question)
    const answerValue = parseInt(answerId.charAt(1)); // Gets the number from answerId (a1 → 1)
    score += answerValue;
}

function showResults() {
    // Calculate maximum possible score
    const maxScore = totalQuestions * 4; // 4 points per question × 5 questions = 20
    
    let title, text, img;
    
    if (score <= 10) {
        title = "Meat Lover Alert!";
        text = "A plant-based week would be tough for you! You're deeply attached to animal products...";
        img = "meat-lover-image.jpg";
    }
    else if (score <= 15) {
        title = "Flexitarian Potential";
        text = "You could survive a plant-based week with some effort!...";
        img = "flexitarian-image.jpg";
    }
    else if (score <= 18) {
        title = "Plant-Based Pro";
        text = "You'd do great on a plant-based week!...";
        img = "plantbased-image.jpg";
    }
    else {
        title = "Vegan at Heart";
        text = "You're practically plant-based already!...";
        img = "vegan-image.jpg";
    }
    
    // Display the result
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-text').textContent = text;
    document.getElementById('result-image').src = img;
}

function calculateResults() {
    // Get all selected answers
    const selectedOptions = document.querySelectorAll('.option.selected');
    
    // Calculate score and count answer types
    let score = 0;
    let meatCount = 0;
    let dairyCount = 0;
    let plantCount = 0;
    
    selectedOptions.forEach(option => {
        const value = option.getAttribute('data-value');
        
        // Score calculation
        if (value === 'meat-heavy') {
            score += 1;
            meatCount++;
        }
        else if (value === 'contains-dairy') {
            score += 2;
            dairyCount++;
        }
        else if (value === 'plant-based') {
            score += 3;
            plantCount++;
        }
        else if (value === 'vegan') {
            score += 4;
            plantCount++;
        }
    });
    
    // Determine result based on multiple factors
    let result;
    
    if (meatCount >= 3) {
        result = {
            title: "Meat Enthusiast",
            description: "Your diet is heavily meat-based...",
            tips: ["Try Meatless Mondays", "Experiment with plant proteins"],
            image: "meat-result.jpg"
        };
    }
    else if (dairyCount >= 3) {
        result = {
            title: "Dairy Dependent",
            description: "You rely heavily on dairy products...",
            tips: ["Try nut milks", "Explore vegan cheeses"],
            image: "dairy-result.jpg"
        };
    }
    else if (plantCount >= 4) {
        result = {
            title: "Plant-Powered",
            description: "You're already mostly plant-based!...",
            tips: ["Try new vegan recipes", "Explore meat alternatives"],
            image: "plant-result.jpg"
        };
    }
    else {
        result = {
            title: "Balanced Eater",
            description: "You have a mix of plant and animal foods...",
            tips: ["Increase plant-based meals gradually"],
            image: "balanced-result.jpg"
        };
    }
    
    // Additional metrics
    const plantPercentage = Math.round((plantCount / totalQuestions) * 100);
    
    // Display the results
    displayResults(result, score, plantPercentage);
}

function displayResults(result, score, plantPercentage) {
    const resultsHTML = `
        <h2>${result.title}</h2>
        <img src="${result.image}" alt="${result.title}">
        <p>${result.description}</p>
        <div class="score-display">
            <p>Your plant-based score: ${score}/20</p>
            <p>${plantPercentage}% of your meals are plant-based</p>
        </div>
        <h3>Tips to go more plant-based:</h3>
        <ul>
            ${result.tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
    `;
    
    document.getElementById('results').innerHTML = resultsHTML;
}
