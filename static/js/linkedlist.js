// static/js/linkedlist.js

window.addEventListener('DOMContentLoaded', function() {
    // Debug logs
    console.log('Linked List JS loaded');
    // State
    let llState = {
        data: [],
        steps: [],
        currentStep: 0,
        isPlaying: false,
        speed: 3,
        algorithm: 'singly',
        operation: 'traverse',
        target: null,
        index: null
    };

    // DOM Elements
    const llContainer = document.getElementById('visualization');
    const llStartBtn = document.getElementById('start-btn');
    const llPauseBtn = document.getElementById('pause-btn');
    const llStepBtn = document.getElementById('step-btn');
    const llResetBtn = document.getElementById('reset-btn');
    const llTypeSelect = document.getElementById('ll-type-select');
    const llOpSelect = document.getElementById('ll-op-select');
    const llTargetInput = document.getElementById('ll-target-input');
    const llIndexInput = document.getElementById('ll-index-input');
    const llInput = document.getElementById('user-input');
    const llValidateBtn = document.getElementById('validate-input');
    const llFeedback = document.getElementById('input-feedback');
    const llGenerateBtn = document.getElementById('generate-btn');
    const llArraySizeInput = document.getElementById('array-size');
    const llTheoryBtn = document.getElementById('theory-btn');
    const theoryPanel = document.getElementById('theory-panel');

    // Debug logs for element presence
    console.log('llInput:', llInput);
    console.log('llValidateBtn:', llValidateBtn);
    console.log('llStartBtn:', llStartBtn);

    // Event listeners
    if (llTypeSelect) llTypeSelect.addEventListener('change', () => {
        llState.algorithm = llTypeSelect.value;
    });
    if (llOpSelect) {
        llOpSelect.innerHTML = `
<option value="traverse">Traverse</option>
<option value="insert_head">Insert at Head</option>
<option value="insert_pos">Insert at Position</option>
<option value="insert_end">Insert at End</option>
<option value="delete_head">Delete Head</option>
<option value="delete_pos">Delete at Position</option>
<option value="delete_end">Delete End</option>
`;
        llOpSelect.addEventListener('change', function() {
            llState.operation = llOpSelect.value;
            updateLLControls();
        });
    }
    if (llTargetInput) llTargetInput.addEventListener('input', () => {
        llState.target = llTargetInput.value ? parseInt(llTargetInput.value) : null;
    });
    if (llIndexInput) llIndexInput.addEventListener('input', () => {
        llState.index = llIndexInput.value ? parseInt(llIndexInput.value) : null;
    });
    if (llValidateBtn) llValidateBtn.addEventListener('click', validateLLInput);
    if (llStartBtn) llStartBtn.addEventListener('click', startLLVisualization);
    if (llPauseBtn) llPauseBtn.addEventListener('click', pauseLLVisualization);
    if (llStepBtn) llStepBtn.addEventListener('click', stepLLVisualization);
    if (llResetBtn) llResetBtn.addEventListener('click', resetLLVisualization);
    if (llGenerateBtn && llArraySizeInput) {
        llGenerateBtn.addEventListener('click', () => {
            const size = Math.max(3, Math.min(20, parseInt(llArraySizeInput.value) || 10));
            const arr = Array.from({length: size}, () => Math.floor(Math.random() * 100));
            llInput.value = arr.join(',');
            validateLLInput();
        });
    }
    if (llTheoryBtn && theoryPanel) {
        llTheoryBtn.addEventListener('click', function() {
            // Populate theory panel for linked list
            theoryPanel.classList.add('active');
            document.getElementById('algorithm-title').textContent = 'Linked List Overview';
            document.getElementById('algorithm-description').textContent = 'A linked list is a linear data structure where each element (node) contains a value and a reference (pointer) to the next node in the sequence. Types include singly, doubly, and circular linked lists.';
            document.getElementById('time-best').textContent = 'O(1) (for head/tail ops)';
            document.getElementById('time-average').textContent = 'O(n)';
            document.getElementById('time-worst').textContent = 'O(n)';
            document.getElementById('space-complexity-theory').textContent = 'O(n)';
            document.getElementById('loop-invariant').textContent = 'At each step, the list structure is maintained and all nodes are reachable from the head.';
            document.getElementById('proof-steps').innerHTML = '<li>Base case: A single node is a valid linked list.</li><li>Inductive step: Adding/removing a node preserves the linked list property.</li>';
            document.getElementById('current-invariant').textContent = 'The list is connected and acyclic (except for circular lists).';
            document.getElementById('progress-info').textContent = 'Operations update pointers to maintain the list structure.';
        });
        // Close button
        const closeBtn = theoryPanel.querySelector('.close-theory');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                theoryPanel.classList.remove('active');
            });
        }
    }

    function validateLLInput() {
        const input = llInput.value;
        try {
            const arr = input.split(',').map(x => parseInt(x.trim())).filter(x => !isNaN(x));
            if (!arr.length) throw new Error('Array cannot be empty');
            llState.data = arr;
            llFeedback.textContent = `Valid input: ${arr.length} numbers`;
            llFeedback.className = 'feedback-message success';
            if (llStartBtn) llStartBtn.disabled = false;
        } catch (e) {
            llFeedback.textContent = e.message;
            llFeedback.className = 'feedback-message error';
            if (llStartBtn) llStartBtn.disabled = true;
        }
    }

    function startLLVisualization() {
        if (!llState.data.length) {
            llFeedback.textContent = 'Please enter valid data and validate.';
            llFeedback.className = 'feedback-message error';
            if (llStartBtn) llStartBtn.disabled = true;
            return;
        }
        llState.isPlaying = true;
        runLLAlgorithm();
    }

    function pauseLLVisualization() {
        llState.isPlaying = false;
    }

    function stepLLVisualization() {
        if (llState.currentStep < llState.steps.length - 1) {
            llState.currentStep++;
            visualizeLLStep();
        }
    }

    function resetLLVisualization() {
        llState.currentStep = 0;
        llState.isPlaying = false;
        llState.steps = [];
        visualizeLLStep();
    }

    async function runLLAlgorithm() {
        const payload = {
            algorithm: llState.algorithm,
            data: llState.data,
            operation: llState.operation,
            target: llState.target,
            index: llState.index
        };
        const response = await fetch('/api/linkedlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.error) {
            llFeedback.textContent = result.error;
            llFeedback.className = 'feedback-message error';
            llState.isPlaying = false;
            return;
        }
        llState.steps = result.steps;
        llState.currentStep = 0;
        visualizeLLStep();
        if (llState.isPlaying) playLLNextStep();
    }

    function playLLNextStep() {
        if (!llState.isPlaying) return;
        if (llState.currentStep < llState.steps.length - 1) {
            llState.currentStep++;
            visualizeLLStep();
            setTimeout(playLLNextStep, 1000 / llState.speed);
        } else {
            llState.isPlaying = false;
        }
    }

    // Add step navigation controls for linked list
    function addLLStepNavigation() {
        let nav = document.getElementById('ll-step-nav');
        if (!nav) {
            nav = document.createElement('div');
            nav.id = 'll-step-nav';
            nav.style.display = 'flex';
            nav.style.justifyContent = 'center';
            nav.style.gap = '10px';
            nav.style.margin = '10px 0';
            llContainer.parentElement.insertBefore(nav, llContainer);
        }
        nav.innerHTML = '';
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Prev';
        prevBtn.disabled = llState.currentStep === 0;
        prevBtn.onclick = () => {
            if (llState.currentStep > 0) {
                llState.currentStep--;
                visualizeLLStep();
            }
        };
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.disabled = llState.currentStep >= llState.steps.length - 1;
        nextBtn.onclick = () => {
            if (llState.currentStep < llState.steps.length - 1) {
                llState.currentStep++;
                visualizeLLStep();
            }
        };
        const stepInfo = document.createElement('span');
        stepInfo.textContent = `Step ${llState.currentStep + 1} of ${llState.steps.length}`;
        nav.appendChild(prevBtn);
        nav.appendChild(stepInfo);
        nav.appendChild(nextBtn);
    }

    function visualizeLLStep() {
        if (!llState.steps.length) {
            llContainer.innerHTML = '<div class="ll-empty">No data to visualize.</div>';
            return;
        }
        addLLStepNavigation();
        const step = llState.steps[llState.currentStep];
        llContainer.innerHTML = '';
        // Responsive SVG width
        const svgWidth = Math.max(700, 90 * step.list.length + 60);
        const svg = d3.select(llContainer)
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', 160)
            .style('overflow-x', 'auto');
        const nodeRadius = 25;
        const spacing = 90;
        const nodes = step.list;
        // Draw nodes and arrows
        nodes.forEach((val, i) => {
            const x = 60 + i * spacing;
            const y = 80;
            // Node color logic
            let fill = '#90caf9';
            if (step.highlights.current === i) fill = '#1976d2';
            if (step.highlights.insert === i) fill = '#43a047';
            if (step.highlights.delete === i) fill = '#e53935';
            // Node
            svg.append('rect')
                .attr('x', x - nodeRadius)
                .attr('y', y - nodeRadius)
                .attr('rx', 16)
                .attr('ry', 16)
                .attr('width', nodeRadius * 2)
                .attr('height', nodeRadius * 2)
                .attr('fill', fill)
                .attr('stroke', '#333')
                .attr('stroke-width', 2);
            // Node value
            svg.append('text')
                .attr('x', x)
                .attr('y', y + 6)
                .attr('text-anchor', 'middle')
                .attr('font-size', '18px')
                .attr('fill', '#222')
                .text(val);
            // Index
            svg.append('text')
                .attr('x', x)
                .attr('y', y + 40)
                .attr('text-anchor', 'middle')
                .attr('font-size', '12px')
                .attr('fill', '#555')
                .text(i);
            // Head/tail labels
            if (i === 0) {
                svg.append('text')
                    .attr('x', x)
                    .attr('y', y - 40)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '13px')
                    .attr('fill', '#388e3c')
                    .text('head');
            }
            if (i === nodes.length - 1) {
                svg.append('text')
                    .attr('x', x)
                    .attr('y', y - 40)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '13px')
                    .attr('fill', '#fbc02d')
                    .text('tail');
            }
            // Pointer arrows
            if (i < nodes.length - 1) {
                // Next pointer
                svg.append('line')
                    .attr('x1', x + nodeRadius)
                    .attr('y1', y)
                    .attr('x2', x + spacing - nodeRadius)
                    .attr('y2', y)
                    .attr('stroke', '#333')
                    .attr('stroke-width', 2)
                    .attr('marker-end', 'url(#arrow)');
            }
            // Doubly linked list prev pointer
            if (llState.algorithm === 'doubly' && i > 0) {
                svg.append('line')
                    .attr('x1', x - nodeRadius)
                    .attr('y1', y - 10)
                    .attr('x2', x - spacing + nodeRadius)
                    .attr('y2', y - 10)
                    .attr('stroke', '#8d6e63')
                    .attr('stroke-width', 2)
                    .attr('marker-end', 'url(#arrow-prev)');
            }
        });
        // Arrow marker (next)
        svg.append('defs').append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 0 10 10')
            .attr('refX', 10)
            .attr('refY', 5)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto-start-reverse')
            .append('path')
            .attr('d', 'M 0 0 L 10 5 L 0 10 z')
            .attr('fill', '#333');
        // Arrow marker (prev)
        svg.append('defs').append('marker')
            .attr('id', 'arrow-prev')
            .attr('viewBox', '0 0 10 10')
            .attr('refX', 0)
            .attr('refY', 5)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto-start-reverse')
            .append('path')
            .attr('d', 'M 10 0 L 0 5 L 10 10 z')
            .attr('fill', '#8d6e63');
        // Circular list: draw arrow from tail to head
        if (llState.algorithm === 'circular' && nodes.length > 1) {
            const x1 = 60 + (nodes.length - 1) * spacing + nodeRadius;
            const y1 = 80;
            const x2 = 60 - nodeRadius;
            const y2 = 80;
            svg.append('path')
                .attr('d', `M${x1},${y1} Q${x1 + 40},${y1 - 60} ${(x1 + x2) / 2},${y1 - 60} Q${x2 - 40},${y2 - 60} ${x2},${y2}`)
                .attr('stroke', '#1976d2')
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .attr('marker-end', 'url(#arrow)');
        }
        // Explanation below SVG
        d3.select(llContainer)
            .append('div')
            .attr('class', 'll-explanation')
            .style('margin-top', '16px')
            .style('font-size', '1.1em')
            .style('text-align', 'center')
            .text(step.explanation);

        // Update Algorithm Steps panel
        const stepExplanation = document.getElementById('step-explanation');
        if (stepExplanation) {
            stepExplanation.textContent = step.explanation;
        }

        // Update Operation History panel
        const historySteps = document.querySelector('.history-steps');
        if (historySteps) {
            historySteps.innerHTML = '';
            for (let i = 0; i <= llState.currentStep; i++) {
                const div = document.createElement('div');
                div.className = 'history-step';
                div.textContent = llState.steps[i].explanation;
                historySteps.appendChild(div);
            }
        }
    }

    // Hide/show controls based on operation
    function updateLLControls() {
        if (!llOpSelect || !llTargetInput || !llIndexInput) return;
        const op = llOpSelect.value;
        const panel = document.getElementById('ll-operation-panel');
        if (panel) {
            if (op === 'traverse') {
                panel.textContent = '';
            } else if (op === 'insert_head') {
                panel.innerHTML = '<b>Insert at Head:</b> Enter the value to insert. The new node will become the head.';
            } else if (op === 'insert_end') {
                panel.innerHTML = '<b>Insert at End:</b> Enter the value to insert. The new node will be appended to the end.';
            } else if (op === 'insert_pos') {
                panel.innerHTML = '<b>Insert at Position:</b> Enter the value and the index where you want to insert the new node.';
            } else if (op === 'delete_head') {
                panel.innerHTML = '<b>Delete Head:</b> The head node will be removed.';
            } else if (op === 'delete_end') {
                panel.innerHTML = '<b>Delete End:</b> The last node will be removed.';
            } else if (op === 'delete_pos') {
                panel.innerHTML = '<b>Delete at Position:</b> Enter the index of the node you want to delete.';
            } else {
                panel.textContent = '';
            }
        }
        if (op === 'traverse') {
            llTargetInput.parentElement.style.display = 'none';
            llIndexInput.parentElement.style.display = 'none';
        } else if (op === 'insert_head' || op === 'delete_head') {
            llTargetInput.parentElement.style.display = (op === 'insert_head') ? '' : 'none';
            llIndexInput.parentElement.style.display = 'none';
        } else if (op === 'insert_end' || op === 'delete_end') {
            llTargetInput.parentElement.style.display = (op === 'insert_end') ? '' : 'none';
            llIndexInput.parentElement.style.display = 'none';
        } else if (op === 'insert_pos' || op === 'delete_pos') {
            llTargetInput.parentElement.style.display = (op === 'insert_pos') ? '' : 'none';
            llIndexInput.parentElement.style.display = '';
        }
    }
    if (llOpSelect) llOpSelect.addEventListener('change', updateLLControls);
    updateLLControls();
}); 