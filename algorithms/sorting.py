def get_theoretical_steps(algorithm):
    """
    Returns theoretical explanation steps for each algorithm,
    similar to CLRS textbook style.
    """
    theoretical_steps = {
        'bubble': [
            {
                'title': 'Bubble Sort Algorithm',
                'description': 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
                'complexity': {
                    'time_best': 'O(n)',
                    'time_average': 'O(n²)',
                    'time_worst': 'O(n²)',
                    'space': 'O(1)'
                },
                'invariant': 'After i passes, the last i elements are sorted.',
                'proof': [
                    'Base case: After first pass, largest element is at the end.',
                    'Inductive step: After k passes, k largest elements are at the end.',
                    'Therefore, after n-1 passes, array is sorted.'
                ]
            }
        ],
        'quick': [
            {
                'title': 'Quicksort Algorithm',
                'description': 'Uses divide-and-conquer strategy by selecting a pivot element and partitioning the array around it.',
                'complexity': {
                    'time_best': 'O(n log n)',
                    'time_average': 'O(n log n)',
                    'time_worst': 'O(n²)',
                    'space': 'O(log n)'
                },
                'invariant': 'After partitioning, all elements ≤ pivot are before it, all elements > pivot are after it.',
                'proof': [
                    'Base case: Arrays of size 0 or 1 are sorted.',
                    'Inductive step: Partition ensures elements are correctly placed relative to pivot.',
                    'Recursive calls sort subarrays, maintaining the invariant.'
                ]
            }
        ],
        'merge': [
            {
                'title': 'Merge Sort Algorithm',
                'description': 'Divides array into two halves, recursively sorts them, and then merges the sorted halves.',
                'complexity': {
                    'time_best': 'O(n log n)',
                    'time_average': 'O(n log n)',
                    'time_worst': 'O(n log n)',
                    'space': 'O(n)'
                },
                'invariant': 'Each merged subarray is sorted.',
                'proof': [
                    'Base case: Single element is sorted.',
                    'Inductive step: Merge of two sorted arrays produces a sorted array.',
                    'Therefore, final merge produces a fully sorted array.'
                ]
            }
        ],
        'selection': [
            {
                'title': 'Selection Sort Algorithm',
                'description': 'Divides array into sorted and unsorted regions, repeatedly selects smallest element from unsorted region.',
                'complexity': {
                    'time_best': 'O(n²)',
                    'time_average': 'O(n²)',
                    'time_worst': 'O(n²)',
                    'space': 'O(1)'
                },
                'invariant': 'Elements before current position are sorted and ≤ all elements after.',
                'proof': [
                    'Base case: First element forms sorted subarray of size 1.',
                    'Inductive step: Adding minimum of remaining elements maintains sortedness.',
                    'After n iterations, entire array is sorted.'
                ]
            }
        ],
        'insertion': [
            {
                'title': 'Insertion Sort Algorithm',
                'description': 'Builds sorted array one element at a time by repeatedly inserting a new element into the sorted portion.',
                'complexity': {
                    'time_best': 'O(n)',
                    'time_average': 'O(n²)',
                    'time_worst': 'O(n²)',
                    'space': 'O(1)'
                },
                'invariant': 'Elements before current position are sorted.',
                'proof': [
                    'Base case: Single element is sorted.',
                    'Inductive step: Inserting new element in correct position maintains sortedness.',
                    'After n iterations, all elements are in sorted positions.'
                ]
            }
        ],
        'heap': [
            {
                'title': 'Heap Sort Algorithm',
                'description': 'Builds max heap from array, repeatedly extracts maximum element to sort array.',
                'complexity': {
                    'time_best': 'O(n log n)',
                    'time_average': 'O(n log n)',
                    'time_worst': 'O(n log n)',
                    'space': 'O(1)'
                },
                'invariant': 'Max heap property: parent ≥ children.',
                'proof': [
                    'Base case: Leaf nodes satisfy heap property.',
                    'Inductive step: Heapify maintains heap property for all subtrees.',
                    'Extracting max maintains sorted suffix of array.'
                ]
            }
        ]
    }
    return theoretical_steps.get(algorithm, [])

