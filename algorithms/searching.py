import math

def get_theoretical_steps(algorithm):
    """
    Returns theoretical explanation steps for each algorithm,
    similar to CLRS textbook style.
    """
    theoretical_steps = {
        'binary': [
            {
                'title': 'Binary Search Algorithm',
                'description': 'Efficiently finds a target value in a sorted array by repeatedly dividing the search space in half.',
                'complexity': {
                    'time_best': 'O(1)',
                    'time_average': 'O(log n)',
                    'time_worst': 'O(log n)',
                    'space': 'O(1)'
                },
                'invariant': 'Target, if present, is always within the current search range [left, right].',
                'proof': [
                    'Base case: Single element is either target or not.',
                    'Inductive step: Each comparison eliminates half of remaining elements.',
                    'Therefore, search space reduces by half each time until target is found or not present.'
                ]
            }
        ],
        'linear': [
            {
                'title': 'Linear Search Algorithm',
                'description': 'Sequentially checks each element in the array until a match is found or the end is reached.',
                'complexity': {
                    'time_best': 'O(1)',
                    'time_average': 'O(n)',
                    'time_worst': 'O(n)',
                    'space': 'O(1)'
                },
                'invariant': 'All elements before current index have been checked and are not equal to target.',
                'proof': [
                    'Base case: First element is either target or not.',
                    'Inductive step: Each element is compared exactly once.',
                    'Therefore, if target exists, it will be found; if not, entire array will be searched.'
                ]
            }
        ],
        'jump': [
            {
                'title': 'Jump Search Algorithm',
                'description': 'Searches for a target in a sorted array by jumping ahead by fixed steps and then performing linear search in a block.',
                'complexity': {
                    'time_best': 'O(1)',
                    'time_average': 'O(√n)',
                    'time_worst': 'O(√n)',
                    'space': 'O(1)'
                },
                'invariant': 'Target, if present, is always within the current block.',
                'proof': [
                    'Jump ahead by √n until block containing target is found.',
                    'Linear search within block ensures target is found if present.'
                ]
            }
        ],
        'exponential': [
            {
                'title': 'Exponential Search Algorithm',
                'description': 'Finds range where target may exist by repeated doubling, then uses binary search in that range.',
                'complexity': {
                    'time_best': 'O(1)',
                    'time_average': 'O(log i)',
                    'time_worst': 'O(log i)',
                    'space': 'O(1)'
                },
                'invariant': 'Target, if present, is always within the current search range.',
                'proof': [
                    'Double the bound until target is within range.',
                    'Binary search in the found range ensures correctness.'
                ]
            }
        ]
    }
    return theoretical_steps.get(algorithm, []) or []

def binary_search(arr, target):
    """
    Implementation of binary search with step tracking for visualization.
    Returns a list of steps, where each step contains:
    - current array state
    - indices being compared/searched
    - search range
    - explanation of the current step
    - statistics
    """
    steps = []
    comparisons = 0
    left = 0
    right = len(arr) - 1
    searched = set()  # Track searched elements
    
    # Add theoretical steps
    steps.extend(get_theoretical_steps('binary'))
    
    # Initial state
    steps.append({
        'array': arr.copy(),
        'highlights': {
            'comparing': [],
            'range': [left, right],
            'searched': list(searched),
            'found': None
        },
        'explanation': f"Starting binary search for target {target} in sorted array",
        'stats': {
            'comparisons': comparisons,
            'timeComplexity': 'O(log n)',
            'spaceComplexity': 'O(1)'
        }
    })
    
    while left <= right:
        mid = (left + right) // 2
        
        # Record step before comparison
        steps.append({
            'array': arr.copy(),
            'highlights': {
                'comparing': [mid],
                'range': [left, right],
                'searched': list(searched),
                'found': None
            },
            'explanation': f"Comparing middle element {arr[mid]} at index {mid} with target {target}",
            'stats': {
                'comparisons': comparisons,
                'timeComplexity': 'O(log n)',
                'spaceComplexity': 'O(1)'
            }
        })
        
        comparisons += 1
        searched.add(mid)
        
        if arr[mid] == target:
            steps.append({
                'array': arr.copy(),
                'highlights': {
                    'comparing': [],
                    'range': [left, right],
                    'searched': list(searched),
                    'found': mid
                },
                'explanation': f"Found target {target} at index {mid}!",
                'stats': {
                    'comparisons': comparisons,
                    'timeComplexity': 'O(log n)',
                    'spaceComplexity': 'O(1)'
                }
            })
            return steps
        
        elif arr[mid] < target:
            left = mid + 1
            steps.append({
                'array': arr.copy(),
                'highlights': {
                    'comparing': [],
                    'range': [left, right],
                    'searched': list(searched),
                    'found': None
                },
                'explanation': f"Target {target} is greater than {arr[mid]}, searching right half [indices {left} to {right}]",
                'stats': {
                    'comparisons': comparisons,
                    'timeComplexity': 'O(log n)',
                    'spaceComplexity': 'O(1)'
                }
            })
        else:
            right = mid - 1
            steps.append({
                'array': arr.copy(),
                'highlights': {
                    'comparing': [],
                    'range': [left, right],
                    'searched': list(searched),
                    'found': None
                },
                'explanation': f"Target {target} is less than {arr[mid]}, searching left half [indices {left} to {right}]",
                'stats': {
                    'comparisons': comparisons,
                    'timeComplexity': 'O(log n)',
                    'spaceComplexity': 'O(1)'
                }
            })
    
    steps.append({
        'array': arr.copy(),
        'highlights': {
            'comparing': [],
            'range': [],
            'searched': list(searched),
            'found': None
        },
        'explanation': f"Target {target} not found in array",
        'stats': {
            'comparisons': comparisons,
            'timeComplexity': 'O(log n)',
            'spaceComplexity': 'O(1)'
        }
    })
    
    return steps

