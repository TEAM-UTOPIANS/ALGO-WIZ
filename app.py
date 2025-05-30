# app.py - Main Flask application for ALGO-WIZ

from flask import Flask, render_template, jsonify, request
from algorithms.sorting import (
    bubble_sort, quick_sort, merge_sort,
    selection_sort, insertion_sort, heap_sort
)
from algorithms.searching import binary_search, linear_search, jump_search, exponential_search
from algorithms.linkedlist import visualize_linkedlist

app = Flask(__name__)

# Home page route
@app.route('/')
def index():
    return render_template('index.html')

# Visualization page for sorting, searching, or linked list
@app.route('/visualization/<algorithm_type>')
def visualization(algorithm_type):
    return render_template('visualization.html', algorithm_type=algorithm_type)

# API endpoint for sorting algorithms
@app.route('/api/sort', methods=['POST'])
def sort():
    data = request.json
    array = data.get('array', [])
    algorithm = data.get('algorithm', 'bubble')
    
    # Input validation
    try:
        array = [int(x) for x in array]
        if not array:
            return jsonify({'error': 'Array cannot be empty'}), 400
        if len(array) > 100:  # Limit array size for performance
            return jsonify({'error': 'Array size cannot exceed 100 elements'}), 400
    except ValueError:
        return jsonify({'error': 'Invalid input: array must contain numbers only'}), 400
    
    # Map algorithm name to function
    steps = []
    algorithm_map = {
        'bubble': bubble_sort,
        'quick': quick_sort,
        'merge': merge_sort,
        'selection': selection_sort,
        'insertion': insertion_sort,
        'heap': heap_sort
    }
    
    if algorithm not in algorithm_map:
        return jsonify({'error': 'Invalid algorithm selected'}), 400
        
    steps = algorithm_map[algorithm](array.copy())
    
    return jsonify({
        'steps': steps,
        'inputArray': array,
        'algorithm': algorithm
    })

# API endpoint for searching algorithms
@app.route('/api/search', methods=['POST'])
def search():
    data = request.json
    array = data.get('array', [])
    target = data.get('target')
    algorithm = data.get('algorithm', 'binary')
    
    # Input validation
    try:
        # Handle array input
        if isinstance(array, str):
            # Remove brackets if present and split by comma
            array = array.strip('[]').split(',')
            array = [int(x.strip()) for x in array if x.strip()]
        else:
            array = [int(x) for x in array]
            
        target = int(target)
        
        if not array:
            return jsonify({'error': 'Array cannot be empty'}), 400
        if len(array) > 100:
            return jsonify({'error': 'Array size cannot exceed 100 elements'}), 400
    except ValueError:
        return jsonify({'error': 'Invalid input: array and target must be numbers'}), 400
    
    # Map algorithm name to function
    steps = []
    algorithm_map = {
        'binary': binary_search,
        'linear': linear_search,
        'jump': jump_search,
        'exponential': exponential_search
    }
    
    if algorithm not in algorithm_map:
        return jsonify({'error': 'Invalid algorithm selected'}), 400
        
    steps = algorithm_map[algorithm](array, target)
    
    return jsonify({
        'steps': steps,
        'inputArray': array,
        'target': target,
        'algorithm': algorithm
    })

# API endpoint to validate user input before running algorithms
@app.route('/api/validate-input', methods=['POST'])
def validate_input():
    """Endpoint to validate user input before running algorithms"""
    data = request.json
    input_str = data.get('input', '')
    
    try:
        # Remove brackets if present
        input_str = input_str.strip('[]')
        # Split by comma and convert to integers
        array = [int(x.strip()) for x in input_str.split(',') if x.strip()]
        
        if not array:
            return jsonify({'valid': False, 'error': 'Array cannot be empty'})
        if len(array) > 100:
            return jsonify({'valid': False, 'error': 'Array size cannot exceed 100 elements'})
            
        return jsonify({
            'valid': True,
            'array': array,
            'length': len(array)
        })
    except ValueError:
        return jsonify({'valid': False, 'error': 'Invalid input: please enter numbers separated by commas'})

# Visualization page for linked list
@app.route('/visualization/linkedlist')
def linkedlist():
    return render_template('visualization.html', algorithm_type='linkedlist')

# API endpoint for linked list operations
@app.route('/api/linkedlist', methods=['POST'])
def linkedlist_visualize():
    data = request.get_json()
    if not data or 'algorithm' not in data or 'data' not in data or 'operation' not in data:
        return jsonify(error='Missing required fields (algorithm, data, operation)'), 400
    algorithm = data['algorithm']
    data_list = data['data']
    operation = data['operation']
    target = data.get('target')
    index = data.get('index')
    result = visualize_linkedlist(algorithm, data_list, operation, target, index)
    return jsonify(result)

# Run the Flask app
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port)