def bubble_sort(arr):
    """
    Implementation of bubble sort with step tracking for visualization.
    Returns a list of steps, where each step contains:
    - current array state
    - indices being compared/swapped
    - sorted elements
    - explanation of the current step
    - statistics
    """
    steps = []
    n = len(arr)
    comparisons = 0
    swaps = 0
    sorted_elements = set()  # Track sorted elements
    
    # Add theoretical steps
    steps.extend(get_theoretical_steps('bubble'))
    
    # Initial state
    steps.append({
        'array': arr.copy(),
        'highlights': {
            'comparing': [],
            'swapping': [],
            'sorted': list(sorted_elements)
        },
        'explanation': "Initial array state",
        'stats': {
            'comparisons': comparisons,
            'swaps': swaps,
            'timeComplexity': 'O(n²)',
            'spaceComplexity': 'O(1)'
        }
    })
    
    for i in range(n):
        # Add elements that are guaranteed to be sorted
        if i > 0:
            sorted_elements.add(n - i)
        
        for j in range(0, n - i - 1):
            # Record step before comparison
            steps.append({
                'array': arr.copy(),
                'highlights': {
                    'comparing': [j, j + 1],
                    'swapping': [],
                    'sorted': list(sorted_elements)
                },
                'explanation': f"Comparing elements {arr[j]} and {arr[j + 1]} at positions {j} and {j + 1}",
                'stats': {
                    'comparisons': comparisons,
                    'swaps': swaps,
                    'timeComplexity': 'O(n²)',
                    'spaceComplexity': 'O(1)'
                }
            })
            
            comparisons += 1
            if arr[j] > arr[j + 1]:
                # Record step before swap
                steps.append({
                    'array': arr.copy(),
                    'highlights': {
                        'comparing': [],
                        'swapping': [j, j + 1],
                        'sorted': list(sorted_elements)
                    },
                    'explanation': f"Swapping {arr[j]} and {arr[j + 1]} since {arr[j]} > {arr[j + 1]}",
                    'stats': {
                        'comparisons': comparisons,
                        'swaps': swaps,
                        'timeComplexity': 'O(n²)',
                        'spaceComplexity': 'O(1)'
                    }
                })
                
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swaps += 1
                
                # Show state after swap
                steps.append({
                    'array': arr.copy(),
                    'highlights': {
                        'comparing': [],
                        'swapping': [],
                        'sorted': list(sorted_elements)
                    },
                    'explanation': f"After swapping: {arr[j]} and {arr[j + 1]} are now in correct order",
                    'stats': {
                        'comparisons': comparisons,
                        'swaps': swaps,
                        'timeComplexity': 'O(n²)',
                        'spaceComplexity': 'O(1)'
                    }
                })
        
        # After each pass, show which elements are now sorted
        if i < n - 1:
            steps.append({
                'array': arr.copy(),
                'highlights': {
                    'comparing': [],
                    'swapping': [],
                    'sorted': list(sorted_elements)
                },
                'explanation': f"Pass {i + 1} complete: elements from position {n - i - 1} to {n - 1} are now sorted",
                'stats': {
                    'comparisons': comparisons,
                    'swaps': swaps,
                    'timeComplexity': 'O(n²)',
                    'spaceComplexity': 'O(1)'
                }
            })
    
    # Add the first element to sorted set for final state
    sorted_elements.add(0)
    
    # Record final state
    steps.append({
        'array': arr.copy(),
        'highlights': {
            'comparing': [],
            'swapping': [],
            'sorted': list(sorted_elements)
        },
        'explanation': "Array is now fully sorted",
        'stats': {
            'comparisons': comparisons,
            'swaps': swaps,
            'timeComplexity': 'O(n²)',
            'spaceComplexity': 'O(1)'
        }
    })
    
    return steps

