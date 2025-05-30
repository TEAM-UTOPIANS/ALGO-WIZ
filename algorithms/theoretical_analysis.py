def get_sorting_theory():
    """
    Returns a comprehensive theoretical analysis for all sorting algorithms.
    Each algorithm includes:
    - Description and key characteristics
    - Time and space complexity analysis
    - Loop invariants and proof of correctness
    - Best/worst case scenarios
    - Stability analysis
    - Real-world applications
    """
    return {
        'bubble': {
            'title': 'Bubble Sort Algorithm',
            'description': 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
            'characteristics': [
                'In-place sorting algorithm',
                'Stable sorting algorithm',
                'Adaptive: becomes faster when array is nearly sorted',
                'Simple implementation but inefficient for large datasets'
            ],
            'complexity': {
                'time_best': 'O(n)',
                'time_average': 'O(n²)',
                'time_worst': 'O(n²)',
                'space': 'O(1)'
            },
            'invariant': 'After i passes, the last i elements are in their final sorted positions.',
            'proof': [
                'Base case: After first pass, largest element is at the end.',
                'Inductive step: After k passes, k largest elements are at the end.',
                'After n-1 passes, all elements are in sorted order.',
                'Each pass ensures at least one element reaches its final position.'
            ],
            'best_case': 'Array is already sorted',
            'worst_case': 'Array is sorted in reverse order',
            'stability': 'Stable - maintains relative order of equal elements',
            'applications': [
                'Educational purposes',
                'Small datasets',
                'When simplicity is preferred over efficiency',
                'When memory is extremely limited'
            ]
        },
        'quick': {
            'title': 'Quicksort Algorithm',
            'description': 'A highly efficient, comparison-based sorting algorithm that uses divide-and-conquer strategy. It works by selecting a pivot element and partitioning the array around it.',
            'characteristics': [
                'In-place sorting algorithm',
                'Not stable in typical implementations',
                'Highly efficient for random data',
                'Good cache performance'
            ],
            'complexity': {
                'time_best': 'O(n log n)',
                'time_average': 'O(n log n)',
                'time_worst': 'O(n²)',
                'space': 'O(log n)'
            },
            'invariant': 'After each partition, all elements ≤ pivot are before it, all elements > pivot are after it.',
            'proof': [
                'Base case: Arrays of size 0 or 1 are sorted.',
                'Partition ensures elements are correctly placed relative to pivot.',
                'Recursive calls sort subarrays independently.',
                'Combining sorted subarrays produces a fully sorted array.'
            ],
            'best_case': 'Pivot consistently divides array into equal halves',
            'worst_case': 'Array is sorted or reverse sorted (with basic pivot selection)',
            'stability': 'Not stable in standard implementation',
            'applications': [
                'General-purpose sorting',
                'Large datasets',
                'Systems with good cache performance',
                'Standard library implementation in many languages'
            ]
        },
        'merge': {
            'title': 'Merge Sort Algorithm',
            'description': 'A stable, comparison-based sorting algorithm that uses divide-and-conquer strategy. It divides the array into smaller subarrays, sorts them, and then merges them back together.',
            'characteristics': [
                'Divide-and-conquer algorithm',
                'Stable sorting',
                'Predictable performance',
                'Not in-place (requires extra space)'
            ],
            'complexity': {
                'time_best': 'O(n log n)',
                'time_average': 'O(n log n)',
                'time_worst': 'O(n log n)',
                'space': 'O(n)'
            },
            'invariant': 'Each merged subarray is sorted.',
            'proof': [
                'Base case: Single element is sorted.',
                'Merge combines two sorted arrays while maintaining order.',
                'Each merge step preserves sortedness.',
                'Final merge produces a fully sorted array.'
            ],
            'best_case': 'Any input (consistent performance)',
            'worst_case': 'Any input (consistent performance)',
            'stability': 'Stable - maintains relative order of equal elements',
            'applications': [
                'External sorting',
                'Linked list sorting',
                'When stable sorting is required',
                'Parallel processing applications'
            ]
        },
        'selection': {
            'title': 'Selection Sort Algorithm',
            'description': 'A simple comparison-based sorting algorithm that divides the input into a sorted and unsorted region and repeatedly selects the smallest element from the unsorted region.',
            'characteristics': [
                'In-place sorting algorithm',
                'Simple implementation',
                'Minimal memory usage',
                'Performs well on small arrays'
            ],
            'complexity': {
                'time_best': 'O(n²)',
                'time_average': 'O(n²)',
                'time_worst': 'O(n²)',
                'space': 'O(1)'
            },
            'invariant': 'Elements before current position are sorted and ≤ all elements after.',
            'proof': [
                'Base case: First element forms sorted subarray of size 1.',
                'Each iteration selects minimum from unsorted portion.',
                'Selected minimum is placed in correct position.',
                'After n iterations, all elements are sorted.'
            ],
            'best_case': 'Any input (consistent performance)',
            'worst_case': 'Any input (consistent performance)',
            'stability': 'Not stable in standard implementation',
            'applications': [
                'Small datasets',
                'When memory is extremely limited',
                'When number of writes needs to be minimized',
                'Educational purposes'
            ]
        },
        'insertion': {
            'title': 'Insertion Sort Algorithm',
            'description': 'A simple, stable sorting algorithm that builds the final sorted array one element at a time by repeatedly inserting a new element into the sorted portion of the array.',
            'characteristics': [
                'In-place sorting algorithm',
                'Stable sorting',
                'Adaptive algorithm',
                'Excellent for small datasets'
            ],
            'complexity': {
                'time_best': 'O(n)',
                'time_average': 'O(n²)',
                'time_worst': 'O(n²)',
                'space': 'O(1)'
            },
            'invariant': 'Elements before current position are always sorted.',
            'proof': [
                'Base case: Single element is sorted.',
                'Each iteration inserts new element into correct position.',
                'Sorted portion maintains order after each insertion.',
                'After n iterations, all elements are in sorted positions.'
            ],
            'best_case': 'Array is already sorted',
            'worst_case': 'Array is sorted in reverse order',
            'stability': 'Stable - maintains relative order of equal elements',
            'applications': [
                'Small datasets',
                'Nearly sorted arrays',
                'Online sorting (streaming data)',
                'When simplicity is preferred'
            ]
        },
        'heap': {
            'title': 'Heap Sort Algorithm',
            'description': 'A comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max-heap and then repeatedly extracts the maximum element to sort the array.',
            'characteristics': [
                'In-place sorting algorithm',
                'Not stable',
                'Based on heap data structure',
                'Guaranteed O(n log n) performance'
            ],
            'complexity': {
                'time_best': 'O(n log n)',
                'time_average': 'O(n log n)',
                'time_worst': 'O(n log n)',
                'space': 'O(1)'
            },
            'invariant': 'Max heap property: parent ≥ children.',
            'proof': [
                'Base case: Leaf nodes satisfy heap property.',
                'Heapify maintains heap property for all subtrees.',
                'Extracting max maintains sorted suffix.',
                'After n extractions, array is fully sorted.'
            ],
            'best_case': 'Any input (consistent performance)',
            'worst_case': 'Any input (consistent performance)',
            'stability': 'Not stable',
            'applications': [
                'When guaranteed O(n log n) is needed',
                'Priority queue implementations',
                'Systems with limited memory',
                'Real-time systems requiring predictable performance'
            ]
        }
    } 