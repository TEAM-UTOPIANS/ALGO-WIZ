class Node:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None  # For doubly linked list


def visualize_linkedlist(algorithm, data_list, operation, target=None, index=None):
    # Map new granular operation names to old logic
    op = operation
    if operation in ['insert_head', 'insert_end', 'insert_pos']:
        op = 'insert'
        if operation == 'insert_head':
            index = 0
        elif operation == 'insert_end':
            index = len(data_list)
        # insert_pos uses the provided index
    elif operation in ['delete_head', 'delete_end', 'delete_pos']:
        op = 'delete'
        if operation == 'delete_head':
            index = 0
        elif operation == 'delete_end':
            index = len(data_list) - 1
        # delete_pos uses the provided index
    else:
        op = operation
    if algorithm == 'singly':
        steps = singly_linked_list_steps(data_list, op, target, index)
    elif algorithm == 'doubly':
        steps = doubly_linked_list_steps(data_list, op, target, index)
    elif algorithm == 'circular':
        steps = circular_linked_list_steps(data_list, op, target, index)
    else:
        return {'error': 'Invalid linked list type'}
    return {'steps': steps, 'inputList': data_list, 'algorithm': algorithm, 'operation': operation}


def singly_linked_list_steps(data_list, operation, target, index):
    steps = []
    nodes = [Node(v) for v in data_list]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    head = nodes[0] if nodes else None
    # Traverse
    if operation == 'traverse':
        curr = head
        idx = 0
        highlights = {'current': None}
        while curr:
            highlights = {'current': idx}
            steps.append({
                'list': [n.value for n in nodes],
                'highlights': highlights,
                'explanation': f'Traversing node at index {idx} (value: {curr.value})'
            })
            curr = curr.next
            idx += 1
    # Insert
    elif operation == 'insert' and target is not None and index is not None:
        idx = 0
        highlights = {'insert': index}
        new_nodes = [Node(v) for v in data_list]
        for i in range(len(new_nodes) - 1):
            new_nodes[i].next = new_nodes[i + 1]
        # Insert at head
        if index == 0:
            new_head = Node(target)
            new_head.next = new_nodes[0] if new_nodes else None
            new_nodes = [new_head] + new_nodes
        elif 0 < index <= len(new_nodes):
            prev = new_nodes[0]
            for i in range(index - 1):
                prev = prev.next
            new_node = Node(target)
            new_node.next = prev.next
            prev.next = new_node
            new_nodes.insert(index, new_node)
        steps.append({
            'list': [n.value for n in new_nodes],
            'highlights': highlights,
            'explanation': f'Inserted value {target} at index {index}'
        })
    # Delete
    elif operation == 'delete' and index is not None and 0 <= index < len(nodes):
        highlights = {'delete': index}
        del_nodes = [Node(v) for v in data_list]
        for i in range(len(del_nodes) - 1):
            del_nodes[i].next = del_nodes[i + 1]
        if index == 0:
            del_nodes = del_nodes[1:]
        else:
            prev = del_nodes[0]
            for i in range(index - 1):
                prev = prev.next
            prev.next = prev.next.next if prev.next else None
            del del_nodes[index]
        steps.append({
            'list': [n.value for n in del_nodes],
            'highlights': highlights,
            'explanation': f'Deleted node at index {index}'
        })
    else:
        steps.append({'list': [n.value for n in nodes], 'highlights': {}, 'explanation': 'No operation performed'})
    return steps

