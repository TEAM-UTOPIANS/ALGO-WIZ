// Visualization state
let state = {
    data: [],
    steps: [],
    currentStep: 0,
    isPlaying: false,
    speed: 3,
    algorithm: null,
    isValidInput: false,
    theoreticalSteps: [],
    showingTheory: false,
    target: null
};

// DOM Elements
const visualizationContainer = document.getElementById('visualization');
const explanationPanel = document.getElementById('explanation');
const stepExplanation = document.getElementById('step-explanation');
const statsPanel = document.getElementById('stats');
const algorithmSelect = document.getElementById('algorithm-select');
const generateBtn = document.getElementById('generate-btn');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stepBtn = document.getElementById('step-btn');
const resetBtn = document.getElementById('reset-btn');
const speedControl = document.getElementById('speed');
const speedValue = document.getElementById('speed-value');
const userInput = document.getElementById('user-input');
const validateInputBtn = document.getElementById('validate-input');
const inputFeedback = document.getElementById('input-feedback');
const arraySizeInput = document.getElementById('array-size');
const comparisonCount = document.getElementById('comparison-count');
const swapCount = document.getElementById('swap-count');
const timeComplexity = document.getElementById('time-complexity');
const spaceComplexity = document.getElementById('space-complexity');
const theoryBtn = document.getElementById('theory-btn');
const theoryPanel = document.getElementById('theory-panel');
const closeTheoryBtn = document.querySelector('.close-theory');
const algorithmTitle = document.getElementById('algorithm-title');
const algorithmDescription = document.getElementById('algorithm-description');
const timeBest = document.getElementById('time-best');
const timeAverage = document.getElementById('time-average');
const timeWorst = document.getElementById('time-worst');
const spaceComplexityTheory = document.getElementById('space-complexity-theory');
const loopInvariant = document.getElementById('loop-invariant');
const proofSteps = document.getElementById('proof-steps');
const currentInvariant = document.getElementById('current-invariant');
const progressInfo = document.getElementById('progress-info');

// D3.js visualization setup
const margin = { top: 20, right: 20, bottom: 20, left: 20 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Remove existing SVG setup and replace with array visualization
d3.select('#visualization svg').remove();

const arrayContainer = d3.select('#visualization')
    .append('div')
    .attr('class', 'array-visualization')
    .style('width', `${width}px`)
    .style('height', `${height}px`);

// Event listeners
window.addEventListener('DOMContentLoaded', function() {
    // Defensive: Only run if main elements exist
    if (!document.getElementById('visualization')) return;
    // (Re)define all DOM elements here
    const visualizationContainer = document.getElementById('visualization');
    const explanationPanel = document.getElementById('explanation');
    const stepExplanation = document.getElementById('step-explanation');
    const statsPanel = document.getElementById('stats');
    const algorithmSelect = document.getElementById('algorithm-select');
    const generateBtn = document.getElementById('generate-btn');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stepBtn = document.getElementById('step-btn');
    const resetBtn = document.getElementById('reset-btn');
    const speedControl = document.getElementById('speed');
    const speedValue = document.getElementById('speed-value');
    const userInput = document.getElementById('user-input');
    const validateInputBtn = document.getElementById('validate-input');
    const inputFeedback = document.getElementById('input-feedback');
    const arraySizeInput = document.getElementById('array-size');
    const comparisonCount = document.getElementById('comparison-count');
    const swapCount = document.getElementById('swap-count');
    const timeComplexity = document.getElementById('time-complexity');
    const spaceComplexity = document.getElementById('space-complexity');
    const theoryBtn = document.getElementById('theory-btn');
    const theoryPanel = document.getElementById('theory-panel');
    const closeTheoryBtn = document.querySelector('.close-theory');
    const algorithmTitle = document.getElementById('algorithm-title');
    const algorithmDescription = document.getElementById('algorithm-description');
    const timeBest = document.getElementById('time-best');
    const timeAverage = document.getElementById('time-average');
    const timeWorst = document.getElementById('time-worst');
    const spaceComplexityTheory = document.getElementById('space-complexity-theory');
    const loopInvariant = document.getElementById('loop-invariant');
    const proofSteps = document.getElementById('proof-steps');
    const currentInvariant = document.getElementById('current-invariant');
    const progressInfo = document.getElementById('progress-info');
    // Attach event listeners only if elements exist
    if (generateBtn) generateBtn.addEventListener('click', generateNewData);
    if (startBtn) startBtn.addEventListener('click', startVisualization);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseVisualization);
    if (stepBtn) stepBtn.addEventListener('click', stepVisualization);
    if (resetBtn) resetBtn.addEventListener('click', resetVisualization);
    if (validateInputBtn) validateInputBtn.addEventListener('click', validateUserInput);
    if (userInput) userInput.addEventListener('input', () => {
        state.isValidInput = false;
        updateButtonStates();
    });
    if (algorithmSelect) algorithmSelect.addEventListener('change', () => {
        state.algorithm = algorithmSelect.value;
        generateNewData();
    });
    if (speedControl) speedControl.addEventListener('input', updateSpeed);
    // Initialize visualization
    if (algorithmSelect) {
        state.algorithm = algorithmSelect.value;
        generateNewData();
    }
    if (theoryBtn && theoryPanel) {
        theoryBtn.addEventListener('click', function() {
            theoryPanel.classList.add('active');
            state.showingTheory = true;
            // Always try to update the theory panel
            if (state.theoreticalSteps && state.theoreticalSteps.length > 0) {
                updateTheoryPanel();
            } else {
                // Fallback: show a message if no theory is available
                const theoryContent = document.querySelector('.theory-content');
                if (theoryContent) {
                    theoryContent.innerHTML = '<div class="theory-section"><h3>Theory Not Available</h3><div class="section-content">No theory steps were provided for this algorithm. Please run the visualization to see theory, or check your backend implementation.</div></div>';
                }
            }
        });
        // Close button
        const closeBtn = theoryPanel.querySelector('.close-theory');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                theoryPanel.classList.remove('active');
                state.showingTheory = false;
            });
        }
    }
});

