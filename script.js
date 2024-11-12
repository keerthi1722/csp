// Function to add new goals
function addGoal() {
    let goalInput = document.getElementById('new-goal');
    let goalList = document.getElementById('goal-list');
    
    if (goalInput.value.trim() === "") {
        alert("Please enter a goal!");
        return;
    }

    let li = document.createElement('li');
    li.textContent = goalInput.value;
    goalList.appendChild(li);
    
    // Clear the input field
    goalInput.value = "";
}
// Function to handle the submission of the mental health quiz
function submitQuiz() {
    const stressLevel = document.querySelector('input[name="stress-level"]:checked');
    const sleepQuality = document.querySelector('input[name="sleep-quality"]:checked');
    const mood = document.querySelector('input[name="mood"]:checked');

    let resultMessage = "You need to answer all questions to get a result.";

    if (stressLevel && sleepQuality && mood) {
        let stressResponse = stressLevel.value;
        let sleepResponse = sleepQuality.value;
        let moodResponse = mood.value;

        // Analyze answers and give a response
        if (stressResponse === "Often" || sleepResponse === "Poor" || moodResponse === "Negative") {
            resultMessage = "It seems like you're facing some challenges. Don't hesitate to seek support from a counselor or talk to a trusted person.";
        } else if (stressResponse === "Sometimes" || sleepResponse === "Okay" || moodResponse === "Neutral") {
            resultMessage = "You're managing okay, but it might help to implement some self-care routines.";
        } else {
            resultMessage = "You're doing well! Keep up the great work maintaining your mental health.";
        }
    }

    // Display result
    document.getElementById("quiz-result").innerText = resultMessage;
}
// Initialize an empty array to store goals
let goals = [];

// DOM elements
const addGoalBtn = document.getElementById('add-goal-btn');
const newGoalInput = document.getElementById('new-goal');
const goalList = document.getElementById('goal-items');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// Event listener to add a new goal
addGoalBtn.addEventListener('click', () => {
    const goalText = newGoalInput.value.trim();

    // Only add goal if the input is not empty
    if (goalText) {
        const newGoal = {
            text: goalText,
            completed: false
        };
        goals.push(newGoal); // Add new goal to the array
        renderGoals(); // Re-render goals after adding
        updateProgress(); // Update progress bar after adding a goal
        newGoalInput.value = ''; // Clear input field
    } else {
        alert("Please enter a goal.");
    }
});

// Function to render goals to the UI
function renderGoals() {
    goalList.innerHTML = ''; // Clear the goal list
    goals.forEach((goal, index) => {
        const goalItem = document.createElement('li');
        goalItem.classList.add(goal.completed ? 'completed' : '');
        
        goalItem.innerHTML = `
            <span>${goal.text}</span>
            <div>
                <button onclick="toggleGoal(${index})">${goal.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteGoal(${index})">Delete</button>
            </div>
        `;
        goalList.appendChild(goalItem);
    });
}

// Function to toggle the completion of a goal
function toggleGoal(index) {
    goals[index].completed = !goals[index].completed;
    renderGoals(); // Re-render the goals after toggling
    updateProgress(); // Update progress after toggling
}

// Function to delete a goal
function deleteGoal(index) {
    goals.splice(index, 1); // Remove goal from the array
    renderGoals(); // Re-render goals after deletion
    updateProgress(); // Update progress after deletion
}

// Function to update the progress bar and text
function updateProgress() {
    const completedGoals = goals.filter(goal => goal.completed).length;
    const totalGoals = goals.length;
    const progressPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

    // Update progress bar width
    progressBar.style.width = `${progressPercentage}%`;

    // Update progress text
    progressText.textContent = `${Math.round(progressPercentage)}% of your goals are completed`;
}
