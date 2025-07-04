# 🔍 ALGO-WIZ
# BY-
    Mayank Karki
    Nitin Kandpal
    Swarit Kumar

**ALGO-WIZ** is an interactive algorithm visualization tool designed to help students and developers learn core computer science algorithms through animation, analysis, and theory. It currently supports **Sorting**, **Searching**, and **Linked List** operations, each with step-by-step visualization and performance insights.

---
## 🌐 Live Demo

The project is live and accessible here:  
👉 [https://algo-wiz.onrender.com](https://algo-wiz.onrender.com)

---

## ☁️ Deployment with Render

**ALGO-WIZ** is deployed using [Render](https://render.com), a modern cloud platform for hosting web applications.

### 🔧 Why Render?
- Simple, automatic deployment from GitHub
- Free tier available for small projects
- HTTPS, custom domains, and scalability supported

---
## 🚀 Features

### 🔢 Sorting Algorithms
- **Supported:** Bubble Sort, Quick Sort, Merge Sort, Selection Sort, Insertion Sort, Heap Sort  
- Step-by-step animations with **color-coded bars**
- Displays **comparisons**, **swaps**, and **time/space complexity**

### 🔎 Searching Algorithms
- **Supported:** Binary Search, Linear Search, Jump Search, Exponential Search  
- Visual indicators for comparisons and active ranges  
- Input target value and watch the search unfold

### 🔗 Linked List Visualizer
- **Types:** Singly, Doubly, Circular  
- **Operations:** Traverse, Insert (Head/End/Position), Delete (Head/End/Position)  
- Live pointer updates, node highlights, and real-time explanations

### 📘 Theory Panel
- Algorithm overview with:
  - Time & space complexity
  - Loop invariants
  - Correctness proof (where applicable)

### 🕒 Operation History
- Timeline of steps with explanation for each action

### 🖥️ Modern & Responsive UI
- Interactive navigation bar
- Random data generation
- Input validation with helpful error messages

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <https://github.com/TEAM-UTOPIANS/ALGO-WIZ.git>
cd Algo-Wiz
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Flask App
```bash
python app.py
```

### 4. Open in Browser
Visit: [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## 🧪 Usage Guide

- Navigate between **Sorting**, **Searching**, and **Linked List** using the top bar.

### 🔢 Sorting / 🔎 Searching
- Enter a comma-separated list or use the random generator.
- For searching, also enter the target value.
- Use:
  - `Start`, `Pause`, `Step`, `Reset` buttons
  - `Show Theory` for explanations

### 🔗 Linked List
- Select list type and operation.
- Provide index and value (if needed).
- Click through each step to watch node transformations and pointer behavior.

---

## 📁 Project Structure

```
Algo-Wiz/
├── app.py                # Flask backend
├── algorithms/           # Sorting, searching, linked list algorithms (Python)
├── static/
│   ├── css/              # Stylesheets
│   └── js/               # JS logic for visualizations
├── templates/            # Jinja2 HTML templates
└── requirements.txt      # Python dependencies
```

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repo, raise issues, or submit pull requests to improve functionality or UI.

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