// Validate user input
async function validateUserInput() {
    const input = userInput.value;
    
    try {
        const response = await fetch('/api/validate-input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
        });
        
        const result = await response.json();
        
        if (result.valid) {
            inputFeedback.textContent = `Valid input: ${result.length} numbers`;
            inputFeedback.className = 'feedback-message success';
            state.data = result.array;
            state.isValidInput = true;
            resetVisualization();
            visualizeCurrentStep();
        } else {
            inputFeedback.textContent = result.error;
            inputFeedback.className = 'feedback-message error';
            state.isValidInput = false;
        }
        
        updateButtonStates();
    } catch (error) {
        inputFeedback.textContent = 'Error validating input';
        inputFeedback.className = 'feedback-message error';
        state.isValidInput = false;
        updateButtonStates();
    }
}

// Generate random data
function generateNewData() {
    const size = parseInt(arraySizeInput.value) || 10;
    state.data = Array.from({length: size}, () => Math.floor(Math.random() * 100));
    state.isValidInput = true;
    inputFeedback.textContent = `Generated ${size} random numbers`;
    inputFeedback.className = 'feedback-message success';
    userInput.value = state.data.join(', ');
    resetVisualization();
    visualizeCurrentStep();
    updateButtonStates();
}

// Update button states
function updateButtonStates() {
    const hasData = state.data.length > 0;
    const hasSteps = state.steps.length > 0;
    
    startBtn.disabled = !state.isValidInput || state.isPlaying;
    pauseBtn.disabled = !state.isPlaying;
    stepBtn.disabled = !state.isValidInput || state.isPlaying;
    generateBtn.disabled = state.isPlaying;
    validateInputBtn.disabled = state.isPlaying;
    userInput.disabled = state.isPlaying;
    arraySizeInput.disabled = state.isPlaying;
    algorithmSelect.disabled = state.isPlaying;
}

// Start visualization
function startVisualization() {
    if (!state.isPlaying && state.isValidInput) {
        state.isPlaying = true;
        updateButtonStates();
        runAlgorithm();
    }
}

