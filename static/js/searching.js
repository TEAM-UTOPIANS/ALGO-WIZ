// State management
let searchState = {
    array: [],
    target: null,
    algorithm: 'binary',
    steps: [],
    currentStep: 0,
    isPlaying: false,
    speed: 1000
};

// DOM elements - using different names to avoid conflicts
const searchContainer = d3.select('#visualization');
const searchControls = d3.select('.controls');
const searchStats = d3.select('.stats-panel');

// Initialize the visualization
window.initSearching = function() {
    // Add event listeners
    document.getElementById('algorithm-select').addEventListener('change', handleAlgorithmChange);
    document.getElementById('search-target').addEventListener('change', handleTargetChange);
    document.getElementById('start-btn').addEventListener('click', handleSearch);
    document.getElementById('generate-btn').addEventListener('click', handleGenerate);
    document.getElementById('validate-input').addEventListener('click', handleValidateInput);
    document.getElementById('step-btn').addEventListener('click', handleNext);
    document.getElementById('speed').addEventListener('input', handleSpeedChange);
    
    // Enable the start button
    document.getElementById('start-btn').disabled = false;
};

// Handle validate input button click
async function handleValidateInput() {
    const input = document.getElementById('user-input').value;
    try {
        const response = await fetch('/api/validate-input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
        });
        
        const data = await response.json();
        if (data.valid) {
            searchState.array = data.array;
            if (searchState.algorithm === 'binary') {
                searchState.array.sort((a, b) => a - b);
            }
            visualizeArray(searchState.array);
            document.getElementById('input-feedback').className = 'feedback-message success';
            document.getElementById('input-feedback').textContent = 'Input validated successfully';
        } else {
            document.getElementById('input-feedback').className = 'feedback-message error';
            document.getElementById('input-feedback').textContent = data.error;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('input-feedback').className = 'feedback-message error';
        document.getElementById('input-feedback').textContent = 'An error occurred while validating input';
    }
}

// Handle search button click
async function handleSearch() {
    if (!searchState.target) {
        alert('Please enter a target value');
        return;
    }
    
    if (searchState.array.length === 0) {
        alert('Please enter or generate an array first');
        return;
    }
    
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                array: searchState.array,
                target: searchState.target,
                algorithm: searchState.algorithm
            })
        });
        
        const data = await response.json();
        if (data.error) {
            alert(data.error);
            return;
        }
        
        searchState.steps = data.steps;
        searchState.currentStep = 0;
        searchState.isPlaying = true;
        playSteps();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while performing the search');
    }
}

// Handle target value change
function handleTargetChange(event) {
    searchState.target = parseInt(event.target.value);
}

// Handle algorithm change
function handleAlgorithmChange(event) {
    searchState.algorithm = event.target.value;
    searchState.steps = [];
    searchState.currentStep = 0;
    if (searchState.array.length > 0) {
        if (searchState.algorithm === 'binary') {
            searchState.array.sort((a, b) => a - b);
        }
        visualizeArray(searchState.array);
    }
}

// Handle generate button click
function handleGenerate() {
    const size = parseInt(document.getElementById('array-size').value) || 10;
    searchState.array = Array.from({length: size}, () => Math.floor(Math.random() * 100) + 1);
    if (searchState.algorithm === 'binary') {
        searchState.array.sort((a, b) => a - b);
    }
    visualizeArray(searchState.array);
    searchState.steps = [];
    searchState.currentStep = 0;
}

// Play through the steps
async function playSteps() {
    while (searchState.isPlaying && searchState.currentStep < searchState.steps.length) {
        visualizeArray(searchState.array, searchState.steps[searchState.currentStep].highlights);
        await new Promise(resolve => setTimeout(resolve, searchState.speed));
        searchState.currentStep++;
    }
    searchState.isPlaying = false;
}

// Handle next button click
function handleNext() {
    if (searchState.currentStep < searchState.steps.length - 1) {
        searchState.currentStep++;
        visualizeArray(searchState.array, searchState.steps[searchState.currentStep].highlights);
    }
}

// Handle speed change
function handleSpeedChange(event) {
    searchState.speed = 2100 - event.target.value; // Invert the scale so higher value = faster
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initSearching); 