def linear_search(arr, target):
    """
    Implementation of linear search with step tracking for visualization.
    Returns a list of steps, where each step contains:
    - current array state
    - indices being compared
    - searched elements
    - explanation of the current step
    - statistics
    """
    steps = []
    comparisons = 0
    searched = set()  # Track searched elements
    
    # Add theoretical steps
    steps.extend(get_theoretical_steps('linear'))
    
    # Initial state
    steps.append({
        'array': arr.copy(),
        'highlights': {
            'comparing': [],
            'searched': list(searched),
            'found': None
        },
        'explanation': f"Starting linear search for target {target}",
        'stats': {
            'comparisons': comparisons,
            'timeComplexity': 'O(n)',
            'spaceComplexity': 'O(1)'
        }
    })
    
    for i in range(len(arr)):
        # Record step before comparison
        steps.append({
            'array': arr.copy(),
            'highlights': {
                'comparing': [i],
                'searched': list(searched),
                'found': None
            },
            'explanation': f"Checking element {arr[i]} at index {i}",
            'stats': {
                'comparisons': comparisons,
                'timeComplexity': 'O(n)',
                'spaceComplexity': 'O(1)'
            }
        })
        
        comparisons += 1
        searched.add(i)
        
        if arr[i] == target:
            steps.append({
                'array': arr.copy(),
                'highlights': {
                    'comparing': [],
                    'searched': list(searched),
                    'found': i
                },
                'explanation': f"Found target {target} at index {i}!",
                'stats': {
                    'comparisons': comparisons,
                    'timeComplexity': 'O(n)',
                    'spaceComplexity': 'O(1)'
                }
            })
            return steps
        
        # Show that current element is not the target
        steps.append({
            'array': arr.copy(),
            'highlights': {
                'comparing': [],
                'searched': list(searched),
                'found': None
            },
            'explanation': f"Element {arr[i]} is not the target, continuing search",
            'stats': {
                'comparisons': comparisons,
                'timeComplexity': 'O(n)',
                'spaceComplexity': 'O(1)'
            }
        })
    
    steps.append({
        'array': arr.copy(),
        'highlights': {
            'comparing': [],
            'searched': list(searched),
            'found': None
        },
        'explanation': f"Target {target} not found after checking all elements",
        'stats': {
            'comparisons': comparisons,
            'timeComplexity': 'O(n)',
            'spaceComplexity': 'O(1)'
        }
    })
    
    return steps

