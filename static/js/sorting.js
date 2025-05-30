// Sorting-specific visualization functions
function visualizeSortingStep() {
    const currentStep = state.steps[state.currentStep];
    if (!currentStep) return;

    const data = currentStep.array;
    
    // Calculate scales
    const xScale = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([0, width])
        .padding(0.1);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([height, 0]);

    // Draw bars
    const bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d))
        .attr('fill', (d, i) => getBarColor(i, currentStep));

    // Add value labels
    svg.selectAll('.value-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value-label')
        .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d) - 5)
        .attr('text-anchor', 'middle')
        .text(d => d);

    // Add x-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g')
        .call(d3.axisLeft(yScale));
}

// Helper function to determine bar colors based on current step
function getBarColor(index, step) {
    if (step.comparing && step.comparing.includes(index)) {
        return '#ff9800'; // Orange for comparing
    }
    if (step.swapping && step.swapping.includes(index)) {
        return '#f44336'; // Red for swapping
    }
    if (step.pivot === index) {
        return '#9c27b0'; // Purple for pivot
    }
    if (step.updating && step.updating.includes(index)) {
        return '#2196f3'; // Blue for updating
    }
    return '#4caf50'; // Default green
}

// Initialize sorting visualization
async function initSortingVisualization() {
    const algorithm = algorithmSelect.value;
    const response = await fetch('/api/sort', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            array: state.data,
            algorithm: algorithm
        })
    });
    
    const result = await response.json();
    state.steps = result.steps;
    state.currentStep = 0;
    visualizeCurrentStep();
}

// Event listener for algorithm changes
algorithmSelect.addEventListener('change', initSortingVisualization);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof algorithmSelect !== 'undefined' && algorithmSelect) {
        algorithmSelect.addEventListener('change', initSortingVisualization);
        initSortingVisualization();
    }
}); 