// Run the selected algorithm
async function runAlgorithm() {
    try {
        const algorithm = state.algorithm || algorithmSelect.value;
        // Choose endpoint based on algorithm type: if isSearchAlgorithm() is true, use /api/search, else use /api/sort.
        const endpoint = isSearchAlgorithm() ? '/api/search' : '/api/sort';
        const requestBody = {
            array: state.data,
            algorithm: algorithm
        };
        // Add target for search algorithms
        if (isSearchAlgorithm()) {
            const targetInput = document.getElementById('search-target');
            if (!targetInput || !targetInput.value) {
                inputFeedback.textContent = 'Please enter a target value to search for';
                inputFeedback.className = 'feedback-message error';
                state.isPlaying = false;
                updateButtonStates();
                return;
            }
            requestBody.target = parseInt(targetInput.value);
            state.target = parseInt(targetInput.value);
        }
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });
        const result = await response.json();
        if (result.error) {
            inputFeedback.textContent = result.error;
            inputFeedback.className = 'feedback-message error';
            state.isPlaying = false;
            updateButtonStates();
            return;
        }
        // Extract theoretical steps and remove them from visualization steps
        state.theoreticalSteps = result.steps.filter(step => step.title);
        state.steps = result.steps.filter(step => !step.title);
        updateTheoryPanel();
        playNextStep();
    } catch (error) {
        console.error('Error running algorithm:', error);
        inputFeedback.textContent = 'Error running algorithm';
        inputFeedback.className = 'feedback-message error';
        state.isPlaying = false;
        updateButtonStates();
    }
}

// Pause visualization
function pauseVisualization() {
    state.isPlaying = false;
    updateButtonStates();
}

// Step through visualization
function stepVisualization() {
    if (state.currentStep < state.steps.length - 1) {
        state.currentStep++;
        visualizeCurrentStep();
    }
}

// Reset visualization
function resetVisualization() {
    state.currentStep = 0;
    state.isPlaying = false;
    state.steps = [];
    state.theoreticalSteps = [];
    updateButtonStates();
    visualizeCurrentStep();
}

// Update animation speed
function updateSpeed(event) {
    state.speed = parseInt(event.target.value);
    const speedLabels = ['Very Slow', 'Slow', 'Normal', 'Fast', 'Very Fast'];
    speedValue.textContent = speedLabels[state.speed - 1];
}

// Handle algorithm change
function handleAlgorithmChange() {
    state.algorithm = algorithmSelect.value;
    if (state.isValidInput) {
        resetVisualization();
    }
}

// Play next step with delay based on speed
function playNextStep() {
    if (!state.isPlaying) return;
    
    if (state.currentStep < state.steps.length - 1) {
        state.currentStep++;
        visualizeCurrentStep();
        setTimeout(playNextStep, 1000 / state.speed);
    } else {
        state.isPlaying = false;
        updateButtonStates();
    }
}

// Update visualization function
function visualizeCurrentStep() {
    if (!state.steps.length) {
        // Initial visualization of input array
        visualizeArray(state.data);
        return;
    }

    const step = state.steps[state.currentStep];
    
    // Update array visualization
    visualizeArray(step.array, step.highlights);
    
    // Update explanation and stats
    updateExplanation(step);
    updateStats(step);
    
    // Update theory panel if needed
    if (state.showingTheory) {
        updateTheoryPanel();
    }
}

function visualizeArray(array, highlights = {}) {
    // For searching: set foundSuccess if highlights.found is present
    if (isSearchAlgorithm() && highlights && highlights.found !== undefined) {
        const foundIdx = highlights.found;
        if (foundIdx !== null && foundIdx !== undefined && array[foundIdx] === state.target) {
            highlights.foundSuccess = true;
        } else {
            highlights.foundSuccess = false;
        }
    }
    // Clear existing visualization
    arrayContainer.selectAll('*').remove();
    
    // Create step number and progress
    const header = arrayContainer.append('div')
        .attr('class', 'visualization-header');
        
    header.append('div')
        .attr('class', 'step-number')
        .text(`Step ${state.currentStep + 1} of ${state.steps.length}`);
    
    // Add step type indicator
    const stepType = getStepType(highlights, array);
    if (stepType) {
        let typeClass = `step-type ${stepType.toLowerCase().replace(/ /g, '-')}`;
        header.append('div')
            .attr('class', typeClass)
            .text(stepType);
    }
    
    // Create array states section
    const statesSection = arrayContainer.append('div')
        .attr('class', 'array-states');
    
    // Show previous state if available
    if (state.currentStep > 0) {
        const previousStep = state.steps[state.currentStep - 1];
        statesSection.append('div')
            .attr('class', 'array-state previous')
            .call(createArrayState, previousStep.array, null, 'Previous State');
    }
    
    // Show current state
    statesSection.append('div')
        .attr('class', 'array-state current')
        .call(createArrayState, array, highlights, 'Current State');
    
    // Add explanation
    if (state.steps[state.currentStep]?.explanation) {
        arrayContainer.append('div')
            .attr('class', 'step-explanation')
            .text(state.steps[state.currentStep].explanation);
    }
    
    // Add algorithm progress
    const progressSection = arrayContainer.append('div')
        .attr('class', 'algorithm-progress');
    
    // Add progress visualization based on algorithm type
    if (isSearchAlgorithm()) {
        addSearchProgress(progressSection, highlights);
    } else {
        addSortingProgress(progressSection, highlights);
    }
    
    // Add statistics
    addStatistics(arrayContainer);
    
    // Update operation history if steps are available
    if (state.steps && state.steps.length > 0) {
        updateOperationHistory(state.steps, state.currentStep);
    }
}