def jump_search(arr, target):
    steps = []
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    comparisons = 0
    steps.extend(get_theoretical_steps('jump'))
    steps.append({
        'array': arr.copy(),
        'highlights': {'comparing': [], 'block': [0, min(step, n)-1], 'found': None},
        'explanation': f"Starting jump search for {target} with block size {step}",
        'stats': {'comparisons': comparisons, 'timeComplexity': 'O(√n)', 'spaceComplexity': 'O(1)'}
    })
    while prev < n and arr[min(step, n)-1] < target:
        comparisons += 1
        steps.append({
            'array': arr.copy(),
            'highlights': {'comparing': [min(step, n)-1], 'block': [prev, min(step, n)-1], 'found': None},
            'explanation': f"Block [{prev}, {min(step, n)-1}] does not contain {target}, jumping ahead.",
            'stats': {'comparisons': comparisons, 'timeComplexity': 'O(√n)', 'spaceComplexity': 'O(1)'}
        })
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            steps.append({
                'array': arr.copy(),
                'highlights': {'comparing': [], 'block': [], 'found': None},
                'explanation': f"{target} not found in array.",
                'stats': {'comparisons': comparisons, 'timeComplexity': 'O(√n)', 'spaceComplexity': 'O(1)'}
            })
            return steps
    for i in range(prev, min(step, n)):
        comparisons += 1
        steps.append({
            'array': arr.copy(),
            'highlights': {'comparing': [i], 'block': [prev, min(step, n)-1], 'found': None},
            'explanation': f"Checking index {i} for {target}.",
            'stats': {'comparisons': comparisons, 'timeComplexity': 'O(√n)', 'spaceComplexity': 'O(1)'}
        })
        if arr[i] == target:
            steps.append({
                'array': arr.copy(),
                'highlights': {'comparing': [], 'block': [prev, min(step, n)-1], 'found': i},
                'explanation': f"Found {target} at index {i}.",
                'stats': {'comparisons': comparisons, 'timeComplexity': 'O(√n)', 'spaceComplexity': 'O(1)'}
            })
            return steps
    steps.append({
        'array': arr.copy(),
        'highlights': {'comparing': [], 'block': [prev, min(step, n)-1], 'found': None},
        'explanation': f"{target} not found in array.",
        'stats': {'comparisons': comparisons, 'timeComplexity': 'O(√n)', 'spaceComplexity': 'O(1)'}
    })
    return steps

def exponential_search(arr, target):
    steps = []
    n = len(arr)
    if n == 0:
        return []
    comparisons = 0
    bound = 1
    steps.extend(get_theoretical_steps('exponential'))
    steps.append({
        'array': arr.copy(),
        'highlights': {'comparing': [0], 'bound': [0, 0], 'found': None},
        'explanation': f"Starting exponential search for {target}.",
        'stats': {'comparisons': comparisons, 'timeComplexity': 'O(log i)', 'spaceComplexity': 'O(1)'}
    })
    if arr[0] == target:
        steps.append({
            'array': arr.copy(),
            'highlights': {'comparing': [0], 'bound': [0, 0], 'found': 0},
            'explanation': f"Found {target} at index 0.",
            'stats': {'comparisons': 1, 'timeComplexity': 'O(1)', 'spaceComplexity': 'O(1)'}
        })
        return steps
    while bound < n and arr[bound] < target:
        comparisons += 1
        steps.append({
            'array': arr.copy(),
            'highlights': {'comparing': [bound], 'bound': [bound//2, min(bound, n-1)], 'found': None},
            'explanation': f"Value at index {bound} is less than {target}, increasing bound.",
            'stats': {'comparisons': comparisons, 'timeComplexity': 'O(log i)', 'spaceComplexity': 'O(1)'}
        })
        bound *= 2
    left = bound // 2
    right = min(bound, n-1)
    while left <= right:
        mid = (left + right) // 2
        comparisons += 1
        steps.append({
            'array': arr.copy(),
            'highlights': {'comparing': [mid], 'bound': [left, right], 'found': None},
            'explanation': f"Binary search: comparing index {mid} for {target}.",
            'stats': {'comparisons': comparisons, 'timeComplexity': 'O(log i)', 'spaceComplexity': 'O(1)'}
        })
        if arr[mid] == target:
            steps.append({
                'array': arr.copy(),
                'highlights': {'comparing': [], 'bound': [left, right], 'found': mid},
                'explanation': f"Found {target} at index {mid}.",
                'stats': {'comparisons': comparisons, 'timeComplexity': 'O(log i)', 'spaceComplexity': 'O(1)'}
            })
            return steps
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    steps.append({
        'array': arr.copy(),
        'highlights': {'comparing': [], 'bound': [left, right], 'found': None},
        'explanation': f"{target} not found in array.",
        'stats': {'comparisons': comparisons, 'timeComplexity': 'O(log i)', 'spaceComplexity': 'O(1)'}
    })
    return steps 