def quick_sort(arr):
    """
    Implementation of quick sort with step tracking for visualization.
    """
    steps = []
    # Add theoretical steps
    steps.extend(get_theoretical_steps('quick'))
    comparisons = [0]  # Using list to allow modification in nested function
    swaps = [0]
    
    def partition(low, high):
        pivot = arr[high]
        i = low - 1
        
        steps.append({
            'array': arr.copy(),
            'pivot': high,
            'explanation': f"Choosing pivot element: {pivot}",
            'stats': {
                'comparisons': comparisons[0],
                'swaps': swaps[0],
                'timeComplexity': 'O(n log n)',
                'spaceComplexity': 'O(log n)'
            }
        })
        
        for j in range(low, high):
            steps.append({
                'array': arr.copy(),
                'comparing': [j, high],
                'explanation': f"Comparing element {arr[j]} with pivot {pivot}",
                'stats': {
                    'comparisons': comparisons[0],
                    'swaps': swaps[0],
                    'timeComplexity': 'O(n log n)',
                    'spaceComplexity': 'O(log n)'
                }
            })
            
            comparisons[0] += 1
            if arr[j] <= pivot:
                i += 1
                steps.append({
                    'array': arr.copy(),
                    'swapping': [i, j],
                    'explanation': f"Swapping {arr[i]} and {arr[j]}",
                    'stats': {
                        'comparisons': comparisons[0],
                        'swaps': swaps[0],
                        'timeComplexity': 'O(n log n)',
                        'spaceComplexity': 'O(log n)'
                    }
                })
                
                arr[i], arr[j] = arr[j], arr[i]
                swaps[0] += 1
        
        steps.append({
            'array': arr.copy(),
            'swapping': [i + 1, high],
            'explanation': f"Placing pivot {pivot} in its correct position",
            'stats': {
                'comparisons': comparisons[0],
                'swaps': swaps[0],
                'timeComplexity': 'O(n log n)',
                'spaceComplexity': 'O(log n)'
            }
        })
        
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        swaps[0] += 1
        return i + 1
    
    def quick_sort_helper(low, high):
        if low < high:
            pi = partition(low, high)
            quick_sort_helper(low, pi - 1)
            quick_sort_helper(pi + 1, high)
    
    quick_sort_helper(0, len(arr) - 1)
    
    # Record final state
    steps.append({
        'array': arr.copy(),
        'comparing': [],
        'explanation': "Array is sorted",
        'stats': {
            'comparisons': comparisons[0],
            'swaps': swaps[0],
            'timeComplexity': 'O(n log n)',
            'spaceComplexity': 'O(log n)'
        }
    })
    
    return steps