function createArrayState(selection, array, highlights, label) {
    const stateContainer = selection.append('div')
        .attr('class', 'state-container');
        
    // Add label
    stateContainer.append('div')
        .attr('class', 'state-label')
        .text(label);
    
    // Create array row
    const arrayRow = stateContainer.append('div')
        .attr('class', 'array-row');
    
    // Create array elements
    array.forEach((value, index) => {
        const elementState = getElementState(index, highlights);
        
        const element = arrayRow.append('div')
            .attr('class', `array-element ${elementState.classes}`)
            .text(value);
            
        // Add index label
        element.append('div')
            .attr('class', 'element-index')
            .text(index);
            
        // Add operation indicator if any
        if (elementState.operation) {
            element.append('div')
                .attr('class', 'operation-indicator')
                .text(elementState.operation);
        }
    });
}

function getElementState(index, highlights) {
    if (!highlights) return { classes: '' };
    
    const classes = [];
    let operation = null;
    
    // Handle searching algorithms
    if (isSearchAlgorithm()) {
        if (highlights.comparing?.includes(index)) {
            classes.push('comparing');
            operation = 'Comparing';
        }
        if (highlights.searched?.includes(index)) {
            classes.push('searched');
        }
        if (highlights.found !== undefined) {
            if (highlights.found === index) {
                if (highlights.foundSuccess) {
                    classes.push('found');
                    operation = 'Found';
                } else {
                    classes.push('not-found');
                    operation = 'Not Found';
                }
            }
        }
        if (highlights.range) {
            if (index >= highlights.range[0] && index <= highlights.range[1]) {
                classes.push('in-range');
            } else {
                classes.push('out-of-range');
            }
        }
    }
    // Handle sorting algorithms
    else {
        if (highlights.comparing?.includes(index)) {
            classes.push('comparing');
            operation = 'Compare';
        }
        if (highlights.swapping?.includes(index)) {
            classes.push('swapping');
            operation = 'Swap';
        }
        if (highlights.sorted?.includes(index)) {
            classes.push('sorted');
        }
        if (highlights.pivot === index) {
            classes.push('pivot');
            operation = 'Pivot';
        }
    }
    
    return {
        classes: classes.join(' '),
        operation
    };
}

function getStepType(highlights, array) {
    if (isSearchAlgorithm()) {
        if (highlights.comparing?.length) return 'Comparing';
        if (highlights.found !== undefined) {
            // Only return 'Found' if foundSuccess is true, otherwise 'Not Found'
            if (highlights.foundSuccess) return 'Found';
            else return 'Not Found';
        }
        if (highlights.range) return 'Searching Range';
        return 'Searching';
    } else {
        if (highlights.comparing?.length) return 'Comparing';
        if (highlights.swapping?.length) return 'Swapping';
        if (highlights.pivot !== undefined) return 'Partitioning';
        return 'Sorting';
    }
}

function addSearchProgress(container, highlights) {
    const progress = container.append('div')
        .attr('class', 'search-progress');
    
    // Add search range for binary search
    if (highlights.range) {
        progress.append('div')
            .attr('class', 'search-range')
            .text(`Current Range: [${highlights.range[0]} - ${highlights.range[1]}]`);
    }
    
    // Add elements searched count
    if (highlights.searched) {
        progress.append('div')
            .attr('class', 'elements-searched')
            .text(`Elements Searched: ${highlights.searched.length}`);
    }
}

function addSortingProgress(container, highlights) {
    const progress = container.append('div')
        .attr('class', 'sorting-progress');
    
    // Add sorted elements count
    if (highlights.sorted) {
        progress.append('div')
            .attr('class', 'elements-sorted')
            .text(`Elements Sorted: ${highlights.sorted.length}`);
    }
    
    // Add current operation
    if (highlights.comparing || highlights.swapping) {
        const operation = highlights.swapping ? 'Swapping' : 'Comparing';
        const indices = highlights.swapping || highlights.comparing;
        progress.append('div')
            .attr('class', 'current-operation')
            .text(`${operation} elements at indices: [${indices.join(', ')}]`);
    }
}

