# ALGO-WIZ

ALGO-WIZ is an interactive algorithm visualization tool for learning and exploring classic algorithms. It supports Sorting, Searching, and Linked List visualizations with step-by-step animation, performance analysis, and theory panels.

## Features

- **Sorting Algorithms:**
  - Bubble Sort, Quick Sort, Merge Sort, Selection Sort, Insertion Sort, Heap Sort
  - Visualize sorting step-by-step with color-coded bars and operation history
  - See statistics (comparisons, swaps, time/space complexity)

- **Searching Algorithms:**
  - Binary Search, Linear Search, Jump Search, Exponential Search
  - Visualize search progress, highlight comparisons, and see search range
  - Enter a target value to search for

- **Linked List Module:**
  - Singly, Doubly, and Circular Linked List visualizations
  - Operations: Traverse, Insert at Head/End/Position, Delete Head/End/Position
  - Step-by-step pointer updates, node highlights, and operation explanations

- **Theory Panel:**
  - Shows algorithm overview, time/space complexity, loop invariants, and correctness proofs

- **Operation History:**
  - See a timeline of all steps and explanations for each operation

- **Modern UI:**
  - Navigation bar for Sorting, Searching, and Linked List modules
  - Input validation, random data generation, and responsive design

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Algo-Wiz
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Flask app:**
   ```bash
   python app.py
   ```

4. **Open your browser:**
   - Go to [http://127.0.0.1:5000](http://127.0.0.1:5000)

## Usage

- Use the navigation bar to select **Sorting**, **Searching**, or **Linked List**.
- For Sorting/Searching:
  - Enter a comma-separated list of numbers or generate random data.
  - (For Searching) Enter a target value.
  - Click **Validate Input** to check your data.
  - Use Start, Pause, Step, and Reset to control the visualization.
  - Click **Show Theory** for algorithm analysis.
- For Linked List:
  - Enter numbers, select the list type and operation.
  - For insert/delete at position, specify the index (and value for insert).
  - Use the controls to step through the operation.

## Project Structure

- `app.py` — Flask backend
- `algorithms/` — Algorithm implementations (sorting, searching, linkedlist)
- `static/js/` — Frontend JavaScript (visualization, sorting, searching, linkedlist)
- `templates/` — HTML templates (Jinja2)
- `static/css/` — Stylesheets

## Contributing
Pull requests and suggestions are welcome!

## License
MIT #   _ A L G O - W I Z _  
 "# ALGO-WIZ" 