def merge_sort(arr):
    """
    Implementation of merge sort with step tracking for visualization.
    """
    steps = []
    # Add theoretical steps
    steps.extend(get_theoretical_steps('merge'))
    comparisons = [0]
    swaps = [0]
    
    def merge(left, right, start_idx):
        result = []
        i = j = 0
        
        while i < len(left) and j < len(right):
            steps.append({
                'array': arr.copy(),
                'comparing': [start_idx + i, start_idx + len(left) + j],
                'explanation': f"Comparing {left[i]} and {right[j]}",
                'stats': {
                    'comparisons': comparisons[0],
                    'swaps': swaps[0],
                    'timeComplexity': 'O(n log n)',
                    'spaceComplexity': 'O(n)'
                }
            })
            
            comparisons[0] += 1
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
                swaps[0] += 1
        
        result.extend(left[i:])
        result.extend(right[j:])
        
        # Update array with merged result
        for k in range(len(result)):
            arr[start_idx + k] = result[k]
            steps.append({
                'array': arr.copy(),
                'updating': [start_idx + k],
                'explanation': f"Updating position {start_idx + k} with value {result[k]}",
                'stats': {
                    'comparisons': comparisons[0],
                    'swaps': swaps[0],
                    'timeComplexity': 'O(n log n)',
                    'spaceComplexity': 'O(n)'
                }
            })
    
    def merge_sort_helper(start_idx, end_idx):
        if end_idx - start_idx <= 1:
            return
        
        mid = (start_idx + end_idx) // 2
        steps.append({
            'array': arr.copy(),
            'dividing': [start_idx, mid, end_idx],
            'explanation': f"Dividing array into two halves at index {mid}",
            'stats': {
                'comparisons': comparisons[0],
                'swaps': swaps[0],
                'timeComplexity': 'O(n log n)',
                'spaceComplexity': 'O(n)'
            }
        })
        
        # Sort left and right halves
        merge_sort_helper(start_idx, mid)
        merge_sort_helper(mid, end_idx)
        
        # Merge the sorted halves
        left = arr[start_idx:mid]
        right = arr[mid:end_idx]
        merge(left, right, start_idx)
    
    merge_sort_helper(0, len(arr))
    
    # Record final state
    steps.append({
        'array': arr.copy(),
        'comparing': [],
        'explanation': "Array is sorted",
        'stats': {
            'comparisons': comparisons[0],
            'swaps': swaps[0],
            'timeComplexity': 'O(n log n)',
            'spaceComplexity': 'O(n)'
        }
    })
    
    return steps

def selection_sort(arr):
    """Implementation of selection sort with step tracking."""
    steps = []
    # Add theoretical steps
    steps.extend(get_theoretical_steps('selection'))
    n = len(arr)
    comparisons = 0
    swaps = 0
    
    for i in range(n):
        min_idx = i
        steps.append({
            'array': arr.copy(),
            'current': i,
            'explanation': f"Finding minimum element starting from position {i}",
            'stats': {
                'comparisons': comparisons,
                'swaps': swaps,
                'timeComplexity': 'O(n²)',
                'spaceComplexity': 'O(1)'
            }
        })
        
        for j in range(i + 1, n):
            steps.append({
                'array': arr.copy(),
                'comparing': [min_idx, j],
                'explanation': f"Comparing {arr[min_idx]} with {arr[j]}",
                'stats': {
                    'comparisons': comparisons,
                    'swaps': swaps,
                    'timeComplexity': 'O(n²)',
                    'spaceComplexity': 'O(1)'
                }
            })
            
            comparisons += 1
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        if min_idx != i:
            steps.append({
                'array': arr.copy(),
                'swapping': [i, min_idx],
                'explanation': f"Swapping {arr[i]} with {arr[min_idx]}",
                'stats': {
                    'comparisons': comparisons,
                    'swaps': swaps,
                    'timeComplexity': 'O(n²)',
                    'spaceComplexity': 'O(1)'
                }
            })
            
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            swaps += 1
    
    steps.append({
        'array': arr.copy(),
        'explanation': "Array is sorted",
        'stats': {
            'comparisons': comparisons,
            'swaps': swaps,
            'timeComplexity': 'O(n²)',
            'spaceComplexity': 'O(1)'
        }
    })
    
    return steps