function addStatistics(container) {
    const stats = state.steps[state.currentStep]?.stats;
    if (!stats) return;
    
    const statsContainer = container.append('div')
        .attr('class', 'statistics');
        
    // Add comparisons
    statsContainer.append('div')
        .attr('class', 'stat-item')
        .html(`<span class="stat-label">Comparisons:</span>
               <span class="stat-value">${stats.comparisons}</span>`);
               
    // Add swaps for sorting algorithms
    if (stats.swaps !== undefined) {
        statsContainer.append('div')
            .attr('class', 'stat-item')
            .html(`<span class="stat-label">Swaps:</span>
                   <span class="stat-value">${stats.swaps}</span>`);
    }
    
    // Add complexity
    statsContainer.append('div')
        .attr('class', 'stat-item')
        .html(`<span class="stat-label">Time Complexity:</span>
               <span class="stat-value">${stats.timeComplexity}</span>`);
}

function isSearchAlgorithm() {
    const algorithm = state.algorithm || algorithmSelect.value;
    return algorithm === 'binary' || algorithm === 'linear' || algorithm === 'jump' || algorithm === 'exponential';
}

// Update explanation panel
function updateExplanation(step) {
    if (step) {
        stepExplanation.textContent = step.explanation;
    } else {
        stepExplanation.textContent = 'Ready to start';
    }
}

// Update statistics panel
function updateStats(step) {
    if (step) {
        const stats = step.stats;
        comparisonCount.textContent = stats.comparisons;
        swapCount.textContent = stats.swaps;
        timeComplexity.textContent = stats.timeComplexity;
        spaceComplexity.textContent = stats.spaceComplexity;
    } else {
        comparisonCount.textContent = '0';
        swapCount.textContent = '0';
        timeComplexity.textContent = '-';
        spaceComplexity.textContent = '-';
    }
}

// Utility: Parse complexity string to a function
function getComplexityFunction(complexityStr) {
    // Only supports O(1), O(n), O(n^2), O(log n), O(n log n), O(2^n)
    if (!complexityStr) return n => 1;
    const s = complexityStr.replace(/O\(|\)/g, '').replace(/\s/g, '').toLowerCase();
    if (s === '1') return n => 1;
    if (s === 'n') return n => n;
    if (s === 'n^2' || s === 'n2' || s === 'n*n') return n => n * n;
    if (s === 'logn' || s === 'log(n)') return n => Math.log2(n);
    if (s === 'nlogn' || s === 'nlog(n)') return n => n * Math.log2(n);
    if (s === '2^n' || s === '2n') return n => Math.pow(2, n);
    return n => n; // fallback
}

// Draw growth rate graph
function drawGrowthRateGraph(complexityStr) {
    const container = d3.select('#growth-rate-graph');
    container.selectAll('*').remove();
    if (!complexityStr) return;
    const f = getComplexityFunction(complexityStr);
    const nVals = d3.range(1, 21); // n from 1 to 20
    const yVals = nVals.map(f);
    const maxY = d3.max(yVals);
    const width = 360, height = 200, margin = {top: 20, right: 20, bottom: 30, left: 40};
    const x = d3.scaleLinear().domain([1, 20]).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, maxY]).range([height - margin.bottom, margin.top]);
    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height);
    // X axis
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format('d')))
        .append('text')
        .attr('x', width - margin.right)
        .attr('y', -6)
        .attr('fill', '#333')
        .attr('text-anchor', 'end')
        .text('Input Size n');
    // Y axis
    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(6))
        .append('text')
        .attr('x', 6)
        .attr('y', margin.top)
        .attr('fill', '#333')
        .attr('text-anchor', 'start')
        .text('Operations');
    // Line
    const line = d3.line()
        .x((d, i) => x(nVals[i]))
        .y(d => y(d));
    svg.append('path')
        .datum(yVals)
        .attr('fill', 'none')
        .attr('stroke', '#1976d2')
        .attr('stroke-width', 2.5)
        .attr('d', line);
    // Dots
    svg.selectAll('circle')
        .data(yVals)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => x(nVals[i]))
        .attr('cy', d => y(d))
        .attr('r', 3)
        .attr('fill', '#1976d2');
}