def doubly_linked_list_steps(data_list, operation, target, index):
    steps = []
    nodes = [Node(v) for v in data_list]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
        nodes[i + 1].prev = nodes[i]
    head = nodes[0] if nodes else None
    # Traverse
    if operation == 'traverse':
        curr = head
        idx = 0
        highlights = {'current': None}
        while curr:
            highlights = {'current': idx}
            steps.append({
                'list': [n.value for n in nodes],
                'highlights': highlights,
                'explanation': f'Traversing node at index {idx} (value: {curr.value})'
            })
            curr = curr.next
            idx += 1
    # Insert
    elif operation == 'insert' and target is not None and index is not None:
        idx = 0
        highlights = {'insert': index}
        new_nodes = [Node(v) for v in data_list]
        for i in range(len(new_nodes) - 1):
            new_nodes[i].next = new_nodes[i + 1]
            new_nodes[i + 1].prev = new_nodes[i]
        # Insert at head
        if index == 0:
            new_head = Node(target)
            new_head.next = new_nodes[0] if new_nodes else None
            if new_nodes:
                new_nodes[0].prev = new_head
            new_nodes = [new_head] + new_nodes
        elif 0 < index <= len(new_nodes):
            prev = new_nodes[0]
            for i in range(index - 1):
                prev = prev.next
            new_node = Node(target)
            new_node.next = prev.next
            new_node.prev = prev
            if prev.next:
                prev.next.prev = new_node
            prev.next = new_node
            new_nodes.insert(index, new_node)
        steps.append({
            'list': [n.value for n in new_nodes],
            'highlights': highlights,
            'explanation': f'Inserted value {target} at index {index}'
        })
    # Delete
    elif operation == 'delete' and index is not None and 0 <= index < len(nodes):
        highlights = {'delete': index}
        del_nodes = [Node(v) for v in data_list]
        for i in range(len(del_nodes) - 1):
            del_nodes[i].next = del_nodes[i + 1]
            del_nodes[i + 1].prev = del_nodes[i]
        if index == 0:
            if len(del_nodes) > 1:
                del_nodes[1].prev = None
            del_nodes = del_nodes[1:]
        else:
            prev = del_nodes[0]
            for i in range(index - 1):
                prev = prev.next
            to_delete = prev.next
            prev.next = to_delete.next
            if to_delete.next:
                to_delete.next.prev = prev
            del del_nodes[index]
        steps.append({
            'list': [n.value for n in del_nodes],
            'highlights': highlights,
            'explanation': f'Deleted node at index {index}'
        })
    else:
        steps.append({'list': [n.value for n in nodes], 'highlights': {}, 'explanation': 'No operation performed'})
    return steps

def circular_linked_list_steps(data_list, operation, target, index):
    steps = []
    nodes = [Node(v) for v in data_list]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if nodes:
        nodes[-1].next = nodes[0]  # Make it circular
    head = nodes[0] if nodes else None
    # Traverse (limit to one full cycle)
    if operation == 'traverse' and nodes:
        curr = head
        idx = 0
        visited = set()
        while curr and idx not in visited:
            highlights = {'current': idx}
            steps.append({
                'list': [n.value for n in nodes],
                'highlights': highlights,
                'explanation': f'Traversing node at index {idx} (value: {curr.value})'
            })
            visited.add(idx)
            curr = curr.next
            idx = (idx + 1) % len(nodes)
    # Insert
    elif operation == 'insert' and target is not None and index is not None:
        highlights = {'insert': index}
        new_nodes = [Node(v) for v in data_list]
        for i in range(len(new_nodes) - 1):
            new_nodes[i].next = new_nodes[i + 1]
        # Insert at head
        if index == 0:
            new_head = Node(target)
            new_head.next = new_nodes[0] if new_nodes else new_head
            new_nodes = [new_head] + new_nodes
            if new_nodes:
                new_nodes[-1].next = new_nodes[0]
        elif 0 < index <= len(new_nodes):
            prev = new_nodes[0]
            for i in range(index - 1):
                prev = prev.next
            new_node = Node(target)
            new_node.next = prev.next
            prev.next = new_node
            new_nodes.insert(index, new_node)
            if new_nodes:
                new_nodes[-1].next = new_nodes[0]
        steps.append({
            'list': [n.value for n in new_nodes],
            'highlights': highlights,
            'explanation': f'Inserted value {target} at index {index}'
        })
    # Delete
    elif operation == 'delete' and index is not None and 0 <= index < len(nodes):
        highlights = {'delete': index}
        del_nodes = [Node(v) for v in data_list]
        for i in range(len(del_nodes) - 1):
            del_nodes[i].next = del_nodes[i + 1]
        if del_nodes:
            del_nodes[-1].next = del_nodes[0]
        if index == 0:
            del_nodes = del_nodes[1:]
            if del_nodes:
                del_nodes[-1].next = del_nodes[0]
        else:
            prev = del_nodes[0]
            for i in range(index - 1):
                prev = prev.next
            prev.next = prev.next.next if prev.next else None
            del del_nodes[index]
            if del_nodes:
                del_nodes[-1].next = del_nodes[0]
        steps.append({
            'list': [n.value for n in del_nodes],
            'highlights': highlights,
            'explanation': f'Deleted node at index {index}'
        })
    else:
        steps.append({'list': [n.value for n in nodes], 'highlights': {}, 'explanation': 'No operation performed'})
    return steps 