def insertion_sort(arr):
    """Implementation of insertion sort with step tracking."""
    steps = []
    # Add theoretical steps
    steps.extend(get_theoretical_steps('insertion'))
    n = len(arr)
    comparisons = 0
    swaps = 0
    
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        
        steps.append({
            'array': arr.copy(),
            'current': i,
            'explanation': f"Inserting element {key} into sorted portion",
            'stats': {
                'comparisons': comparisons,
                'swaps': swaps,
                'timeComplexity': 'O(n²)',
                'spaceComplexity': 'O(1)'
            }
        })
        
        while j >= 0:
            steps.append({
                'array': arr.copy(),
                'comparing': [j, j + 1],
                'explanation': f"Comparing {arr[j]} with {key}",
                'stats': {
                    'comparisons': comparisons,
                    'swaps': swaps,
                    'timeComplexity': 'O(n²)',
                    'spaceComplexity': 'O(1)'
                }
            })
            
            comparisons += 1
            if arr[j] > key:
                steps.append({
                    'array': arr.copy(),
                    'swapping': [j, j + 1],
                    'explanation': f"Moving {arr[j]} one position ahead",
                    'stats': {
                        'comparisons': comparisons,
                        'swaps': swaps,
                        'timeComplexity': 'O(n²)',
                        'spaceComplexity': 'O(1)'
                    }
                })
                
                arr[j + 1] = arr[j]
                swaps += 1
                j -= 1
            else:
                break
        
        arr[j + 1] = key
    
    steps.append({
        'array': arr.copy(),
        'explanation': "Array is sorted",
        'stats': {
            'comparisons': comparisons,
            'swaps': swaps,
            'timeComplexity': 'O(n²)',
            'spaceComplexity': 'O(1)'
        }
    })
    
    return steps

def heap_sort(arr):
    """Implementation of heap sort with step tracking."""
    steps = []
    # Add theoretical steps
    steps.extend(get_theoretical_steps('heap'))
    comparisons = [0]
    swaps = [0]
    
    def heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        steps.append({
            'array': arr.copy(),
            'current': i,
            'explanation': f"Heapifying subtree rooted at index {i}",
            'stats': {
                'comparisons': comparisons[0],
                'swaps': swaps[0],
                'timeComplexity': 'O(n log n)',
                'spaceComplexity': 'O(1)'
            }
        })
        
        if left < n:
            steps.append({
                'array': arr.copy(),
                'comparing': [largest, left],
                'explanation': f"Comparing {arr[largest]} with left child {arr[left]}",
                'stats': {
                    'comparisons': comparisons[0],
                    'swaps': swaps[0],
                    'timeComplexity': 'O(n log n)',
                    'spaceComplexity': 'O(1)'
                }
            })
            
            comparisons[0] += 1
            if arr[left] > arr[largest]:
                largest = left
        
        if right < n:
            steps.append({
                'array': arr.copy(),
                'comparing': [largest, right],
                'explanation': f"Comparing {arr[largest]} with right child {arr[right]}",
                'stats': {
                    'comparisons': comparisons[0],
                    'swaps': swaps[0],
                    'timeComplexity': 'O(n log n)',
                    'spaceComplexity': 'O(1)'
                }
            })
            
            comparisons[0] += 1
            if arr[right] > arr[largest]:
                largest = right
        
        if largest != i:
            steps.append({
                'array': arr.copy(),
                'swapping': [i, largest],
                'explanation': f"Swapping {arr[i]} with {arr[largest]}",
                'stats': {
                    'comparisons': comparisons[0],
                    'swaps': swaps[0],
                    'timeComplexity': 'O(n log n)',
                    'spaceComplexity': 'O(1)'
                }
            })
            
            arr[i], arr[largest] = arr[largest], arr[i]
            swaps[0] += 1
            heapify(n, largest)
    
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)
    
    # Extract elements from heap
    for i in range(n - 1, 0, -1):
        steps.append({
            'array': arr.copy(),
            'swapping': [0, i],
            'explanation': f"Moving root {arr[0]} to end",
            'stats': {
                'comparisons': comparisons[0],
                'swaps': swaps[0],
                'timeComplexity': 'O(n log n)',
                'spaceComplexity': 'O(1)'
            }
        })
        
        arr[0], arr[i] = arr[i], arr[0]
        swaps[0] += 1
        heapify(i, 0)
    
    steps.append({
        'array': arr.copy(),
        'explanation': "Array is sorted",
        'stats': {
            'comparisons': comparisons[0],
            'swaps': swaps[0],
            'timeComplexity': 'O(n log n)',
            'spaceComplexity': 'O(1)'
        }
    })
    
    return steps 