// Add function to update theory panel
function updateTheoryPanel() {
    if (!state.theoreticalSteps.length) return;
    
    const theory = state.theoreticalSteps[0];
    const theoryContent = document.querySelector('.theory-content');
    
    // Clear existing content
    theoryContent.innerHTML = '';
    
    // Add algorithm overview section
    addTheorySection(theoryContent, 'Algorithm Overview', `
        <h4>${theory.title}</h4>
        <p>${theory.description}</p>
    `);
    
    // Add complexity analysis
    addTheorySection(theoryContent, 'Complexity Analysis', `
        <div class="complexity-grid">
            <div class="complexity-item">
                <span class="label">Best Case:</span>
                <span class="value">${theory.complexity.time_best}</span>
            </div>
            <div class="complexity-item">
                <span class="label">Average Case:</span>
                <span class="value">${theory.complexity.time_average}</span>
            </div>
            <div class="complexity-item">
                <span class="label">Worst Case:</span>
                <span class="value">${theory.complexity.time_worst}</span>
            </div>
            <div class="complexity-item">
                <span class="label">Space Complexity:</span>
                <span class="value">${theory.complexity.space}</span>
            </div>
        </div>
        <div id="growth-rate-graph" style="margin-top: 24px; height: 220px;"></div>
    `);
    
    // Draw the graph for average case by default
    setTimeout(() => {
        drawGrowthRateGraph(theory.complexity.time_average);
    }, 0);
    
    // Add loop invariant
    addTheorySection(theoryContent, 'Loop Invariant', `
        <p>${theory.invariant}</p>
    `);
    
    // Add correctness proof
    addTheorySection(theoryContent, 'Correctness Proof', `
        <ol class="proof-steps">
            ${theory.proof.map(step => `<li>${step}</li>`).join('')}
        </ol>
    `);
    
    // Add swapping history
    addSwappingHistory(theoryContent);
    
    // Add current state analysis
    addCurrentStateAnalysis(theoryContent);
}

function addTheorySection(container, title, content) {
    const section = document.createElement('div');
    section.className = 'theory-section';
    section.innerHTML = `
        <h3>${title}</h3>
        <div class="section-content">
            ${content}
        </div>
    `;
    container.appendChild(section);
}

function addSwappingHistory(container) {
    const swappingSteps = state.steps
        .slice(0, state.currentStep + 1)
        .filter(step => step.highlights?.swapping?.length);
    
    if (swappingSteps.length === 0) return;
    
    const historyContent = swappingSteps.map((step, index) => {
        const indices = step.highlights.swapping;
        const values = indices.map(i => step.array[i]);
        return `
            <div class="swap-step">
                <div class="swap-step-header">
                    <span class="swap-number">Swap #${index + 1}</span>
                    <span class="swap-indices">Indices: [${indices.join(', ')}]</span>
                </div>
                <div class="swap-visualization">
                    ${createSwapVisualization(step.array, indices, values)}
                </div>
                <div class="swap-explanation">
                    ${step.explanation}
                </div>
            </div>
        `;
    }).join('');
    
    addTheorySection(container, 'Swapping History', `
        <div class="swapping-history">
            ${historyContent}
        </div>
    `);
}

function createSwapVisualization(array, indices, values) {
    return `
        <div class="mini-array">
            ${array.map((value, index) => `
                <div class="mini-element ${indices.includes(index) ? 'swapped' : ''}">
                    ${value}
                </div>
            `).join('')}
        </div>
    `;
}

function addCurrentStateAnalysis(container) {
    if (!state.steps[state.currentStep]) return;
    
    const currentStep = state.steps[state.currentStep];
    const stats = currentStep.stats;
    
    let analysisContent = `
        <div class="current-analysis">
            <div class="analysis-item">
                <span class="label">Current Step:</span>
                <span class="value">${state.currentStep + 1} of ${state.steps.length}</span>
            </div>
            <div class="analysis-item">
                <span class="label">Comparisons:</span>
                <span class="value">${stats.comparisons}</span>
            </div>
    `;
    
    if (stats.swaps !== undefined) {
        analysisContent += `
            <div class="analysis-item">
                <span class="label">Swaps:</span>
                <span class="value">${stats.swaps}</span>
            </div>
        `;
    }
    
    analysisContent += `
            <div class="analysis-progress">
                <div class="progress-bar" style="width: ${(state.currentStep + 1) / state.steps.length * 100}%"></div>
            </div>
        </div>
    `;
    
    addTheorySection(container, 'Current State Analysis', analysisContent);
}

// Toggle theory panel
function toggleTheoryPanel() {
    state.showingTheory = !state.showingTheory;
    theoryPanel.classList.toggle('active');
    theoryBtn.textContent = state.showingTheory ? 'Hide Theory' : 'Show Theory';
}

// Update the visualization container style
document.getElementById('visualization').style.overflowY = 'auto';

// Initialize visualization
document.addEventListener('DOMContentLoaded', () => {
    state.algorithm = algorithmSelect.value;
    generateNewData();
});

function updateOperationHistory(steps, currentStep) {
    const historyContainer = document.querySelector('.history-steps');
    historyContainer.innerHTML = '';
    
    steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = `history-step ${index === currentStep ? 'active' : ''}`;
        
        // Add operation type class
        if (step.highlights?.comparing) {
            stepElement.classList.add('comparing');
        } else if (step.highlights?.swapping) {
            stepElement.classList.add('swapping');
        } else if (step.highlights?.found !== undefined) {
            // Set foundSuccess for history as well
            const foundIdx = step.highlights.found;
            if (foundIdx !== null && foundIdx !== undefined && step.array[foundIdx] === state.target) {
                stepElement.classList.add('found');
            } else {
                stepElement.classList.add('not-found');
            }
        } else if (step.highlights?.range) {
            stepElement.classList.add('searching');
        }
        
        // Create step content
        const stepNumber = document.createElement('div');
        stepNumber.className = 'step-number';
        stepNumber.textContent = `Step ${index + 1}`;
        
        const stepDescription = document.createElement('div');
        stepDescription.className = 'step-description';
        stepDescription.textContent = step.explanation || getStepDescription(step);
        
        const stepArray = document.createElement('div');
        stepArray.className = 'step-array';
        
        // Add array elements
        step.array.forEach((value, i) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = value;
            
            // Add highlight classes
            if (step.highlights?.comparing?.includes(i)) {
                element.classList.add('comparing');
            } else if (step.highlights?.swapping?.includes(i)) {
                element.classList.add('swapped');
            } else if (step.highlights?.found === i) {
                if (value === state.target) {
                    element.classList.add('found');
                } else {
                    element.classList.add('not-found');
                }
            } else if (step.highlights?.range && i >= step.highlights.range[0] && i <= step.highlights.range[1]) {
                element.classList.add('in-range');
            } else if (step.highlights?.searched?.includes(i)) {
                element.classList.add('searched');
            }
            
            stepArray.appendChild(element);
        });
        
        stepElement.appendChild(stepNumber);
        stepElement.appendChild(stepDescription);
        stepElement.appendChild(stepArray);
        historyContainer.appendChild(stepElement);
    });
    
    // Only scroll if the current step is not visible in the viewport
    const currentStepElement = historyContainer.children[currentStep];
    if (currentStepElement) {
        const containerRect = historyContainer.getBoundingClientRect();
        const stepRect = currentStepElement.getBoundingClientRect();
        
        // Check if the current step is outside the visible area
        if (stepRect.top < containerRect.top || stepRect.bottom > containerRect.bottom) {
            // Use a more gentle scroll behavior
            currentStepElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'nearest'
            });
        }
    }
}

function getStepDescription(step) {
    if (isSearchAlgorithm()) {
        if (step.highlights?.comparing) {
            return `Comparing with element at index ${step.highlights.comparing[0]}`;
        } else if (step.highlights?.found !== undefined) {
            return `Found target at index ${step.highlights.found}`;
        } else if (step.highlights?.range) {
            return `Searching in range [${step.highlights.range[0]}, ${step.highlights.range[1]}]`;
        } else if (step.highlights?.searched) {
            return `Searched through ${step.highlights.searched.length} elements`;
        }
        return 'Searching...';
    } else {
        if (step.highlights?.comparing) {
            return `Comparing elements at indices ${step.highlights.comparing.join(', ')}`;
        } else if (step.highlights?.swapping) {
            return `Swapping elements at indices ${step.highlights.swapping.join(', ')}`;
        } else if (step.highlights?.pivot !== undefined) {
            return `Using pivot at index ${step.highlights.pivot}`;
        }
        return 'Processing...';
    }
} 